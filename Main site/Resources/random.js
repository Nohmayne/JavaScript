function randint(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function random(max) {
	if (max) {
		return Math.random(max);
	} else {
		return Math.random();
	}
}
