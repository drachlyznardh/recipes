
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
	const f = e >= 1000 ? 10000 : Math.max(1, 10 ** (2 - Math.floor(Math.log10(e))));
	return `${Math.floor(e / f) * f}${p}`;
}

