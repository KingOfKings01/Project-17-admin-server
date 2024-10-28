const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { admin } = new PrismaClient();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

// Create Admin
const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);
    const admin = await admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Authenticate Admin
const authenticateAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: 'Admin user is not exist!' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid or password!' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAdmin,
  authenticateAdmin,
};
