import { google } from "googleapis";
import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false, // Required for file uploads
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: "File parsing error" });
        }

        try {
            const {
                name,
                contact,
                email,
                college,
                teamName,
                utrNumber,
                teamMember2_name,
                teamMember2_contact,
                teamMember2_college,
                teamMember3_name,
                teamMember3_contact,
                teamMember3_college,
                teamMember4_name,
                teamMember4_contact,
                teamMember4_college,
            } = fields;
            const file = files.screenshot;

            // Authenticate Google APIs using Service Account
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    token_uri: process.env.GOOGLE_TOKEN_URI,
                    project_id: process.env.GOOGLE_PROJECT_ID,
                },
                scopes: [
                    "https://www.googleapis.com/auth/drive.file",
                    "https://www.googleapis.com/auth/spreadsheets",
                ],
            });

            const drive = google.drive({ version: "v3", auth });
            const sheets = google.sheets({ version: "v4", auth });

            // Upload Screenshot to Google Drive
            let fileUrl = "No file uploaded";
            if (file && file.filepath) { 
                const driveResponse = await drive.files.create({
                    requestBody: {
                        name: file.originalFilename || "uploaded_file",
                        parents: ["1pevxLHbW9g90gMZbERoCyALSNPDxVER-"],
                    },
                    media: {
                        mimeType: file.mimetype || "application/octet-stream",
                        body: fs.createReadStream(file.filepath),
                    },
                    fields: "id",
                });

                const fileId = driveResponse.data.id;
                fileUrl = `https://drive.google.com/uc?id=${fileId}`;
            }

            // Append Data to Google Sheet
            const sheetId = "122VtMpnEjRk3mYyd9njYNQub4kBSDQer2E73o0sbTgo";
            await sheets.spreadsheets.values.append({
                spreadsheetId: sheetId,
                range: "Sheet1!A:Q", // ✅ Let Google Sheets auto-append data
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: [
                        [
                            name,
                            contact,
                            email,
                            college,
                            teamName,
                            utrNumber,
                            teamMember2_name,
                            teamMember2_contact,
                            teamMember2_college,
                            teamMember3_name,
                            teamMember3_contact,
                            teamMember3_college,
                            teamMember4_name,
                            teamMember4_contact,
                            teamMember4_college,
                            fileUrl, // Screenshot link
                        ],
                    ],
                },
            });

            return res.status(200).json({ message: "Registration successful", fileUrl });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Server error" });
        }
    });
}
