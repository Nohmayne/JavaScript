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
				this.ws1.push(new Synapse(w, j));
			}
		}
		for (var k = 0; k < this.outLayer.length; k++) {
			this.outLayer[k] = new cNode('OUTPUT');

			for (var w = 0; w < this.hidLayer.length; w++) {
				this.ws2.push(new Synapse(w, k));
			}
		}
	}

	activation(input) {
		output = 1 / (1 + Math.exp(input));
	}
}
