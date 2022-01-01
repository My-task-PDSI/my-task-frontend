export function randint(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function addPrefixToObjectKey(object, prefix = "props-") {
	return Object.entries(object).reduce((acc, [key, value]) => {
		acc[prefix + key] = value;
		return acc;
	}, {});
}