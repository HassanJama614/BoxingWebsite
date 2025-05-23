const Class = require("./models/Class");


exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.createClass = async (req, res) => {
  const { name, description, price, imageUrl, instructor } = req.body;
  try {
    const newClass = new Class({
      name,
      description,
      price,
      imageUrl,
      instructor,
    });
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error creating class", error: error.message });
  }
};
