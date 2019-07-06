const express = require('express');
const router = express.Router();
const { Spot, Category, db } = require('../db/models');

//GET all
router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll({ include: [{ model: Category }] });
    res.send(spots);
  } catch (err) {
    next(err);
  }
});

//GET one
router.get('/:id', async (req, res, next) => {
  try {
    const spot = await Spot.findOne({
      where: [{ id: req.params.id }],
      include: [{ all: true }],
    });
    res.send(spot);
  } catch (err) {
    next(err);
  }
});

//CREATE one
router.post('/', async (req, res, next) => {
  try {
    console.log('body', req.body);
    const spot = await Spot.create(req.body);
    res.json(spot);
  } catch (err) {
    next(err);
  }
});

//UPDATE one
router.put('/:id', async function(req, res, next) {
  try {
    const spot = await Spot.findByPk(+req.params.id);
    if (!spot) return res.sendStatus(404);
    await spot.update({ completed: !spot.completed });
    res.sendStatus(204).json(spot);
  } catch (err) {
    next(err);
  }
});

//DELETE one
router.delete('/:id', async function(req, res, next) {
  try {
    await Spot.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
