module.exports = app => {
    const maintenances = require("../controllers/maintenance.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Ships
    router.post("/", maintenances.create);
  
    // Retrieve all Ships
    router.get("/", maintenances.findAll);

    // Retrieve a single Ships with id
    router.get("/:id", maintenances.findOne);
  
    // Update a Ship with id
    router.put("/:id", maintenances.update);
  
    // Delete a Ship with id
    router.delete("/:id", maintenances.delete);
  
    app.use('/api/maintenances', router);
  };