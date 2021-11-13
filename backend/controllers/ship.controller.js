const db = require("../models");
const Ship = db.ship;
const Op = db.Sequelize.Op;

// Create and Save a new Ship
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Ship
  const ship = {
    id: req.body.id,
    name: req.body.name,
    type: req.body.type,
    client: req.body.client
  };

  // Save Ship in the database
  Ship.create(ship)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ship."
      });
    });
};

// Retrieve all Ships from the database.
exports.findAll = (req, res) => {
  Ship.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ships."
      });
    });
};

// Find a single Ship with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ship.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Ship with id=" + id
      });
    });
};

// Update a Ship by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ship.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ship was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Ship with id=${id}. Maybe Ship was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Ship with id=" + id
      });
    });
};

// Delete a Ship with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ship.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ship was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Ship with id=${id}. Maybe Ship was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Ship with id=" + id
      });
    });
};