const mime = require('mime-types');

module.exports = (req, res, next) => {
  const { file_b64 } = req.body;
  if (file_b64) {
    const buffer = Buffer.from(file_b64, 'base64');
    const file_mime_type = mime.lookup(buffer);
    const file_size_kb = buffer.length / 1024;

    req.fileValid = file_mime_type ? true : false;
    req.fileMimeType = file_mime_type;
    req.fileSizeKb = file_size_kb;
  } else {
    req.fileValid = false;
    req.fileMimeType = '';
    req.fileSizeKb = 0;
  }

  next();
};
