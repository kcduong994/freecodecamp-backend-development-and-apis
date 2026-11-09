
export function authorizeModification(req, res, next) {
  const role = req.user?.role;
  const isOwner = String(req.user?.id) === String(req.params?.userId);

  if (role === "parent" || (role === "child" && isOwner)) {
    return next();
  }

  return res.status(403).json({
    error: "Access denied",
  });
}
