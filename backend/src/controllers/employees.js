const employeeCtrl = {};

const Employee = require("../models/Employee");

employeeCtrl.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.log(err);
  }
};
employeeCtrl.createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json({ message: "employee created" });
  } catch (err) {
    console.log(err);
  }
};
employeeCtrl.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
  } catch (err) {
    console.log("not found");
  }
};
employeeCtrl.editEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.json({ status: "Employee updated" });
  } catch (err) {
    console.log(err);
  }
};
employeeCtrl.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ status: "Employee deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = employeeCtrl;
