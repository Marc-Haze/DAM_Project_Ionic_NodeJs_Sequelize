module.exports = app => {
    const ships = require("../controllers/ship.controller.js");
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Ships
    router.post("/", ships.create);
  
    // Retrieve all Ships
    router.get("/", ships.findAll);

    // Retrieve a single Ships with id
    router.get("/:id", ships.findOne);
  
    // Update a Ship with id
    router.put("/:id", ships.update);
  
    // Delete a Ship with id
    router.delete("/:id", ships.delete);
  
    app.use('/api/ships', router);
  };