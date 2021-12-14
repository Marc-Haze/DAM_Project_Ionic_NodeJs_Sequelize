module.exports = app => {
  const maintenances = require("../controllers/maintenance.controller.js");
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Create a new Maintenance
  router.post("/", maintenances.create);

  // Retrieve all Maintenances
  router.get("/", maintenances.findAll);

  // Retrieve a single Maintenance with id
  router.get("/:id", maintenances.findOne);

  // Retrieve all Maintenances equals an id
  router.get("/user/:id", maintenances.findAllByUserId);

  // Update a Maintenance with id
  router.put("/:id", maintenances.update);

  // Delete a Maintenance with id
  router.delete("/:id", maintenances.delete);

  app.use('/api/maintenances', router);
};