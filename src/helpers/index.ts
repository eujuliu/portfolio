export function removeReferenceFromObj<T>(obj: Object): T {
	return JSON.parse(JSON.stringify(obj));
}
