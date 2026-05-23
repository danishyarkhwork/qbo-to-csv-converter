export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What is a QBO file?",
    answer:
      "A QBO file is the download format QuickBooks and many banks use for transaction imports. Under the hood it follows the OFX standard (Open Financial Exchange), usually in the older SGML style with tags like STMTTRN, TRNAMT, and FITID. You can open the same data in QuickBooks, but spreadsheets need CSV — that is what this tool produces.",
  },
  {
    question: "Does my file leave my computer?",
    answer:
      "No. Conversion runs entirely in your browser with JavaScript. The file is read from your device, parsed locally, and the CSV is generated on your machine. Nothing is sent to our servers because we do not operate an upload backend for this tool.",
  },
  {
    question: "Will this work with OFX and QFX files?",
    answer:
      "Yes. Banks often label exports as OFX or QFX. QuickBooks Web Connect uses QBO. All three share the same transaction blocks, so if your bank or QuickBooks can export it, this converter can usually read it.",
  },
  {
    question: "Why convert QBO to CSV?",
    answer:
      "CSV opens in Excel, Google Sheets, and LibreOffice without extra software. It is easier to filter, pivot, and share with an accountant. Many bookkeeping workflows still start with a flat file, especially for one-off reviews or tax prep.",
  },
  {
    question: "Which columns appear in the CSV?",
    answer:
      "By default you get date, type, amount, name, memo, payee, check number, FITID, and reference fields. You can turn columns on or off before download, pick comma or semicolon separators, and choose ISO, US, or European date formatting.",
  },
  {
    question: "What is FITID and should I keep it?",
    answer:
      "FITID is the bank’s unique id for a transaction. QuickBooks uses it to avoid importing duplicates. If you plan to re-import or match rows later, keep FITID in the CSV. For simple reporting you can hide it.",
  },
  {
    question: "The file imported in QuickBooks but fails here — why?",
    answer:
      "Rare exports use non-standard tags or truncated downloads. Open the file in a text editor and confirm you see STMTTRN blocks with amounts and dates. Re-download from your bank if the file is tiny or clearly incomplete. If the structure looks normal and it still fails, open an issue on GitHub with a redacted sample.",
  },
  {
    question: "Is there a row limit?",
    answer:
      "There is no hard cap in the code. Very large statements (tens of thousands of rows) may take a few seconds in the browser because everything runs on your device. For typical monthly bank files, conversion is near instant.",
  },
  {
    question: "Can I use the output in Excel or Google Sheets?",
    answer:
      "Yes. Download the CSV and open it directly, or use File → Import in Sheets. If you use semicolon separation for European Excel, choose that delimiter before exporting.",
  },
  {
    question: "Is this affiliated with Intuit or QuickBooks?",
    answer:
      "No. This is an independent open-source project. QuickBooks and QBO are trademarks of Intuit Inc. We are not endorsed by or connected to Intuit.",
  },
  {
    question: "How is the project licensed?",
    answer:
      "The source code is published under the MIT License. You can use, modify, and host your own copy. Attribution is appreciated but not required by the license.",
  },
  {
    question: "Why is the tool free?",
    answer:
      "It solves a narrow job — bank download to spreadsheet — without needing accounts or servers. Keeping it free and open source lets others audit the privacy claims and improve the parser for odd bank files.",
  },
];
