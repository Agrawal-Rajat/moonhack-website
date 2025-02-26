import { google } from 'googleapis';
import multer from 'multer';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

// Set up file upload with multer
const upload = multer({
  dest: '/tmp/', // Temporary directory for file upload in Vercel
});

export const config = {
  api: {
    bodyParser: false,  // Disable bodyParser to handle raw multipart data
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.uploadDir = '/tmp'; // Vercel's tmp directory for uploaded files
    form.keepExtensions = true;

    // Handle form submission
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Form parsing error.' });
      }

      const { name, contact, email, college, city, teamName, teamMembers, utr } = fields;
      const file = files.paymentScreenshot && files.paymentScreenshot[0];

      // Set up the Google Sheets and Google Drive client using the service account
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY); // Store your service account key in an environment variable or Vercel Secret

      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file',
        ],
      });

      const sheets = google.sheets({ version: 'v4', auth });
      const drive = google.drive({ version: 'v3', auth });
      const sheetId = process.env.GOOGLE_SHEET_ID; // Google Sheets ID (use Vercel env variable)

      try {
        // Store form data in Google Sheets
        const teamData = teamMembers.map(member => [
          member.name,
          member.contact,
          member.college,
        ]);

        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Sheet1!A1', // Change range as needed
          valueInputOption: 'RAW',
          resource: {
            values: [
              [name, contact, email, college, city, teamName, utr],
              ...teamData,
            ],
          },
        });

        // Upload the payment screenshot to Google Drive
        let imageUrl = null;
        if (file) {
          const filePath = file.path;

          const driveResponse = await drive.files.create({
            requestBody: {
              name: file.originalFilename,
              mimeType: file.mimetype,
              parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Optional: specify folder
            },
            media: {
              body: fs.createReadStream(filePath),
            },
          });

          // Retrieve the file URL after uploading
          const fileId = driveResponse.data.id;
          imageUrl = `https://drive.google.com/uc?id=${fileId}`; // Generate public URL of the uploaded file
        }

        // Now that we have the image URL, append it to the Google Sheet
        await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Sheet1!A1', // Adjust range if necessary
          valueInputOption: 'RAW',
          resource: {
            values: [[imageUrl]],  // Store the image URL
          },
        });

        console.log('File uploaded to Drive:', imageUrl);
        return res.status(200).json({ message: 'Registration successful!' });
      } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
