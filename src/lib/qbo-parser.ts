import type { QboAccount, QboParseResult, QboStatement, QboTransaction } from "./types";

const TRANSACTION_TAGS = [
  "STMTTRN",
  "INVSTMTTRN",
  "SECSTMTTRN",
] as const;

function normalizeContent(raw: string): string {
  return raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function detectFormat(content: string): QboParseResult["fileFormat"] {
  const trimmed = content.trimStart();
  if (trimmed.startsWith("<?xml") || trimmed.includes("<OFX>")) {
    return trimmed.includes("<?xml") ? "xml" : "sgml";
  }
  if (content.includes("OFXHEADER:") || content.includes("<OFX>")) {
    return "sgml";
  }
  return "unknown";
}

function stripOfxHeader(content: string): string {
  const ofxStart = content.search(/<OFX>/i);
  if (ofxStart >= 0) {
    return content.slice(ofxStart);
  }
  return content;
}

function readTag(block: string, tag: string): string {
  const patterns = [
    new RegExp(`<${tag}>([^<\\n\\r]*)`, "i"),
    new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"),
  ];

  for (const pattern of patterns) {
    const match = block.match(pattern);
    if (match?.[1] !== undefined) {
      return match[1].trim();
    }
  }

  return "";
}

function parseOfxDate(raw: string): string {
  if (!raw) {
    return "";
  }

  const digits = raw.replace(/\[.*]$/, "").replace(/\D/g, "");
  if (digits.length < 8) {
    return "";
  }

  const year = digits.slice(0, 4);
  const month = digits.slice(4, 6);
  const day = digits.slice(6, 8);
  return `${year}-${month}-${day}`;
}

function parseAmount(raw: string): number {
  if (!raw) {
    return 0;
  }
  const cleaned = raw.replace(/,/g, "").trim();
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function parseTransactionBlock(block: string): QboTransaction | null {
  const type = readTag(block, "TRNTYPE");
  const datePosted = parseOfxDate(readTag(block, "DTPOSTED") || readTag(block, "DTUSER"));
  const amount = parseAmount(readTag(block, "TRNAMT"));
  const fitId = readTag(block, "FITID");

  if (!fitId && !datePosted && amount === 0 && !type) {
    return null;
  }

  return {
    type,
    datePosted,
    amount,
    fitId,
    name: readTag(block, "NAME"),
    memo: readTag(block, "MEMO"),
    checkNumber: readTag(block, "CHECKNUM"),
    refNum: readTag(block, "REFNUM"),
    payee: readTag(block, "PAYEE"),
  };
}

function extractTransactionBlocks(content: string): string[] {
  const blocks: string[] = [];

  for (const tag of TRANSACTION_TAGS) {
    const open = new RegExp(`<${tag}>`, "gi");
    const close = new RegExp(`</${tag}>`, "gi");
    let match = open.exec(content);

    while (match) {
      const start = match.index + match[0].length;
      close.lastIndex = start;
      const endMatch = close.exec(content);

      if (endMatch) {
        blocks.push(content.slice(start, endMatch.index));
      } else {
        const nextOpen = open.exec(content);
        const end =
          nextOpen !== null ? nextOpen.index : Math.min(content.length, start + 4000);
        blocks.push(content.slice(start, end));
        if (nextOpen) {
          open.lastIndex = nextOpen.index;
          match = nextOpen;
          continue;
        }
      }

      match = open.exec(content);
    }
  }

  return blocks;
}

function extractStatementSections(content: string): string[] {
  const sectionTags = ["STMTRS", "CCSTMTRS", "INVSTMTRS"];
  const sections: string[] = [];

  for (const tag of sectionTags) {
    const pattern = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "gi");
    let match = pattern.exec(content);
    while (match) {
      sections.push(match[0]);
      match = pattern.exec(content);
    }
  }

  if (sections.length === 0) {
    const listMatch = content.match(/<BANKTRANLIST>[\s\S]*/i);
    if (listMatch) {
      sections.push(listMatch[0]);
    }
  }

  return sections;
}

function parseAccount(section: string): QboAccount {
  return {
    bankId: readTag(section, "BANKID") || readTag(section, "BROKERID"),
    accountId: readTag(section, "ACCTID"),
    accountType: readTag(section, "ACCTTYPE"),
  };
}

function parseStatementSection(section: string, institution: string): QboStatement {
  const transactionBlocks = extractTransactionBlocks(section);
  const transactions = transactionBlocks
    .map(parseTransactionBlock)
    .filter((row): row is QboTransaction => row !== null);

  const ledgerRaw = readTag(section, "BALAMT");
  const availSection = section.match(/<AVAILBAL>[\s\S]*?<\/AVAILBAL>/i)?.[0] ?? section;

  return {
    currency: readTag(section, "CURDEF") || "USD",
    account: parseAccount(section),
    institution,
    periodStart: parseOfxDate(readTag(section, "DTSTART")),
    periodEnd: parseOfxDate(readTag(section, "DTEND")),
    ledgerBalance: ledgerRaw ? parseAmount(ledgerRaw) : null,
    availableBalance: readTag(availSection, "BALAMT")
      ? parseAmount(readTag(availSection, "BALAMT"))
      : null,
    transactions,
  };
}

function readInstitution(content: string): string {
  return readTag(content, "ORG") || readTag(content, "FI") || "";
}

export function parseQboFile(raw: string): QboParseResult {
  const warnings: string[] = [];
  const normalized = normalizeContent(raw);

  if (!normalized.trim()) {
    throw new Error("The file is empty. Choose a valid QBO or OFX export from your bank.");
  }

  const fileFormat = detectFormat(normalized);
  const body = stripOfxHeader(normalized);
  const institution = readInstitution(body);

  if (!body.match(/<OFX>/i) && !body.match(/<STMTTRN>/i)) {
    throw new Error(
      "This does not look like a QBO/OFX file. Export from QuickBooks or your bank as .qbo or .ofx and try again.",
    );
  }

  const sections = extractStatementSections(body);
  let statements: QboStatement[];

  if (sections.length > 0) {
    statements = sections
      .map((section) => parseStatementSection(section, institution))
      .filter((statement) => statement.transactions.length > 0);
  } else {
    const blocks = extractTransactionBlocks(body);
    const transactions = blocks
      .map(parseTransactionBlock)
      .filter((row): row is QboTransaction => row !== null);

    if (transactions.length === 0) {
      throw new Error("No transactions were found in this file. The export may be empty or use an unsupported layout.");
    }

    statements = [
      {
        currency: readTag(body, "CURDEF") || "USD",
        account: parseAccount(body),
        institution,
        periodStart: parseOfxDate(readTag(body, "DTSTART")),
        periodEnd: parseOfxDate(readTag(body, "DTEND")),
        ledgerBalance: null,
        availableBalance: null,
        transactions,
      },
    ];
  }

  if (statements.length === 0) {
    throw new Error("No transactions were found in this file. Check that the download completed and the account has activity.");
  }

  const totalRows = statements.reduce((sum, s) => sum + s.transactions.length, 0);
  if (totalRows > 50000) {
    warnings.push(
      `Large file detected (${totalRows.toLocaleString()} rows). Your browser may take a moment to build the CSV.`,
    );
  }

  if (fileFormat === "unknown") {
    warnings.push("File format was not recognized clearly, but transactions were parsed.");
  }

  return {
    statements,
    fileFormat,
    institution,
    warnings,
  };
}

export function getAllTransactions(result: QboParseResult): QboTransaction[] {
  return result.statements.flatMap((statement) => statement.transactions);
}

export function getTransactionStats(transactions: QboTransaction[]) {
  let credits = 0;
  let debits = 0;
  let minDate = "";
  let maxDate = "";

  for (const row of transactions) {
    if (row.amount >= 0) {
      credits += row.amount;
    } else {
      debits += row.amount;
    }

    if (row.datePosted) {
      if (!minDate || row.datePosted < minDate) {
        minDate = row.datePosted;
      }
      if (!maxDate || row.datePosted > maxDate) {
        maxDate = row.datePosted;
      }
    }
  }

  return {
    count: transactions.length,
    credits,
    debits,
    net: credits + debits,
    minDate,
    maxDate,
  };
}
