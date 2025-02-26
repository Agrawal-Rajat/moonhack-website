import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle raw multipart data
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    // Set up temporary directory for uploaded files
    form.uploadDir = '/tmp';
    form.keepExtensions = true;

    // Parse the form data
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ message: 'Form parsing error.' });
      }

      const { name, contact, email, college, city, teamName, teamMembers, utr } = fields;
      const file = files.paymentScreenshot ? files.paymentScreenshot[0] : null;

      try {
        // Google Sheets and Drive configuration
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY); // Service account credentials
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file',
          ],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const drive = google.drive({ version: 'v3', auth });

        const sheetId = process.env.GOOGLE_SHEET_ID; // Sheet ID

        // Prepare the team data for Google Sheets
        const teamData = teamMembers.map((member) => [
          member.name,
          member.contact,
          member.college,
        ]);

        // Append registration data to Google Sheets, starting from A2
        const appendResponse = await sheets.spreadsheets.values.append({
          spreadsheetId: sheetId,
          range: 'Sheet1!A2', // Starting from A2 to avoid overwriting header
          valueInputOption: 'RAW',
          resource: {
            values: [
              [name, contact, email, college, city, teamName, utr],
              ...teamData,
            ],
          },
        });

        // Extract the row number where the data was appended
        const rowNumber = appendResponse.data.updates.updatedRange.split('!')[1].split(':')[0].replace(/[A-Z]/g, '');

        // Upload the payment screenshot to Google Drive if present
        let imageUrl = null;
        if (file) {
          const filePath = file.filepath;

          const driveResponse = await drive.files.create({
            requestBody: {
              name: file.originalFilename,
              mimeType: file.mimetype,
              parents: ['1pevxLHbW9g90gMZbERoCyALSNPDxVER-'], // Google Drive folder ID
            },
            media: {
              body: fs.createReadStream(filePath),
            },
          });

          const fileId = driveResponse.data.id;
          imageUrl = `https://drive.google.com/uc?id=${fileId}`; // Generate the public URL of the file
        }

        // Update the image URL in the corresponding row in Google Sheets
        if (imageUrl) {
          await sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: `Sheet1!H${rowNumber}`, // Column H will store the image URL
            valueInputOption: 'RAW',
            resource: {
              values: [[imageUrl]],
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
