const Item = require('../item');
const express = require('express');
const router = express.Router();

router.get('', (req, res, next) => {
	try {
		return res.json({ items: Item.findAll() });
	} catch (err) {
		return next(err);
	}
});

router.post('', (req, res, next) => {
	try {
		let newItem = new Item(req.body.name, req.body.price);
		return res.json({ added_item: newItem });
	} catch (err) {
		return next(err);
	}
});

router.get('/:name', (req, res, next) => {
	try {
		let foundItem = Item.find(req.params.name);
		return res.json({ item: foundItem });
	} catch (err) {
		return next(err);
	}
});

router.patch('/:name', (req, res, next) => {
	try {
		let updatedItem = Item.update(req.params.name, req.body);
		return res.json({ updated_item: updatedItem });
	} catch (err) {
		return next(err);
	}
});

router.delete('/:name', (req, res, next) => {
	try {
		Item.remove(req.params.name);
		return res.json({ message: `Deleted item with name ${req.params.name}` });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
