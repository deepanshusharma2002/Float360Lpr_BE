const multer = require('multer');
const pdf = require('pdf-parse');

const storage = multer.memoryStorage();
const uploadpdf = multer({ storage: storage });

async function tryPdfParse(req, res) {
    console.log("req.file", req.file);
    try {
        const base64 = req.file.buffer.toString('base64');
        const data = await pdf(req.file.buffer);
        const lines = data.text.split('\n');
        let arr = [];
        console.log(lines[10]);
        for (let i = 0; i < lines.length; i++) {
            arr.push(lines[i].trim());
        }
        res.status(200).json({ base64, arr });
    } catch (error) {
        console.error('Error creating news:', error.message);
        res.status(500).json({ error: 'Error creating news', details: error.message });
    }
}
module.exports = { uploadpdf, tryPdfParse };