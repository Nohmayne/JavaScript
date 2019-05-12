class Controller {
	constructor(num, mut) {
		this.num = num;
		this.population = new Population(this.num, mut);
	}

	init(ins, outs) {
		this.population.formPopulation(ins, outs);
	}

	netForward(inputs) {
		this.population.allForward(inputs);
	}
}
