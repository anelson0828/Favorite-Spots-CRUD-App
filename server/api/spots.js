const express = require('express');
const router = express.Router();
const { Spot, Category, db } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll({ include: [{ model: Category }] });
    res.send(spots);
  } catch (err) {
    next(err);
  }
});

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

router.post('/', async (req, res, next) => {
  try {
    const spot = await Spot.create(req.body);
    res.json(spot);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const spot = await Spot.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.status(201).json(spot);
  } catch (err) {
    next(err);
  }
});

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
