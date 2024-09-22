const mime = require('mime-types');

exports.getOperationCode = (req, res) => {
  res.status(200).json({ "operation_code": 1 });
};

exports.handlePostRequest = (req, res) => {
  const { data, file_b64 } = req.body;
  const user_id = "nalin_krishali_15072002"; // Example user ID
  const email = "nr0700@srmist.edu.in";
  const roll_number = "RA2111003010561";

  let numbers = [], alphabets = [], highest_lowercase = [];

  // Separate numbers and alphabets
  if (data && Array.isArray(data)) {
    data.forEach(item => {
      if (!isNaN(item)) numbers.push(item);
      else if (/[a-zA-Z]/.test(item)) {
        alphabets.push(item);
        if (/[a-z]/.test(item)) highest_lowercase.push(item);
      }
    });
  }

  // Determine highest lowercase alphabet
  highest_lowercase = highest_lowercase.sort().slice(-1);

  // File validation logic
  const file_valid = req.fileValid;
  const file_mime_type = req.fileMimeType;
  const file_size_kb = req.fileSizeKb;

  res.json({
    "is_success": true,
    "user_id": user_id,
    "email": email,
    "roll_number": roll_number,
    "numbers": numbers,
    "alphabets": alphabets,
    "highest_lowercase_alphabet": highest_lowercase,
    "file_valid": file_valid,
    "file_mime_type": file_mime_type,
    "file_size_kb": file_size_kb
  });
};
