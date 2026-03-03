const Customer = require('../models/Customer');

class CustomerService {
  async getAllCustomers() {
    return await Customer.find().sort({ createdAt: -1 });
  }

  async createCustomer({ name, email, phone, company, address }) {
    if (!name) throw new Error('Customer name is required');
    const customer = new Customer({ name, email, phone, company, address });
    await customer.save();
    return customer;
  }

  async updateCustomer(id, { name, email, phone, company, address }) {
    const customer = await Customer.findById(id);
    if (!customer) throw new Error('Customer not found');
    if (name)    customer.name    = name;
    if (email !== undefined)   customer.email   = email;
    if (phone !== undefined)   customer.phone   = phone;
    if (company !== undefined) customer.company = company;
    if (address !== undefined) customer.address = address;
    await customer.save();
    return customer;
  }

  async deleteCustomer(id) {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) throw new Error('Customer not found');
    return customer;
  }
}

module.exports = new CustomerService();
