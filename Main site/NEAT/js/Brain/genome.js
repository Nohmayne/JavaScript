class Genome {
	constructor(ins, outs, mutationRate) {
		this.ins = ins;
		this.outs = outs;

		this.hids = (this.ins + this.outs) / 2;
		this.hids *= 1.5;
		this.hids = Math.ceil(this.hids);

		this.mutationRate = mutationRate;

		this.inLayer = Array(this.ins);
		this.hidLayer = Array(this.hids);
		this.outLayer = Array(this.outs);

		this.ws1 = [];
		this.ws2 = [];

		for (var i = 0; i < this.inLayer.length; i++) {
			this.inLayer[i] = new cNode('INPUT');
		}
		for (var j = 0; j < this.hidLayer.length; j++) {
			this.hidLayer[j] = new cNode('HIDDEN');

			for (var w = 0; w < this.inLayer.length; w++) {
				this.ws1.push(new Synapse(w, j, random(-2, 2)));
			}
		}
		for (var k = 0; k < this.outLayer.length; k++) {
			this.outLayer[k] = new cNode('OUTPUT');

			for (var w = 0; w < this.hidLayer.length; w++) {
				this.ws2.push(new Synapse(w, k, random(-2, 2)));
			}
		}
	}

	activation(input) {
		return 1 / (1 + Math.exp(-input));
	}

	reset(array) {
		for (var i = 0; i < array.length; i++) {
			array[i].value = 0;
		}
	}

	forward(inputs) {
		// Reset inputs
		this.reset(this.inLayer);

		// Assign given inputs to input layer
		if (inputs.length == this.inLayer.length) {
			for (var i = 0; i < inputs.length; i++) {
				this.inLayer[i].addValue(inputs[i]);
			}
		} else {
			console.error('Inputs and input layer not equal in length');
		}

		// Reset the hidden layer
		this.reset(this.hidLayer);

		// Transfer inputs with weights to hidden layer and activate
		for (var i = 0; i < this.ws1.length; i++) {
			this.hidLayer[this.ws1[i].indices[1]].addValue(
				this.ws1[i].pass(this.inLayer[this.ws1[i].indices[0]].value)
			);
		}

		// Activate hidden layer
		for (var h = 0; h < this.hidLayer.length; h++) {
			this.hidLayer[h].value = this.activation(this.hidLayer[h].value);
		}

		// Reset output layer
		this.reset(this.outLayer);

		// Transfer hidden layer with weights to out layer and activate
		for (var j = 0; j < this.ws2.length; j++) {
			this.outLayer[this.ws2[j].indices[1]].addValue(
				this.ws2[j].pass(this.hidLayer[this.ws2[j].indices[0]].value)
			);
		}

		// Activate out layer
		for (var o = 0; o < this.outLayer.length; o++) {
			this.outLayer[o].value = this.activation(this.outLayer[o].value);
		}
	}
}
