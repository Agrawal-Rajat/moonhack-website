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
  // CORS handling
  const allowedOrigins = [
    'https://moonhack.tech',
    'https://www.moonhack.tech',
    'https://moonhack-website.vercel.app',
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://moonhack-website.vercel.app'); // Default to Vercel
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Handle form submission for file upload
  const form = new IncomingForm();
  form.uploadDir = '/tmp'; // Temporary directory for uploaded files (in Vercel or local)
  form.keepExtensions = true; // Retain file extensions

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'Form parsing error.' });
    }

    console.log('Fields:', fields); // Log fields to see form data
    console.log('Files:', files); // Log files to see if paymentScreenshot is included

    // Destructure the form fields
    const {
      name, contact, email, college, city, teamName, utr,
      member1Name, member1Contact, member1College,
      member2Name, member2Contact, member2College,
      member3Name, member3Contact, member3College,
      member4Name, member4Contact, member4College,
    } = fields;

    const file = files.paymentScreenshot && files.paymentScreenshot[0]; // Get the uploaded file

    if (!file) {
      return res.status(400).json({ message: 'No payment screenshot uploaded.' });
    }

    console.log('File uploaded:', file);

    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const drive = google.drive({ version: 'v3', auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    try {
      // Prepare team data from 2D array in form data
      const teamData = [
        [member1Name, member1Contact, member1College],
        [member2Name, member2Contact, member2College],
        [member3Name, member3Contact, member3College],
        [member4Name, member4Contact, member4College],
      ].filter(row => row.some(cell => cell)); // Remove empty member entries

      console.log('Team data:', teamData);

      // Append registration data to Google Sheets
      const sheetResponse = await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Sheet1!A2',
        valueInputOption: 'RAW',
        resource: {
          values: [
            [name, contact, email, college, city, teamName, utr],
            ...teamData, // Append team members
          ],
        },
      });

      const rowNumber = parseInt(sheetResponse.data.updates.updatedRange.split(':')[0].match(/\d+/)[0]);

      // Upload the payment screenshot to Google Drive
      let imageUrl = null;
      if (file) {
        const filePath = file.path;
        console.log('File path:', filePath);

        // Check if file exists at path
        if (fs.existsSync(filePath)) {
          console.log('File exists:', filePath);
        } else {
          console.error('File not found at path:', filePath);
          return res.status(500).json({ message: 'File not found on the server.' });
        }

        const driveResponse = await drive.files.create({
          requestBody: {
            name: file.originalFilename,
            mimeType: file.mimetype,
            parents: ["1pevxLHbW9g90gMZbERoCyALSNPDxVER-"], // Google Drive folder ID
          },
          media: {
            body: fs.createReadStream(filePath),
          },
        });

        const fileId = driveResponse.data.id;
        imageUrl = `https://drive.google.com/uc?id=${fileId}`;

        console.log('File uploaded to Drive:', imageUrl);
      }

      // Update the Google Sheet with the image URL
      if (imageUrl) {
        const sheetUpdateResponse = await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: `Sheet1!H${rowNumber}`, // Update column H with the image URL
          valueInputOption: 'RAW',
          resource: {
            values: [[imageUrl]],
          },
        });

        console.log('Google Sheets updated with image URL:', sheetUpdateResponse.data);
      }

      return res.status(200).json({ message: 'Registration successful!', imageUrl });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: error.message || 'Server error. Please try again later.' });
    }
  });
}
