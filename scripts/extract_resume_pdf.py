#!/usr/bin/env python3
"""
Extract plain text from resume/Master.pdf using pypdf.

Usage (from repo root, with venv activated):
  ./venv/bin/python scripts/extract_resume_pdf.py
  ./venv/bin/python scripts/extract_resume_pdf.py --pdf resume/Master.pdf --out resume/Master.extracted.txt
"""
from __future__ import annotations

import argparse
from pathlib import Path

from pypdf import PdfReader


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    default_pdf = root / "resume" / "Master.pdf"
    default_out = root / "resume" / "Master.extracted.txt"

    ap = argparse.ArgumentParser(description="Extract text from the résumé PDF (pypdf).")
    ap.add_argument("--pdf", type=Path, default=default_pdf, help="Path to PDF")
    ap.add_argument("--out", type=Path, default=default_out, help="Output .txt path")
    args = ap.parse_args()

    pdf_path: Path = args.pdf
    out_path: Path = args.out

    if not pdf_path.is_file():
        raise SystemExit(f"PDF not found: {pdf_path}")

    reader = PdfReader(str(pdf_path))
    chunks: list[str] = []
    for i, page in enumerate(reader.pages):
        chunks.append(f"\n--- Page {i + 1} ---\n")
        chunks.append(page.extract_text() or "")

    text = "".join(chunks).strip() + "\n"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(text, encoding="utf-8")
    print(f"Wrote {len(text)} chars to {out_path}")


if __name__ == "__main__":
    main()
