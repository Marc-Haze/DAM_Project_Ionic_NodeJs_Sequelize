const db = require("../models");
const user = require("../models/user");
const Employee = db.employee;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Ship
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email || !req.body.job) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
    // Create an Employee
    const employee = { 
      name: req.body.name,
      email: req.body.email,
      telephone: req.body.telephone,
      address: req.body.address,
      job: req.body.job,
      filename: req.file.filename,
    };
    
    // Save Employee in the database
     Employee.create(employee)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Employee."
        });
      });

};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
  Employee.findAll( {include: [{model: User, required: false}]} )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

// Find a single Employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id, {include: [{model: User, required: false}]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id
      });
    });
};

// Update an Employee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Ship was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

// Delete an Employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Ship was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};