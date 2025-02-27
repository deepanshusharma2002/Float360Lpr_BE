const { document } = require('../models'); // Adjust the path according to your file structure
const {Op} = require('sequelize')
// Create a new document
exports.createDocument = async (req, res, next) => {
  try {
    console.log("-----------servedrfd")
    console.log(req.files);
    console.log(req.body);

    const metadata = req.body; 
    const{created_by} = req.body;
    const filesdata = req.files; 
    const documentData = [];
    //create document data
    for (let i = 0; i < filesdata.length; i++) {
      const file = filesdata[i];
      const meta = metadata[i];
      // Prepare the document data
      const data = {
        linked_id: meta.linked_id,
        table_name: meta.table_name,
        type: meta.type,
        doc_name: file.originalname,
        doc_base64: file.buffer.toString('base64'),
        created_by: created_by,
        title: meta.title,
        status: 1
      };
        documentData.push(data);
    }
    // Bulk create documents in the database
    console.log(documentData);
    await document.bulkCreate(documentData);
    res.status(201).json({ msg: "Documents Submitted Successfully" });

  } catch (error) {
    next(error)
  }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await document.findAll();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a document by ID
exports.getDocumentById = async (req, res) => {
  try {
    let {doc_id}= req.query;
    const doc = await document.findByPk(doc_id);
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a document by ID
exports.getpoDocumentById = async (req, res) => {
  try {
    let {entity_id}= req.query;
    const doc = await document.findAll({
      where: {
        [Op.and]: [
          { linked_id: entity_id },
          { table_name: 'PO' }
        ]
      }
    });
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Update a document by ID
exports.updateDocument = async (req, res) => {
  try {
    const [updated] = await document.update(req.body, {
      where: { document_id: req.params.id },
    });
    if (updated) {
      const updatedDoc = await document.findByPk(req.params.id);
      res.status(200).json(updatedDoc);
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a document by ID
exports.deleteDocument = async (req, res) => {
  try {
    const deleted = await document.update(
      { status: 0 },
      {
        where: {
          document_id: req.query.document_id
        },
      }
    );
    if (deleted) {
      res.status(204).send("Deleted Successfully");
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
