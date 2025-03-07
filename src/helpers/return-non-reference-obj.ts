export default function returnNonReferenceObj<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj)) as T
}
