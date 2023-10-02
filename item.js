const items = require('./fakeDb');

class Item {
	constructor(name, price) {
		this.name = name;
		this.price = price;

		items.push(this);
	}

	static findAll() {
		return items;
	}

	static find(name) {
		let foundItem = items.find((item) => {
			return item.name == name;
		});
		if (!foundItem) {
			throw { message: 'Item not found', status: 404 };
		}
		return foundItem;
	}

	static update(name, data) {
		let foundItem = Item.find(name);
		if (!foundItem) {
			throw { message: 'Item not found', status: 404 };
		}
		foundItem.name = data.name;
		foundItem.price = data.price;
		return foundItem;
	}

	static remove(name) {
		let item_to_remove = Item.find(name);
		if (!item_to_remove) {
			throw { message: 'Item not found', status: 404 };
		}
		items.splice(items.indexOf(item_to_remove), 1);
	}
}

module.exports = Item;
