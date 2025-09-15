import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
import fs from "fs";
import { log } from "console";

async function extractPdfData(filePath) {
  try {
    // const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(filePath);
    console.log("Text:", data.text);
    return data.text;
  } catch (err) {
    console.error("Error extracting PDF data:", err);
    throw err;
  }
}
export default extractPdfData;
