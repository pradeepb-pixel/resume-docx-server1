import express from "express";
import cors from "cors";
import { Document, Packer, Paragraph, TextRun } from "docx";

const app = express();
app.use(express.json());
app.use(cors());
