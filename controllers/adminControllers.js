const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { admin } = new PrismaClient();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

// Create Admin
const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(SALT_ROUNDS, email, password);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log(hashedPassword);
    const adminUser = await admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: adminUser.id, email: adminUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Authenticate Admin
const authenticateAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminUser = await admin.findUnique({ where: { email } });

    if (!adminUser) {
      return res.status(401).json({ message: 'Admin user is not exist!' });
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid or password!' });
    }

    const token = jwt.sign({ id: adminUser.id, email: adminUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
  authenticateAdmin,
};
