class Genome {
	constructor(ins, outs, mutationRate) {
		// Define how many inputs and outputs are in the genome
		this.ins = ins;
		this.outs = outs;

		// Calculate number of hidden layer nodes possible
		this.hids = (this.ins + this.outs) / 2;
		this.hids *= 1.5;
		this.hids = Math.ceil(this.hids);

		// Set mutation rate
		this.mutationRate = mutationRate;

		// Set up arrays for the different node layers
		this.inLayer = Array(this.ins);
		this.hidLayer = [];
		this.outLayer = Array(this.outs);

		// Only need one array for synapses
		this.ws = [];
		var out = floor(random(0, this.outLayer.length));
		var ind = floor(random(0, this.inLayer.length));
		this.ws.push(new Synapse(ind, out, 0, random(-2, 2)));

		// Set up bias
		this.bias = random(-2, 2);

		// Add all inputs and outputs
		for (var i = 0; i < this.inLayer.length; i++) {
			this.inLayer[i] = new cNode('INPUT');
		}
		for (var k = 0; k < this.outLayer.length; k++) {
			this.outLayer[k] = new cNode('OUTPUT');
		}
	}

	// Sigmoid function activation
	activation(input) {
		return 1 / (1 + Math.exp(-input));
	}

	// Resets a layer to all vals of 0
	reset(array) {
		for (var i = 0; i < array.length; i++) {
			array[i].value = 0;
		}
	}

	// Carries vals from in to out, complete w/ activation on all levels
	forward(inputs) {
		if (inputs.length != this.inLayer.length) {
			console.error('Improper input length in genome forward');
		}

		console.log(this);

		// Reset inputs
		this.reset(this.inLayer);

		// Reset the hidden layer
		this.reset(this.hidLayer);

		// Reset output layer
		this.reset(this.outLayer);

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
			if (this.ws[i].type == 0 && this.ws[i].enabled) {
				this.outLayer[this.ws[i].indices[1]].addValue(
					this.ws[i].pass(this.inLayer[this.ws[i].indices[0]].value)
				);
			}
		}

		// Transfer thru synapses of type 1
		for (var j = 0; j < this.ws.length; j++) {
			if (this.ws[j].type == 1 && this.ws[i].enabled) {
				this.hidLayer[this.ws[j].indices[1]].addValue(
					this.ws[j].pass(this.inLayer[this.ws[j].indices[0]].value)
				);
			}
		}

		// Activate hidden layer
		for (var h = 0; h < this.hidLayer.length; h++) {
			this.hidLayer[h].value = this.activation(this.hidLayer[h].value);
		}

		// Transfer thru synapses of type 2
		for (var k = 0; k < this.ws.length; k++) {
			if (this.ws[k].type == 2 && this.ws[i].enabled) {
				this.outLayer[this.ws[k].indices[1]].addValue(
					this.ws[k].pass(this.hidLayer[this.ws[k].indices[0]].value)
				);
			}
		}

		// Activate out layer
		for (var o = 0; o < this.outLayer.length; o++) {
			this.outLayer[o].value = this.activation(this.outLayer[o].value);
		}
	}

	mutate() {
		/*
		Types:
		0 - Point - Changes weight of one synapse
		1 - Link - Adds a new synapse of type 0
		2 - Node - Adds a new hidden layer node through a synapse that already exists
		3 - Enable / Disable - Enables or disables a synapse
		*/
		var type = floor(random(0, 5));

		switch (type) {
			// Point mutate
			case 0:
				this.ws[floor(random(0, this.ws1.length))].weight = floor(random(-2, 2));
				break;
			// Link mutate
			case 1:
				var chosen = false;

				while (!chosen) {
					var out = floor(random(0, this.outLayer.length));
					var ind = floor(random(0, this.inLayer.length));

					var sc = true;
					for (var i = 0; i < this.ws.length; i++) {
						if (this.ws[i].type == 0) {
							if (this.ws[i].indices[0] == ind && this.ws[i].indices[1] == out) {
								sc = false;
							}
						}
					}

					if (sc) {
						this.ws.push(new Synapse(ind, out, 0, random(-2, 2)));
					}

					chosen = sc;
				}

				break;
			// Node mutate
			case 2:
				var chosen = false;

				while (!chosen) {
					var rand = floor(random(0, this.ws.length));

					if (this.ws[rand].type == 0) {
						this.hidLayer.push(new cNode('HIDDEN'));
						this.hidLayer[this.hidLayer.length - 1].alive = true;

						var tempind = this.ws[rand].indices;
						this.ws.splice(rand, 1);

						this.ws.push(new Synapse(tempind[0], this.hidLayer.length - 1, 1, random(-2, 2)));
						this.ws.push(new Synapse(this.hidLayer.length - 1, tempind[1], 2, random(-2, 2)));

						chosen = true;
					}
				}

				break;
			// Enable / Disable mutate
			case 3:
				var rand = floor(random(0, this.ws.length));

				this.ws[rand].enabled = false;
			default:
				break;
			case 4:
				this.bias = random(-2, 2);
		}
	}
}
