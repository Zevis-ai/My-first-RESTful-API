import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    try {
        console.log('Authorization header:', req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log('Decoded token:', decoded);
        req.userData = decoded;
        next();
    } catch (error) {
        console.error('Auth error:', error.message);
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};



export default checkAuth;
