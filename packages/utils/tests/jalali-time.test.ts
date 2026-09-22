import { formatMsToLocal } from '../time';

describe('Jalali date formatting', () => {
	test('converts a known Gregorian date to Jalali', () => {
		const ms = new Date('2026-09-21T00:00:00Z').getTime();
		expect(formatMsToLocal(ms, 'JALALI')).toBe('۱۴۰۵/۰۶/۳۰');
	});

	test('keeps ordinary Gregorian formats unchanged', () => {
		const ms = new Date('2026-09-21T00:00:00Z').getTime();
		expect(formatMsToLocal(ms, 'YYYY/MM/DD')).toBe('2026/09/21');
	});
});
