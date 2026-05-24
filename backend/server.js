const express = require('express');
const path = require('path');
const XLSX = require('xlsx');
const cors = require('cors');

const app = express();
app.use(cors());

app.get("/production", (req, res) => {
    const filePath = path.join(__dirname, '..', 'excel', 'production.xlsx'); 
    console.log("\n=========================================");
    console.log("[INFO] Membaca file:", filePath);
    
    try {
        const workbook = XLSX.readFile(filePath);
        const targetSheetName = "Sheet1"; 
        const sheet = workbook.Sheets[targetSheetName];
        
        if (!sheet) {
            console.error(`[ERROR] Sheet bernama '${targetSheetName}' tidak ditemukan!`);
            return res.json([]);
        }

        // KUNCI UTAMA: raw: false memaksa library membaca teks persis seperti tampilan di layar Excel ("14-May")
        let rawData = XLSX.utils.sheet_to_json(sheet, { raw: false, defval: "" });

        console.log(`[INFO] Berhasil memuat '${targetSheetName}'`);
        console.log("[INFO] Total baris data terbaca:", rawData.length);

        if (rawData.length > 0) {
            console.log("[DIAGNOSIS] Contoh Format Tanggal Baris 1:", rawData['Tanggal']);
        }

        // Kirim array data sehat ke frontend
        res.json(rawData);

    } catch (error) {
        console.error("[ERROR BACKEND]:", error.message);
        res.status(500).json([]);
    }
});

app.listen(3000, () => {
    console.log("=========================================");
    console.log(" BACKEND RUNNING: FIXED STRING TEXT MODE ");
    console.log(" URL: http://localhost:3000/production   ");
    console.log("=========================================");
});