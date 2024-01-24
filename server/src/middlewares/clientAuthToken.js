import jwt from "jsonwebtoken";

export const clientAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(
      token.slice(7, token.length),
      process.env.JWT_SECURITY_KEY
    );
    if (!decodedToken.client) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user_id = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
