class Individual {
	constructor(mutationRate) {
		this.gen = 0;
		this.genome = undefined;
		this.mutationRate = mutationRate;
	}

	formGenome(ins, outs) {
		this.genome = new Genome(ins, outs, this.mutationRate);
	}

	incGeneration() {
		this.gen += 1;
	}
}
