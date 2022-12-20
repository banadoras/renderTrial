const express = require("express");
const router = express.Router();

//------- import User model
const Item = require("../models/item");

//------ import authenticate to protect viewing individual items (item page)
const {authenticate} = require("../auth")

router
  .route("/")
  .get(async (req, res) => {
    try {
      const items = await Item.find({});
      if (items) {
        res.send(items)
      } else {
        res.send(items)
      }
    } catch (error) {
      res.send(error);
    }
  })
  .post(async (req, res) => {
    try {
      const newItem = await Item.create(req.body);
      let message = ""
      if (newItem) {
        res.send(newItem)
      } else {
        res.send(new Error("Not sure what happened!"))
      }
    } catch (error) {
      res.send(error)
    }
  })
  .delete(async (req, res) => {
    try {
      const deleteAllItems = await Item.deleteMany({});
      if (deleteAllItems) {
        res.send(deleteAllItems)
      } else {
        res.send(new Error("Not sure what happened"))
      }
    } catch (error) {
      res.send(error)
    }
  });

router
  .route("/:id")
  .get(authenticate,async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (item) {
        res.send(item)
      } else {
        res.send(new Error("Note sure what happened"))
      }
    } catch (error) {
      res.send(error)
    }
  })
  .put(async (req, res) => {
    try {
      const item = await Item.findOneAndReplace(
        { id: req.params.id },
        req.body,
        { returnDocument: "after" }
      );
      if (item) {
          res.send(item)
      } else {
        res.send(new Error("Not sure what happened"))
      }
    } catch (error) {
      res.send(error)
    }
  })
  .patch(async (req, res) => {
    console.log(req.body)
    try {
      const item = await Item.findByIdAndUpdate(
        req.params.id ,
        req.body,
        { returnDocument: "after" }
      );
      if (item) {
        res.send(item)
      } else {
        res.send(new Error("Not sure what happened"))
      }
    } catch (error) {
      res.send(error)
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id );
      if (deletedItem) {
        res.send(deletedItem)
      } else {
         res.send(new Error("Not sure what happened"))
      }
    } catch (error) {
      res.send(error)
    }
  });

module.exports = router;
