const express = require('express');
const router = express.Router();
const { Spot, Category, db } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({ include: [{ all: true }] });
    res.send(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: [{ id: req.params.id }],
      include: [{ all: true }],
    });
    res.send(category);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    await Category.destroy({
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
