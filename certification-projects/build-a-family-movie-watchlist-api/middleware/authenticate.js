
import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const authorization = req.headers?.authorization;

  if (
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ") ||
    !authorization.slice(7).trim()
  ) {
    return res.status(401).json({
      error: "No token provided.",
    });
  }

  const token = authorization.slice(7).trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
}
