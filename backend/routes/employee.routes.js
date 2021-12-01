module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
    var upload = require('../multer/upload');
  
    // Create a new Employee
    router.post("/", upload.single('file'), employees.create);
  
    // Retrieve all Employees
    router.get("/", employees.findAll);

    // Retrieve a single Employee with id
    router.get("/:id", employees.findOne);
  
    // Update an Employee with id
    router.put("/:id", upload.single('file'), employees.update);
  
    // Delete an Employee with id
    router.delete("/:id", employees.delete);
  
    app.use('/api/employees', router);
  };