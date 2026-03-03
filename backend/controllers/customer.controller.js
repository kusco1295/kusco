const customerService = require('../services/customer.service');
const { successResponse, errorResponse } = require('../utils/response.util');

class CustomerController {
  async getAll(req, res) {
    try {
      const customers = await customerService.getAllCustomers();
      return successResponse(res, { customers }, 'Customers fetched successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, 500, error);
    }
  }

  async create(req, res) {
    try {
      const { name, email, phone, company, address } = req.body;
      const customer = await customerService.createCustomer({ name, email, phone, company, address });
      return successResponse(res, { customer }, 'Customer created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message, 400, error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, phone, company, address } = req.body;
      const customer = await customerService.updateCustomer(id, { name, email, phone, company, address });
      return successResponse(res, { customer }, 'Customer updated successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, 400, error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await customerService.deleteCustomer(id);
      return successResponse(res, {}, 'Customer deleted successfully', 200);
    } catch (error) {
      return errorResponse(res, error.message, 400, error);
    }
  }
}

module.exports = new CustomerController();
