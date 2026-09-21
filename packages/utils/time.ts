// -----------------------------------------------------------------------------------------------
// NOTE: Some of the code in here is copied from @joplin/lib/time. New time-related code should be
// added here, and should be based on dayjs (not moment)
// -----------------------------------------------------------------------------------------------

import type dayjsImport from 'dayjs';
import dayJsUtc from 'dayjs/plugin/utc';

// A require() is needed here for this to work in React Native.
const dayjs: typeof dayjsImport = require('dayjs');

// Separating this into a type import and a require seems to be necessary to support mobile:
// - import = require syntax doesn't work when bundling
// - import * as dayJsRelativeTimeType causes a runtime error.
import type dayJsRelativeTimeType from 'dayjs/plugin/relativeTime';
const dayJsRelativeTime: typeof dayJsRelativeTimeType = require('dayjs/plugin/relativeTime');

const supportedLocales: Record<string, unknown> = {
	'ar': require('dayjs/locale/ar'),
	'bg': require('dayjs/locale/bg'),
	'bs': require('dayjs/locale/bs'),
	'ca': require('dayjs/locale/ca'),
	'cs': require('dayjs/locale/cs'),
	'da': require('dayjs/locale/da'),
	'de': require('dayjs/locale/de'),
	'el': require('dayjs/locale/el'),
	'en-gb': require('dayjs/locale/en-gb'),
	'en': require('dayjs/locale/en'),
	'eo': require('dayjs/locale/eo'),
	'es': require('dayjs/locale/es'),
	'et': require('dayjs/locale/et'),
	'eu': require('dayjs/locale/eu'),
	'fa': require('dayjs/locale/fa'),
	'fi': require('dayjs/locale/fi'),
	'fr': require('dayjs/locale/fr'),
	'gl': require('dayjs/locale/gl'),
	'hr': require('dayjs/locale/hr'),
	'hu': require('dayjs/locale/hu'),
	'id': require('dayjs/locale/id'),
	'it': require('dayjs/locale/it'),
	'ja': require('dayjs/locale/ja'),
	'ko': require('dayjs/locale/ko'),
	'nb': require('dayjs/locale/nb'),
	'nl-be': require('dayjs/locale/nl-be'),
	'nl': require('dayjs/locale/nl'),
	'pl': require('dayjs/locale/pl'),
	'pt-br': require('dayjs/locale/pt-br'),
	'pt': require('dayjs/locale/pt'),
	'ro': require('dayjs/locale/ro'),
	'ru': require('dayjs/locale/ru'),
	'sl': require('dayjs/locale/sl'),
	'sr': require('dayjs/locale/sr'),
	'sv': require('dayjs/locale/sv'),
	'th': require('dayjs/locale/th'),
	'tr': require('dayjs/locale/tr'),
	'uk': require('dayjs/locale/uk'),
	'vi': require('dayjs/locale/vi'),
	'zh-cn': require('dayjs/locale/zh-cn'),
	'zh-tw': require('dayjs/locale/zh-tw'),
};

export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;
export const Day = 24 * Hour;
export const Week = 7 * Day;
export const Month = 30 * Day;

function initDayJs() {
	dayjs.extend(dayJsRelativeTime);
	dayjs.extend(dayJsUtc);
}

initDayJs();

let dateFormat_ = 'DD/MM/YYYY';
let timeFormat_ = 'HH:mm';

export const msleep = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

// Use the utility functions below to easily measure performance of a block or
// line of code.
interface PerfTimer {
	name: string;
	startTime: number;
}

const perfTimers_: PerfTimer[] = [];

export function timerPush(name: string) {
	perfTimers_.push({ name, startTime: Date.now() });
}

export function timerPop() {
	const t = perfTimers_.pop() as PerfTimer;
	// eslint-disable-next-line no-console
	console.info(`Time: ${t.name}: ${Date.now() - t.startTime}`);
}

