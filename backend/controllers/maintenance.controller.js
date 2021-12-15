const db = require("../models");
const Maintenance = db.maintenance;
const Employee = db.employee;
const Ship = db.ship;
const Op = db.Sequelize.Op;

// Create and Save a new Maintenance
exports.create = (req, res) => {
  // Validate request
  if (!req.body.service || !req.body.state || !req.body.dock) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Ship
  const maintenance = {
    service: req.body.service,
    state: req.body.state,
    description: req.body.description,
    dock: req.body.dock,
    note: req.body.note,
    shipId: req.body.shipId,
    employeeId: req.body.employeeId
  };

  // Save Maintenance in the database
  Maintenance.create(maintenance)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Maintenance."
      });
    });
};

// Retrieve all Maintenances from the database.
exports.findAll = (req, res) => {
    Maintenance.findAll( {include: [{model: Ship, as:"ship",  required:false}]} )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Maintenances."
      });
    });
};

// Find a single Maintenance with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Maintenance.findByPk(id, {include: [{model: Ship, as:"ship",  required:false}]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Maintenance with id=" + id
      });
    });
};

// Retrieve all Maintenances from the database with equals Id as employeeId.
exports.findAllByUserId = (req, res) => {
  const id = req.params.id;

  Maintenance.findAll({ where: { userId: id } })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving maintenances."
          });
      });
};

// Update a Maintenance by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Maintenance.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Maintenance was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Maintenance with id=${id}. Maybe Maintenance was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Maintenance with id=" + id
      });
    });
};

// Delete a Maintenance with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Maintenance.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Maintenance was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Maintenance with id=${id}. Maybe Ship was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Maintenance with id=" + id
      });
    });
};