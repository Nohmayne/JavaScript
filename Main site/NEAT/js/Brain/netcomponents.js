class Synapse {
	constructor(inDex, outDex, weight) {
		this.indices = [ inDex, outDex ];
		this.weight = weight;
	}

	pass(value) {
		return value * this.weight;
	}
}

class cNode {
	constructor(type) {
		this.type = type;
		if (this.type == 'INPUT' || this.type == 'OUTPUT') {
			this.alive = true;
		} else if (this.type == 'HIDDEN') {
			this.alive = false;
		} else {
			console.error("Invalid type in Node constructor: no recognized type '" + this.type + "'");
		}
		this.value = 0;
	}

	setValue(value) {
		this.value = value;
	}
}
