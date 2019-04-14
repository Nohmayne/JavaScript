class Synapse {
	constructor(index, weight) {
		this.index = index;
		this.weight = weight;
	}

	pass(value) {
		return value * this.weight;
	}
}

class Node {
	constructor(type) {
		this.type = type;
		if (this.type == INPUT || this.type == OUTPUT) {
			this.alive = true;
		} else if (this.type == HIDDEN) {
			this.alive = false;
		} else {
			console.error("Invalid type in Node constructor: no recognized type '" + this.type + "'");
		}
		this.value = undefined;
	}

	setValue(value) {
		this.value = value;
	}
}
