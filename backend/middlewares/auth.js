import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ sucess: false, message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

export default authMiddleware;
