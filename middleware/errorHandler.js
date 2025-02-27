const handleError = (err, req, res, next) => {
    console.error('Error occurred:', err.message);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
}


module.exports = handleError