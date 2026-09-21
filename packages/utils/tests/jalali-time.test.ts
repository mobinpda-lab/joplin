import { formatMsToLocal } from '../src/time';

describe('Jalali date formatting', () => {
\ttest('converts a known Gregorian date to Jalali', () => {
\t\tconst ms = new Date('2026-09-21T00:00:00Z').getTime();
\t\texpect(formatMsToLocal(ms, 'JALALI')).toBe('۱۴۰۵/۰۶/۳۰');
\t});

\ttest('keeps ordinary Gregorian formats unchanged', () => {
\t\tconst ms = new Date('2026-09-21T00:00:00Z').getTime();
\t\texpect(formatMsToLocal(ms, 'YYYY/MM/DD')).toBe('2026/09/21');
\t});
});
