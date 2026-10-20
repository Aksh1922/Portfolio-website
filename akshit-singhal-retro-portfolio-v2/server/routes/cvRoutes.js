const router = require("express").Router();
const path = require("path");
const fs = require("fs");

function sendResume(filename, contentType, res) {
  const filePath = path.join(__dirname, "..", "files", filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: `Resume file ${filename} has not been added yet. Add it to server/files/.` });
  }
  return res.download(filePath, filename, { headers: { "Content-Type": contentType } }, error => {
    if (error && !res.headersSent) res.status(500).json({ success: false, message: "Unable to download resume." });
  });
}
router.get("/pdf", (_req, res) => sendResume("resume.pdf", "application/pdf", res));
router.get("/docx", (_req, res) => sendResume("resume.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", res));
module.exports = router;
