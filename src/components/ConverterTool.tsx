"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import {
  defaultExportFilename,
  downloadCsv,
  transactionsToCsv,
} from "@/lib/csv-export";
import { getAllTransactions, getTransactionStats, parseQboFile } from "@/lib/qbo-parser";
import type {
  CsvColumnKey,
  CsvDateFormat,
  CsvDelimiter,
  CsvExportOptions,
  QboParseResult,
} from "@/lib/types";
import { CSV_COLUMN_KEYS, CSV_COLUMN_LABELS } from "@/lib/types";

const MAX_PREVIEW = 25;
const MAX_FILE_MB = 15;

const defaultColumns: CsvColumnKey[] = [
  "date",
  "type",
  "amount",
  "name",
  "memo",
  "payee",
  "checkNumber",
  "fitId",
];

export function ConverterTool() {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [parseResult, setParseResult] = useState<QboParseResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const [delimiter, setDelimiter] = useState<CsvDelimiter>(",");
  const [dateFormat, setDateFormat] = useState<CsvDateFormat>("iso");
  const [includeHeader, setIncludeHeader] = useState(true);
  const [mergeAccounts, setMergeAccounts] = useState(true);
  const [columns, setColumns] = useState<CsvColumnKey[]>(defaultColumns);

  const exportOptions: CsvExportOptions = useMemo(
    () => ({
      delimiter,
      dateFormat,
      includeHeader,
      mergeAccounts,
      columns,
    }),
    [delimiter, dateFormat, includeHeader, mergeAccounts, columns],
  );

  const transactions = useMemo(
    () => (parseResult ? getAllTransactions(parseResult) : []),
    [parseResult],
  );

  const stats = useMemo(
    () => (transactions.length ? getTransactionStats(transactions) : null),
    [transactions],
  );

  const csvPreview = useMemo(() => {
    if (!parseResult) {
      return "";
    }
    return transactionsToCsv(parseResult, exportOptions);
  }, [parseResult, exportOptions]);

  const processFile = useCallback(async (file: File) => {
    setError("");
    setCopied(false);

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`File is larger than ${MAX_FILE_MB} MB. Try a shorter date range from your bank.`);
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext && !["qbo", "ofx", "qfx"].includes(ext)) {
      setError("Use a .qbo, .ofx, or .qfx file from QuickBooks or your bank.");
      return;
    }

    setBusy(true);
    try {
      const text = await file.text();
      const result = parseQboFile(text);
      setParseResult(result);
      setFileName(file.name);
    } catch (err) {
      setParseResult(null);
      setFileName("");
      setError(err instanceof Error ? err.message : "Could not read this file.");
    } finally {
      setBusy(false);
    }
  }, []);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void processFile(file);
    }
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      void processFile(file);
    }
  };

  const toggleColumn = (key: CsvColumnKey) => {
    setColumns((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );
  };

  const reset = () => {
    setParseResult(null);
    setFileName("");
    setError("");
    setCopied(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = () => {
    if (!columns.length) {
      setError("Select at least one column to export.");
      return;
    }
    if (!parseResult || !csvPreview) {
      return;
    }
    downloadCsv(csvPreview, defaultExportFilename(fileName || "transactions"));
  };

  const handleCopy = async () => {
    if (!csvPreview) {
      return;
    }
    try {
      await navigator.clipboard.writeText(csvPreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Clipboard access was blocked. Download the CSV instead.");
    }
  };

  const previewRows = transactions.slice(0, MAX_PREVIEW);

  return (
    <div id="converter" className="card-surface animate-rise overflow-hidden rounded-2xl">
      <div className="border-b border-line bg-paper-deep/40 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
              Converter
            </p>
            <h2 className="font-display text-2xl text-ink">Drop your QBO file</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-forest/20 bg-forest-soft px-3 py-1 text-xs font-medium text-forest">
            <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden />
            Runs locally — no upload
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors focus-ring ${
            dragOver
              ? "border-copper bg-copper/5"
              : "border-line-strong hover:border-copper/60 hover:bg-paper-deep/30"
          }`}
          aria-label="Upload QBO or OFX file"
        >
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept=".qbo,.ofx,.qfx,application/x-ofx,text/plain"
            className="sr-only"
            onChange={onFileChange}
          />
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-copper"
              aria-hidden
            >
              <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
          </div>
          <p className="text-base font-medium text-ink">
            {busy ? "Reading file…" : "Drag a .qbo, .ofx, or .qfx file here"}
          </p>
          <p className="mt-1 text-sm text-ink-muted">or click to browse · max {MAX_FILE_MB} MB</p>
        </div>

        {error ? (
          <div
            className="rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        {parseResult && stats ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Transactions" value={stats.count.toLocaleString()} />
              <StatCard
                label="Date range"
                value={
                  stats.minDate && stats.maxDate
                    ? `${stats.minDate} → ${stats.maxDate}`
                    : "—"
                }
              />
              <StatCard label="Money in" value={formatMoney(stats.credits)} positive />
              <StatCard label="Money out" value={formatMoney(stats.debits)} />
            </div>

            {parseResult.warnings.length > 0 ? (
              <ul className="space-y-1 rounded-lg border border-line bg-paper-deep/50 px-4 py-3 text-sm text-ink-muted">
                {parseResult.warnings.map((warning) => (
                  <li key={warning}>· {warning}</li>
                ))}
              </ul>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <fieldset className="space-y-4 rounded-xl border border-line bg-paper/50 p-4">
                <legend className="px-1 text-sm font-semibold text-ink">Export options</legend>

                <label className="block text-sm">
                  <span className="text-ink-muted">Delimiter</span>
                  <select
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value as CsvDelimiter)}
                    className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink focus-ring"
                  >
                    <option value=",">Comma (,)</option>
                    <option value=";">Semicolon (;)</option>
                    <option value={"\t"}>Tab</option>
                  </select>
                </label>

                <label className="block text-sm">
                  <span className="text-ink-muted">Date format</span>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value as CsvDateFormat)}
                    className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink focus-ring"
                  >
                    <option value="iso">ISO (2024-03-15)</option>
                    <option value="us">US (03/15/2024)</option>
                    <option value="eu">EU (15/03/2024)</option>
                  </select>
                </label>

                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={includeHeader}
                    onChange={(e) => setIncludeHeader(e.target.checked)}
                    className="rounded border-line-strong text-copper focus-ring"
                  />
                  Include header row
                </label>

                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={mergeAccounts}
                    onChange={(e) => setMergeAccounts(e.target.checked)}
                    className="rounded border-line-strong text-copper focus-ring"
                  />
                  Merge multiple accounts into one sheet
                </label>

                <div>
                  <p className="mb-2 text-sm text-ink-muted">Columns</p>
                  <div className="flex flex-wrap gap-2">
                    {CSV_COLUMN_KEYS.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleColumn(key)}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus-ring ${
                          columns.includes(key)
                            ? "border-copper bg-copper/10 text-copper-dark"
                            : "border-line bg-surface text-ink-muted hover:border-line-strong"
                        }`}
                      >
                        {CSV_COLUMN_LABELS[key]}
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>

              <div className="flex flex-col gap-3">
                <p className="text-sm text-ink-muted">
                  File: <span className="font-mono text-ink">{fileName}</span>
                  {parseResult.institution ? (
                    <>
                      {" "}
                      · Bank: <span className="text-ink">{parseResult.institution}</span>
                    </>
                  ) : null}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!columns.length}
                    className="rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-copper-dark disabled:opacity-50 focus-ring"
                  >
                    Download CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleCopy()}
                    disabled={!columns.length}
                    className="rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-copper focus-ring"
                  >
                    {copied ? "Copied" : "Copy CSV"}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full px-4 py-2.5 text-sm text-ink-muted transition-colors hover:text-ink focus-ring"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-line">
              <div className="flex items-center justify-between border-b border-line bg-paper-deep/50 px-4 py-2">
                <p className="text-sm font-medium text-ink">Preview</p>
                <p className="text-xs text-ink-faint">
                  Showing {previewRows.length} of {transactions.length}
                </p>
              </div>
              <div className="max-h-72 overflow-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="sticky top-0 bg-surface text-xs uppercase tracking-wide text-ink-faint">
                    <tr>
                      <th className="px-4 py-2 font-medium">Date</th>
                      <th className="px-4 py-2 font-medium">Type</th>
                      <th className="px-4 py-2 font-medium text-right">Amount</th>
                      <th className="px-4 py-2 font-medium">Name</th>
                      <th className="px-4 py-2 font-medium">Memo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row) => (
                      <tr key={row.fitId || `${row.datePosted}-${row.amount}-${row.name}`} className="border-t border-line/70">
                        <td className="px-4 py-2 font-mono text-xs">{row.datePosted || "—"}</td>
                        <td className="px-4 py-2 text-ink-muted">{row.type || "—"}</td>
                        <td
                          className={`px-4 py-2 text-right font-mono text-xs ${
                            row.amount < 0 ? "text-danger" : "text-forest"
                          }`}
                        >
                          {formatMoney(row.amount)}
                        </td>
                        <td className="max-w-[140px] truncate px-4 py-2">{row.name || "—"}</td>
                        <td className="max-w-[180px] truncate px-4 py-2 text-ink-muted">
                          {row.memo || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-ink-faint">{label}</p>
      <p
        className={`mt-1 font-mono text-sm font-medium ${
          positive ? "text-forest" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "always",
  }).format(amount);
}
