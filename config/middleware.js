const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports.auth = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    // Extract token and trim any 'Bearer ' prefix
    const token = authHeader.replace('Bearer ', '').trim();
 

    try {
        if (token.length < 500) {
            // Likely a custom JWT token; verify with your JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach decoded info to request
        } else {
            // Likely a Google OAuth token; verify with Google
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            req.user = { id: payload['sub'], email: payload['email'] }; // Attach Google user info to request
        }
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({ message: "Token is not valid" });
    }
};
