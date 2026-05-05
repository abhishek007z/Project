import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorised",
    });
  }

  
  try {
    const token = authHeader.split(" ")[1]; // 🔥 Bearer hata diya
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorised",
    });
  }
};

export default protect;
