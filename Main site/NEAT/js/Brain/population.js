class Population {
	constructor(popNum, mutationRate) {
		this.popNum = popNum;
		this.mutationRate = mutationRate;
		this.individuals = [];
	}

	formPopulation(inputs, outputs) {
		for (var i = 0; i < this.popNum; i++) {
			this.individuals.push(new Individual(this.mutationRate));
			this.individuals[i].formGenome(inputs, outputs);
		}
	}

	allForward(inputs) {
		for (var i = 0; i < this.individuals.length; i++) {
			this.individuals[i].genome.forward(inputs);
		}
	}
}
