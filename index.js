import express from "express";
import cors from "cors";
import { Document, Packer, Paragraph, TextRun } from "docx";

const app = express();
app.use(express.json());
app.use(cors());
app.post("/generate-docx", async (req, res) => {
  const data = req.body;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: data.name,
                bold: true,
                size: 36,
              }),
            ],
          }),
          new Paragraph({
            text: data.title || "",
            spacing: { after: 300 },
          }),

          new Paragraph({ text: "SUMMARY", bold: true }),
          new Paragraph({ text: data.summary || "" }),

          new Paragraph({ text: "SKILLS", bold: true }),
          new Paragraph({ text: data.skills || "" }),

          new Paragraph({ text: "EXPERIENCE", bold: true }),
          new Paragraph({ text: data.experience || "" }),
                    new Paragraph({ text: "EDUCATION", bold: true }),
          new Paragraph({ text: data.education || "" }),

          new Paragraph({ text: "CERTIFICATIONS", bold: true }),
          new Paragraph({ text: data.certifications || "" }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  res.setHeader("Content-Disposition", "attachment; filename=Resume.docx");
  res.send(buffer);
});