export const formatMsToRelative = (ms: number) => {
	if (Date.now() - ms > 2 * Day) return formatMsToLocal(ms);
	const d = dayjs(ms);

	// The expected pattern for invalid date formatting in JS is to return the string "Invalid
	// Date", so we do that here. If we don't, dayjs will process the invalid date and return "a
	// month ago", somehow...
	if (!d.isValid()) return 'Invalid date';

	return d.fromNow(false);
};

const joplinLocaleToDayJsLocale = (locale: string) => {
	locale = locale.toLowerCase().replace(/_/, '-');
	if (supportedLocales[locale]) return locale;

	const lang = locale.split('-')[0];
	if (supportedLocales[lang]) return lang;

	return 'en-gb';
};

export const setTimeLocale = (locale: string) => {
	const dayJsLocale = joplinLocaleToDayJsLocale(locale);
	dayjs.locale(dayJsLocale);
};

export const setDateFormat = (format: string) => {
	dateFormat_ = format;
};

export const setTimeFormat = (format: string) => {
	timeFormat_ = format;
};

const dateFormat = () => {
	return dateFormat_;
};

const timeFormat = () => {
	return timeFormat_;
};

const dateTimeFormat = () => {
	return `${dateFormat()} ${timeFormat()}`;
};


const jalaliMonthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

const isGregorianLeap = (year: number) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

const toJalali = (date: Date) => {
  const gy = date.getFullYear() - 1600;
  const gm = date.getMonth();
  const gd = date.getDate() - 1;
  const gDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
  for (let i = 0; i < gm; i++) gDayNo += gDays[i];
  if (gm > 1 && isGregorianLeap(date.getFullYear())) gDayNo++;
  gDayNo += gd;

  let jDayNo = gDayNo - 79;
  const jNp = Math.floor(jDayNo / 12053);
  jDayNo %= 12053;
  let jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
  jDayNo %= 1461;
  if (jDayNo >= 366) {
    jy += Math.floor((jDayNo - 1) / 365);
    jDayNo = (jDayNo - 1) % 365;
  }
  const jm = jDayNo < 186 ? 1 + Math.floor(jDayNo / 31) : 7 + Math.floor((jDayNo - 186) / 30);
  const jd = 1 + (jDayNo < 186 ? jDayNo % 31 : (jDayNo - 186) % 30);
  return { year: jy, month: jm, day: jd };
};

const toPersianDigits = (value: string) => value.replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

function formatMsToJalali(ms: number) {
  const d = new Date(ms);
  const j = toJalali(d);
  return toPersianDigits(`${j.year}/${String(j.month).padStart(2, '0')}/${String(j.day).padStart(2, '0')}`);
}

export const formatMsToLocal = (ms: number, format: string|null = null) => {
	if (format === 'JALALI') return formatMsToJalali(ms);
	if (format === null) format = dateTimeFormat();
	return dayjs(ms).format(format);
};

export const formatMsToDateTimeLocal = (ms: number) => {
	return formatMsToLocal(ms, 'YYYY-MM-DDTHH:mm');
};

export const isValidDate = (anything: string) => {
	return dayjs(anything).isValid();
};

export const formatDateTimeLocalToMs = (anything: string) => {
	return dayjs(anything).unix() * 1000;
};

export const formatMsToDurationCompat = (ms: number) => {
	// Avoid using dayjs (and @joplin/utils/time) for formatting here.
	// See https://github.com/laurent22/joplin/issues/11864
	const seconds = Math.floor(ms / Second) % 60;
	const minutes = Math.floor(ms / Minute);
	const paddedSeconds = `${seconds}`.padStart(2, '0');
	return `${minutes}:${paddedSeconds}`;
};


export const goBackInTime = (startDateMs: number, n: number, period: dayjsImport.ManipulateType) => {
	return dayjs(startDateMs).subtract(n, period);
};

export const formatMsToUTC = (ms: number, format: string|null = null) => {
	if (format === null) format = dateTimeFormat();
	return dayjs(ms).utc().format(format);
};
