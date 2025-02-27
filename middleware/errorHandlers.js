module.exports = {


    handleNotFound: (req, res, next) => {
        res.status(404).json({ error: 'Route not found' });
    },


    handleErrors: (err, req, res, next) => {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
