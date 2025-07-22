const multer = require('multer');
const path = require('path');

// Define storage location
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../uploads'));
//     },
//     filename: (req, file, cb) => {
//         const sanitized = file.originalname.replace(/\s+/g, '_');
//         cb(null, `${Date.now()}-${sanitized}`);
//     }
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const sanitized = file.originalname.replace(/\s+/g, '_');
        cb(null, `${Date.now()}-${sanitized}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024,
        fieldSize: 100 * 1024 * 1024
    }, // 100MB
});

module.exports = upload;












