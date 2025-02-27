require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET


const setAuditFields = async (req, res, next) => {
    // bypass if token is not available
    const hardcodetoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImlhdCI6MTcyMjI1MTg1NX0.135tBFEr6VBhcNrVHDoGQt8u0wRggGJDrf4aI71g2nU'

    console.log("ADFDS");
    let token = req.headers.authorization;
    console.log("token", token);
    if (token) {
        token = token.split(' ')[1];
        if (typeof token !== 'string') {
            return res.status(400).json({ message: 'Invalid token format' });
        }
    } else {
        token = hardcodetoken;
        console.warn('No authorization header provided. Using hardcoded token.');
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            console.log("jwterro", err);
            return res.status(401).json({ message: 'Token verification failed' });
        }
        const userinfo = decoded;
        if (req.method === 'POST') {
            req.body.created_by = userinfo.first_name || 'NA';
            req.body.updated_by = '';
            req.body.user_id = userinfo.email || "N/A";
        } else if (req.method === 'PUT') {
            req.body.updated_by = userinfo.first_name || 'NA';
            req.body.user_id = userinfo.email || "N/A";

        }
        else if (req.method === 'DELETE') {
            req.body.updated_by = userinfo.first_name || 'NA';
            req.body.user_id = userinfo.email || "N/A";


        }
        next();
    });
};

module.exports = setAuditFields;