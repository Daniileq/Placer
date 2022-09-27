const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, path.resolve(`${__dirname}/../public/images`));
    cb(null, path.resolve(`${__dirname}/../../client-react/build/static/media`));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});
const upload = multer({ storage });

module.exports = upload;
