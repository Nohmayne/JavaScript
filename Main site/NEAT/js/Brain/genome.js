class Genome {
	constructor(ins, outs, lHid, nHid, mutationRate) {
		this.ins = [];
		this.outs = [];
		this.hid = [];
		this.rate = mutationRate;

		for (var i = 0; i < ins; i++) {
			this.ins.push(new Node(INPUT));
		}

		for (var o = 0; o < outs; o++) {
			this.outs.push(new Node(OUTPUT));
		}

		for (var l = 0; l < lHid; l++) {
			this.hid.push([]);
			for (var n = 0; n < nHid; n++) {
				this.hid[p].push(new Node(HIDDEN));
			}
		}

		// TODO: Add weights from / to each node in the array
		for (var sin = 0; sin < this.ins.length; sin++) {
			for (var shin = 0; shin < this.hid[0].length; shin++) {}
		}
	}

	mutate() {
		temp = random() * 100;
		if (temp < this.rate) {
			type = floor(random(0, 4));

			switch (type) {
				case 0:
			}
		}
	}
}
