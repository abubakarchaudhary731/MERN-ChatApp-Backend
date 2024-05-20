const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Multer upload instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, // 2MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}).single('avatar'); // 'avatar' is the field name in the form

// Middleware function to handle file upload
const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({ error: 'Multer error: ' + err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({ error: 'Unknown error: ' + err });
        }
        // File upload was successful.
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = uploadMiddleware;
