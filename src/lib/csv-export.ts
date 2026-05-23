import type {
  CsvColumnKey,
  CsvDateFormat,
  CsvDelimiter,
  CsvExportOptions,
  QboParseResult,
  QboStatement,
  QboTransaction,
} from "./types";
import { CSV_COLUMN_LABELS } from "./types";

function escapeCsvCell(value: string, delimiter: CsvDelimiter): string {
  if (value.includes('"') || value.includes("\n") || value.includes(delimiter)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatDate(isoDate: string, format: CsvDateFormat): string {
  if (!isoDate) {
    return "";
  }

  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) {
    return isoDate;
  }

  switch (format) {
    case "us":
      return `${month}/${day}/${year}`;
    case "eu":
      return `${day}/${month}/${year}`;
    default:
      return isoDate;
  }
}

function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

interface ExportRow {
  transaction: QboTransaction;
  statement: QboStatement;
}

function buildRows(result: QboParseResult, mergeAccounts: boolean): ExportRow[] {
  if (mergeAccounts) {
    return result.statements.flatMap((statement) =>
      statement.transactions.map((transaction) => ({ transaction, statement })),
    );
  }

  return result.statements.flatMap((statement) =>
    statement.transactions.map((transaction) => ({ transaction, statement })),
  );
}

function columnValue(
  key: CsvColumnKey,
  row: ExportRow,
  dateFormat: CsvDateFormat,
): string {
  const { transaction, statement } = row;

  switch (key) {
    case "date":
      return formatDate(transaction.datePosted, dateFormat);
    case "type":
      return transaction.type;
    case "amount":
      return formatAmount(transaction.amount);
    case "name":
      return transaction.name;
    case "memo":
      return transaction.memo;
    case "payee":
      return transaction.payee;
    case "checkNumber":
      return transaction.checkNumber;
    case "fitId":
      return transaction.fitId;
    case "refNum":
      return transaction.refNum;
    case "accountId":
      return statement.account.accountId;
    case "accountType":
      return statement.account.accountType;
    case "currency":
      return statement.currency;
    default: {
      const _exhaustive: never = key;
      return _exhaustive;
    }
  }
}

export function transactionsToCsv(
  result: QboParseResult,
  options: CsvExportOptions,
): string {
  const rows = buildRows(result, options.mergeAccounts);
  const lines: string[] = [];

  if (options.includeHeader) {
    lines.push(
      options.columns.map((key) => CSV_COLUMN_LABELS[key]).join(options.delimiter),
    );
  }

  for (const row of rows) {
    const cells = options.columns.map((key) =>
      escapeCsvCell(columnValue(key, row, options.dateFormat), options.delimiter),
    );
    lines.push(cells.join(options.delimiter));
  }

  return lines.join("\n");
}

export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function defaultExportFilename(originalName: string): string {
  const base = originalName.replace(/\.(qbo|ofx|qfx)$/i, "") || "transactions";
  return `${base}.csv`;
}
