const multer = require('multer');
const path = require('path');


// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {
      // Generate a unique name for the file
    //   cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    cb(null, `${file.fieldname}-${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
    // const fieldName = file.fieldname;
    // const originalFilename = file.originalname;
    // const extension = path.extname(originalFilename);
    // const timestamp = Date.now();
    // const uniqueFilename = `${fieldName}-${originalFilename}-${timestamp}${extension}`;
    // cb(null, uniqueFilename);
    }
  });

  // Initialize multer with storage configuration
  const upload = multer({ storage: storage });
  
  // POST route to handle file uploads along with name and number
  app.post('/upload', upload.fields([
    { name: 'name', maxCount: 1 }, // For name
    { name: 'number', maxCount: 1 }, // For number
    { name: 'image1', maxCount: 1 }, // For image file 1
    { name: 'image2', maxCount: 1 }, // For image file 2
    { name: 'image3', maxCount: 1 }, // For image file 3
    { name: 'document', maxCount: 1 } // For document file
  ]), (req, res) => {
    // Access uploaded files and other fields from req.body and req.files
    const { name, number } = req.body;
    const { image1, image2, image3, document } = req.files;
    const img1 = image1[0].path;
    console.log( image1, image2, image3, document, img1 )
  
    // Handle file upload logic here (e.g., saving file paths to database)
  
    // Respond with a success message
    res.status(200).json({ message: 'Files uploaded successfully!' });
  });