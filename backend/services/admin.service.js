const Admin = require('../models/Admin');
const { generateToken } = require('../utils/jwt.util');
const ROLES = require('../constants/roles');

class AdminService {
  async registerAdmin(name, email, password, confirmPassword) {
    // Validation
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new Error('Email already registered');
    }

    // Create new admin
    const admin = new Admin({
      name,
      email,
      password,
      role: ROLES.ADMIN,
    });

    await admin.save();

    const token = generateToken(admin._id);

    return {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  async loginAdmin(email, password) {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error('Invalid email or password');
    }

    // Check password
    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(admin._id);

    return {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  async getAdminById(id) {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new Error('Admin not found');
    }

    return {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };
  }
}

module.exports = new AdminService();
