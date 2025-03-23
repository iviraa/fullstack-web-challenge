const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  // Remove "Bearer " prefix if it exists
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user ? verified.user : verified;
    console.log("Verified payload:", verified);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
