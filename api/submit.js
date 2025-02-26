import { google } from "googleapis";
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" }); // Temporary storage for files

app.use(express.json());

// Google API Credentials
const googleClientEmail = process.env.CLIENT_EMAIL;
const googlePrivateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
const DRIVE_FOLDER_ID = "1pevxLHbW9g90gMZbERoCyALSNPDxVER-"; // Google Drive folder ID
const SPREADSHEET_ID = "122VtMpnEjRk3mYyd9njYNQub4kBSDQer2E73o0sbTgo"; // Google Sheets ID
const SCOPES = ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"];

async function authenticate() {
    const jwtClient = new google.auth.JWT(googleClientEmail, null, googlePrivateKey, SCOPES);
    await jwtClient.authorize();
    return jwtClient;
}

// Upload file to Google Drive
async function uploadToDrive(auth, file) {
    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.create({
        requestBody: {
            name: file.originalname,
            parents: [DRIVE_FOLDER_ID],
        },
        media: {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path),
        },
    });

    const fileId = response.data.id;

    // Make the file publicly accessible
    await drive.permissions.create({
        fileId,
        requestBody: {
            role: "reader",
            type: "anyone",
        },
    });

    // Get shareable link
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    return fileUrl;
}

// Append data to Google Sheets
async function appendToSheet(auth, data) {
    const sheets = google.sheets({ version: "v4", auth });

    const request = {
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A2:I",
        valueInputOption: "RAW",
        resource: {
            values: [
                [
                    data.name,
                    data.contact,
                    data.email,
                    data.college,
                    data.teamName,
                    data.teamMembers[0]?.name || "",
                    data.teamMembers[0]?.contact || "",
                    data.teamMembers[0]?.college || "",
                    data.utrNumber,
                    data.paymentScreenshotUrl,
                ],
            ],
        },
    };

    try {
        await sheets.spreadsheets.values.append(request);
        console.log("✅ Data added to Google Sheets");
    } catch (err) {
        console.error("❌ Error appending data:", err);
        throw new Error("Error appending data to sheet");
    }
}

app.post("/api/submit", upload.single("screenshot"), async (req, res) => {
    const formData = req.body;
    const screenshotFile = req.file;

    if (!formData.name || !formData.email || !formData.contact || !screenshotFile) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const auth = await authenticate();

        // Upload to Google Drive & get shareable URL
        const screenshotUrl = await uploadToDrive(auth, screenshotFile);
        formData.paymentScreenshotUrl = screenshotUrl;

        // Append to Google Sheets
        await appendToSheet(auth, formData);

        res.status(200).json({ message: "✅ Form submitted successfully", screenshotUrl });
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Error submitting form data" });
    } finally {
        // Delete the local file after upload
        if (screenshotFile) fs.unlinkSync(screenshotFile.path);
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
