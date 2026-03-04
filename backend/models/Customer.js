const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    address: { type: String, trim: true },
    equipmentName: { type: String, trim: true },
    make: { type: String, trim: true },
    modelNo: { type: String, trim: true },
    liquid: { type: String, trim: true },
    temperature: { type: String, trim: true },
    pressure: { type: String, trim: true },
    attachment: { type: String },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
