export default function formatDate(
	str: string,
	options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
) {
	const date = new Date(str);
	const formatted = new Intl.DateTimeFormat('en-US', options).format(date);

	return formatted;
}
