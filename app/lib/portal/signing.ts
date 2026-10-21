import "server-only";
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";

// Builds the signed copy of a document: a certificate page that records who signed, when, from where and the
// SHA-256 fingerprint of the exact file that was signed. A PDF keeps its own pages and gets the certificate
// added at the end; any other file type gets a certificate that names the file and its fingerprint.
type Input = {
  original: Buffer;
  isPdf: boolean;
  title: string;
  filename: string;
  hash: string;
  signerName: string;
  familyName: string;
  signedAt: Date;
  ip: string;
  signaturePng: Buffer;
};

function wrap(text: string, font: PDFFont, size: number, width: number) {
  const out: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      out.push(line);
      line = word;
    } else line = next;
  }
  if (line) out.push(line);
  return out;
}

export async function buildSignedPdf(i: Input) {
  let doc: PDFDocument;
  try {
    doc = i.isPdf ? await PDFDocument.load(i.original, { ignoreEncryption: true }) : await PDFDocument.create();
  } catch {
    doc = await PDFDocument.create();
  }
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([595, 842]);
  const ink = rgb(0.16, 0.05, 0.1);
  const grey = rgb(0.35, 0.25, 0.3);
  let y = 780;
  const text = (t: string, size = 11, f: PDFFont = font, color = ink) => {
    page.drawText(t, { x: 56, y, size, font: f, color });
    y -= size + 7;
  };

  page.drawText("Certificate of electronic signature", { x: 56, y, size: 20, font: bold, color: ink });
  y -= 34;
  text("Britannia Crown Education Consultants", 11, font, grey);
  y -= 14;
  const fields: [string, string][] = [
    ["Document", i.title],
    ["File", i.filename],
    ["Signed by", i.signerName],
    ["Family account", i.familyName],
    ["Signed on", `${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "medium", timeZone: "Europe/London" }).format(i.signedAt)} (UK time)`],
    ["IP address", i.ip || "not recorded"],
  ];
  for (const [k, v] of fields) {
    text(k, 9, bold, grey);
    for (const l of wrap(v, font, 12, 480)) text(l, 12);
    y -= 4;
  }
  text("Document fingerprint (SHA-256)", 9, bold, grey);
  text(i.hash.slice(0, 32), 10);
  text(i.hash.slice(32), 10);
  y -= 8;
  for (const l of wrap(
    "The fingerprint identifies the exact file that was signed. If the file is changed in any way, its fingerprint changes.",
    font, 10, 480,
  )) text(l, 10, font, grey);
  y -= 14;
  text("Signature", 9, bold, grey);
  const img = await doc.embedPng(i.signaturePng);
  const scale = Math.min(240 / img.width, 100 / img.height, 1);
  const w = img.width * scale;
  const h = img.height * scale;
  page.drawRectangle({ x: 56, y: y - h - 8, width: w + 16, height: h + 16, borderColor: rgb(0.8, 0.75, 0.7), borderWidth: 0.8 });
  page.drawImage(img, { x: 64, y: y - h, width: w, height: h });
  y -= h + 34;
  for (const l of wrap(
    `${i.signerName} confirmed they had read this document and agreed to sign it electronically, and that this electronic signature has the same effect as a handwritten one.`,
    font, 10, 480,
  )) text(l, 10);

  return Buffer.from(await doc.save());
}
