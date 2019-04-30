class Controller {
	constructor(num, mut) {
		this.population = new Population(num, mut);
	}

	init(ins, outs) {
		this.population.formPopulation(ins, outs);
		print(this.population);
	}
}
