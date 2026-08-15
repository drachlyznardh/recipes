
const PREFIXES = 'K M B T Qa Qi Sx Sp Oc No De'.split(' ');

function format(value) {
	const v = value || 0;
	if (v < 1) return '0';
	const o = Math.min(PREFIXES.length, Math.floor(Math.floor(Math.log10(v)) / 3));
	if (o == 0) return Math.floor(v).toString();
	const p = PREFIXES[o - 1] || '';
	const d = 10 ** (3 * o);
	const e = v/d;
	if (e >= 10000) return 'Too much';
	if (e >= 1000) return `${Math.floor(e)}${p}`;
	const f = 10 ** (2 - Math.floor(Math.log10(e)));
	return `${Math.floor(e * f) / f}${p}`;
}

class Formatter {

	static number(value) {
		const PREFIXES = 'K M B T Qa Qi Sx Sp Oc No De'.split(' ');

		const v = value || 0;
		if (v < 1) return '0';
		const o = Math.min(PREFIXES.length, Math.floor(Math.floor(Math.log10(v)) / 3));
		if (o == 0) return Math.floor(v).toString();
		const p = PREFIXES[o - 1] || '';
		const d = 10 ** (3 * o);
		const e = v/d;
		if (e >= 10000) return 'Too much';
		if (e >= 1000) return `${Math.floor(e)}${p}`;
		const f = 10 ** (2 - Math.floor(Math.log10(e)));
		return `${Math.floor(e * f) / f}${p}`;
	}

	static time(timems) {
		if (timems < 1000) return 'less than a second';
		else if (timems < 60000) return `${Math.floor(timems / 1000)}.${Math.floor(timems / 100) % 10} seconds`;
		else {
			var aday = 86400, anhour = 3600, aminute = 60;
			times = Math.floor(timems / 1000);
			var plural = (n, v) => v ? `${v} ${n}${v > 1 ? 's' : ''}` : false;
			var commas = (l) => {
				if (l?.length > 2) return `${l.slice(0, -1).join(', ')} and ${l[l.length -1]}`;
				else if (l?.length > 1) return `${l[0]} and ${l[1]}`;
				else if (l?.length > 0) return l[0];
			}
			return commas([
				days = plural('day', Math.floor(times / aday)),
				hours = plural('hour', Math.floor((times % aday) / anhour)),
				minutes = plural('minute', Math.floor((times % anhour) / aminute)),
				seconds = plural('second', times % 10)
			].filter(e => e));
		}
	}
}

