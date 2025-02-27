
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 100000000,
    },
    // fileFilter(req, file, cb) {
    //     console.log("*file at multer modlue*")
    //     console.log(file)
    //     if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
    //         return cb(new Error("Please upload a valid image file"));
    //     }
    //     cb(undefined, true);
    // },

});


module.exports = upload;
