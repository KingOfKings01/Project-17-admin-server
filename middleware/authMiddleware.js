const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

exports.authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.user = admin; // Attach admin object to request
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
