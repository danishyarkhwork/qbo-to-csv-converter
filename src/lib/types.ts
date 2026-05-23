export interface QboTransaction {
  type: string;
  datePosted: string;
  amount: number;
  fitId: string;
  name: string;
  memo: string;
  checkNumber: string;
  refNum: string;
  payee: string;
}

export interface QboAccount {
  bankId: string;
  accountId: string;
  accountType: string;
}

export interface QboStatement {
  currency: string;
  account: QboAccount;
  institution: string;
  periodStart: string;
  periodEnd: string;
  ledgerBalance: number | null;
  availableBalance: number | null;
  transactions: QboTransaction[];
}

export interface QboParseResult {
  statements: QboStatement[];
  fileFormat: "sgml" | "xml" | "unknown";
  institution: string;
  warnings: string[];
}

export type CsvDelimiter = "," | ";" | "\t";
export type CsvDateFormat = "iso" | "us" | "eu";

export interface CsvExportOptions {
  delimiter: CsvDelimiter;
  dateFormat: CsvDateFormat;
  includeHeader: boolean;
  mergeAccounts: boolean;
  columns: CsvColumnKey[];
}

export const CSV_COLUMN_KEYS = [
  "date",
  "type",
  "amount",
  "name",
  "memo",
  "payee",
  "checkNumber",
  "fitId",
  "refNum",
  "accountId",
  "accountType",
  "currency",
] as const;

export type CsvColumnKey = (typeof CSV_COLUMN_KEYS)[number];

export const CSV_COLUMN_LABELS: Record<CsvColumnKey, string> = {
  date: "Date",
  type: "Type",
  amount: "Amount",
  name: "Name",
  memo: "Memo",
  payee: "Payee",
  checkNumber: "Check #",
  fitId: "FITID",
  refNum: "Reference",
  accountId: "Account ID",
  accountType: "Account type",
  currency: "Currency",
};
