const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const path = require("path");
const Dish = require("../models/Dish");

//@ route Get api/dishes

router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ date: -1 });
    res.json(dishes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@ route Post api/dishes

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("price", "Please enter cost of a item").not().isEmpty(),
    check("label", "Please enter label").not().isEmpty(),
    check("category", "Please enter category").not().isEmpty(),
    check("description", "write something in description").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, label, category, description } = req.body;

    // Handling The Uploaded File
    if (req.files === null) {
      try {
        const newDish = new Dish({
          name,
          price,
          label,
          category,
          description,
        });
        const dish = await newDish.save();
        return res.json(dish);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
      }
    }
    const file = req.files.file;
    file.mv(
      path.join(`${__dirname}`, "..", `/public/images/${file.name}`),
      async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        try {
          const filePath = `/static/images/${file.name}`;
          const newDishWithImage = new Dish({
            name,
            price,
            label,
            image: filePath,
            category,
            description,
          });

          const dish = await newDishWithImage.save();
          return res.json(dish);
        } catch (err) {
          console.error(err.message);
          return res.status(500).send("Server Error");
        }
      }
    );
  }
);
//@ route Get single dish
router.get("/dishes/:dishes_id", async ({ params: { dishes_id } }, res) => {
  try {
    const dish = await Dish.findOne({ _id: dishes_id });

    if (!dish) return res.status(400).json({ msg: "Dish not found" });

    return res.json(dish);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});
// Post Comment By dish id

router.post(
  "/comment/:id",
  [
    check("name", "Name is required").not().isEmpty(),
    check("comment", "Please enter cost of a item").not().isEmpty(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, comment } = req.body;
    try {
      const dish = await Dish.findById(req.params.id);

      const Comment = { name, comment };
      dish.comments.unshift(Comment);
      dish.save();
      res.json(dish.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// Get All Comments
router.get("/comments/:id", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    res.json(dish.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
