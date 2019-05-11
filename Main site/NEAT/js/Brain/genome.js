class Genome {
	constructor(ins, outs, mutationRate) {
		this.ins = ins;
		this.outs = outs;

		this.hids = (this.ins + this.outs) / 2;
		this.hids *= 1.5;
		this.hids = Math.ceil(this.hids);

		this.mutationRate = mutationRate;

		this.inLayer = Array(this.ins);
		this.hidLayer = [];
		this.outLayer = Array(this.outs);

		this.ws = [];

		for (var i = 0; i < this.inLayer.length; i++) {
			this.inLayer[i] = new cNode('INPUT');
		}
		for (var k = 0; k < this.outLayer.length; k++) {
			this.outLayer[k] = new cNode('OUTPUT');
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

		// Transfer thru synapses of type 0
		for (var i = 0; i < this.ws.length; i++) {
			if (this.ws[i].type == 0) {
				this.outLayer[this.ws[i].indices[1]].addValue(
					this.ws[i].pass(this.inLayer[this.ws[i].indices[0]].value)
				);
			}
		}

		// Reset the hidden layer
		this.reset(this.hidLayer);

		// Transfer thru synapses of type 1
		for (var i = 0; i < this.ws.length; i++) {
			if (this.ws[i].type == 0) {
				this.hidLayer[this.ws[i].indices[1]].addValue(
					this.ws[i].pass(this.inLayer[this.ws[i].indices[0]].value)
				);
			}
		}

		// Activate hidden layer
		for (var h = 0; h < this.hidLayer.length; h++) {
			this.hidLayer[h].value = this.activation(this.hidLayer[h].value);
		}

		// Reset output layer
		this.reset(this.outLayer);

		// Transfer hidden layer with weights to out layer and activate
		for (var j = 0; j < this.ws.length; j++) {
			if (!this.ws[j].hid) {
				this.outLayer[this.ws[j].indices[1]].addValue(
					this.ws[j].pass(this.hidLayer[this.ws[j].indices[0]].value)
				);
			}
		}

		// Activate out layer
		for (var o = 0; o < this.outLayer.length; o++) {
			this.outLayer[o].value = this.activation(this.outLayer[o].value);
		}
	}

	mutate() {
		var type = floor(random(0, 4));

		switch (type) {
			case 0:
				this.ws[floor(random(0, this.ws1.length))].weight = floor(random(-2, 2));
				break;
			case 1:
				console.log('LINK');
				break;
			case 2:
				console.log('NODE');
				break;
			case 3:
				console.log('ED');
				break;
			default:
				break;
		}
	}
}
