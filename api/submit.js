import { google } from 'googleapis';
import { IncomingForm } from 'formidable';
import fs from 'fs';

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle raw multipart data
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    console.log(form);
    form.uploadDir = '/tmp'; // Temporary directory for uploaded files (in Vercel)
    form.keepExtensions = true; // Retain file extensions

    // Handle form submission
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ message: 'Form parsing error.' });
      }

      const { name, contact, email, college, city, teamName, teamMembers, utr } = fields;
      const file = files.paymentScreenshot && files.paymentScreenshot[0];

      // Set up the Google Sheets and Google Drive client using the service account
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY); // Service account key stored in environment variable
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive.file',
        ],
      });

      const sheets = google.sheets({ version: 'v4', auth });
      const drive = google.drive({ version: 'v3', auth });
      const sheetId = process.env.GOOGLE_SHEET_ID; // Google Sheets ID

      try {
        // Prepare team data to append to Google Sheets
        const teamData = teamMembers.map(member => [
          member.name,
          member.contact,
          member.college,
        ]);

        // Append registration data to Google Sheets, starting from A2
        const sheetResponse = await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Sheet1!A2', // Start appending data from A2
          valueInputOption: 'RAW',
          resource: {
            values: [
              [name, contact, email, college, city, teamName, utr],
              ...teamData,
            ],
          },
        });

        const rowNumber = sheetResponse.data.updates.updatedRange.split('!')[1].split(':')[0].replace(/[A-Z]/g, '');

        // Upload the payment screenshot to Google Drive
        let imageUrl = null;
        if (file) {
          const filePath = file.path;

          const driveResponse = await drive.files.create({
            requestBody: {
              name: file.originalFilename,
              mimeType: file.mimetype,
              parents: ['1pevxLHbW9g90gMZbERoCyALSNPDxVER-'], // Google Drive folder ID (ensure this is correct)
            },
            media: {
              body: fs.createReadStream(filePath),
            },
          });

          // Retrieve the file URL after uploading
          const fileId = driveResponse.data.id;
          imageUrl = `https://drive.google.com/uc?id=${fileId}`; // Generate public URL of the uploaded file
        }

        // Append the image URL to the Google Sheets in the same row
        if (imageUrl) {
          await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: `Sheet1!H${rowNumber}`, // Update the image URL in column H of the correct row
            valueInputOption: 'RAW',
            resource: {
              values: [[imageUrl]],  // Store the image URL in the correct column
            },
          });
        }

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
