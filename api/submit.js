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
            const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVqi9EX/FJMVQU\n+f3vOXbmwK9q241C1ZAUGapZi69BnQW9sKCFK5P/HYxT75ZXxWrlnOFGihH0TdyF\nrVt3q2vbgwOLoTZNZYSx12NY2ChSeurWuJJairgR7zNxKoqV6ySzjibiT13Cg7cm\nRMUcBdkxtmUu/nCbxX2n9EZrdnn0mCno3+n3j60EDIgomIsxBzTOyqJRXiJi9+2+\nsEVTuaIqX1JH7oHIaS7jjWPKkvgtKVVT4N36nRVRiNpqqK85FUCz/9w4aBp4X+TF\n1xGDK7M8DY9DSpxLs8K1VeO/YzBWjF0eqD9ACDWXbb4X4lsKieAc0x1DBNduT2uE\n/Nsz76YbAgMBAAECggEAS6Zp/eeKYsPYZWTuB9lsw97NPSRnK5a54KQFsJbIgo66\nDaOP8hav28/2c3GM5Z68bnfRO0x/duRqg9oRXJmRIrOMec+mjli3VtBQGJDQFgP3\nSfcnum8LJS5wJE1PrC0JXZmjItW++LPyENagg39+mx9dS/pCnKScDO9sT3gvTe48\niYKImG7a4XqtLAF9gjJ9DQGyrg6Zg+W7d4cgTV0K52EKmAyJoS/MbJZv+Xsjv5XC\nbpu/OdZPfrF7ETE9AbRu+CStsVYJRzRcini5xQOJQ8kqFwIlvNPFxn1GvedJHqBm\nWcujEbQtDMU0tcklJ5053LPnYRRdt98LowNVNTKe4QKBgQDzXngFXKIFGf0GeAYJ\njlgvHbRyXjyBhDukFotCLctOiYvZsqrOHjz8oBqFCCNx/M75szMEtPkizh3IKSwg\nSi62ipmUs7NvqvzEggEy33E1bcQF0WFUBs2XgQFIxsjE9GOHrxcPuqmmdZEFEDbK\nPjgzCGcI8j5Rj8vnRiohhRHhRQKBgQDgwQynArqazczL4ykP9Y96M4y5jP/q5KhC\ncx2OX7oSy89BwtxUgDBe9pYUd45m3tPe3f8HPQSfRcHmfkAp7jkDBz8dkoWB1e4u\n+Scnsz95nvPnQ52tx7qVW2VzFhqg+w3nSMx8u/eHT45rU9ze8c21y9o6TQb3afUG\nc4avtCnv3wKBgCNQpA3zITeoS8UyiX29gCJmJxcpgZIxxA3Nj6usxYHCB98xRAPg\n82ydNvvy8GHME6S8UjzunfBlBIFVKCgPW7P1bM/dO76Ki19glhfxwJXGNdm6RmtR\nCWhgufT7k4qxA/heefQ4XAHhsYeQkMLMQI93OqxbqptfSHFpBxgSHUQZAoGBAMZS\n0z1UNSGA1GRdcNB6WT712gmpl/HID4mDVuNZKTKI0bwvnIicDRLe+JPa47d2jPKu\nZeoXN8rrnSws36WgZoJ7lIAd2N02z1R32ss3ap2BW6wIiEzeX5CH879YE+tVXXFn\nVboDi2rFEuE2QUIhkOoIleq4KZuMzgABVSoaCp91AoGBAOU6/M/MKy1xJpqdRF6M\nGk7bwpDOc5YwAm8Yryv0YOWpypFqVeqoYsAeMBrNvIQ/7Ln8Rj36JB+kwT8gkhma\nIigTw3/ZB2dU9Lkd8JUtL3F3FdDaYtZhpZ3F7Id9nFscPROqQdzOAh4gP2YBqgkr\nV3+qOU5nXl201v4v1qnzvITf\n-----END PRIVATE KEY-----\n";
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    private_key: PRIVATE_KEY.replace(/\\n/g, "\n"),
                    client_email: "moonhack-register@moonhack.iam.gserviceaccount.com",
                    project_id: "moonhack",
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
