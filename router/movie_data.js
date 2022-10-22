const Router = require("express").Router();

const MovieData = require("../model/MovieData");

Router.post("/add", async (req, res) => {
  try {
    const {
      secret,
      name,
      wood,
      thumblainImg,
      trailerUrl,
      timestamp
    } = req.body;

    if (secret === process.env.SECRET_CODE) {
      const data = new MovieData({
        Name: name,
        Img: thumblainImg,
        Trailer: trailerUrl,
        TimeStamp: timestamp,
        Wood: wood,
      });
      data.save();
      res.json(data);
    } else {
      res.json({ msg: "Secret Code Not Match" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

Router.post("/update", async (req, res) => {
  try {
    const {
      uid,
      secret,
      name,
      wood,
      thumblainImg,
      trailerUrl,
      timestamp,
    } = req.body;

    if (secret === process.env.SECRET_CODE) {
      const data = await MovieData.updateOne(
        { _id: uid },
        {
          $set: {
            Name: name,
            Img: thumblainImg,
            Trailer: trailerUrl,
            TimeStamp: timestamp,
            Wood: wood,
          },
        }
      );

      res.json(data);
    } else {
      res.json({ msg: "Secret Code Not Match" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await MovieData.deleteOne({ _id: id });
    res.json(data);
  } catch (err) {
    res.json({ msg: err });
  }
});

Router.post("/fetch", async (req, res) => {
  try {
    const data = await MovieData.find();

    res.json(data);
  } catch (err) {
    res.json({ msg: err });
  }
});

Router.post("/fetch/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await MovieData.find({ _id: id });

    res.json(data);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = Router;
