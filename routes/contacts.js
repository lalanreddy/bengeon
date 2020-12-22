const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Contact = require("../models/Contact");

//@ route Post api/contacts

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "email is required").not().isEmpty(),
    check("contact", "write something why do want to contact us")
      .not()
      .isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        contactus: req.body.contact,
      });

      const contact = await newContact.save();

      return res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
