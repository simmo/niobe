import { describe, expect, it } from 'vitest';
import * as api from './index.js';

describe('api', () => {
	it('exports the correct values', () => {
		expect(api).toMatchInlineSnapshot(`
			{
			  "DAY": 86400000,
			  "DAYS_IN_WEEK": 7,
			  "HOUR": 3600000,
			  "HOURS_IN_DAY": 24,
			  "MICROSECOND": 0.001,
			  "MICROSECONDS_IN_MILLISECOND": 1000,
			  "MILLISECOND": 1,
			  "MILLISECONDS_IN_SECOND": 1000,
			  "MINUTE": 60000,
			  "MINUTES_IN_HOUR": 60,
			  "NANOSECOND": 0.000001,
			  "NANOSECONDS_IN_MICROSECOND": 1000,
			  "SECOND": 1000,
			  "SECONDS_IN_MINUTE": 60,
			  "WEEK": 604800000,
			  "days": [Function],
			  "hours": [Function],
			  "microseconds": [Function],
			  "milliseconds": [Function],
			  "minutes": [Function],
			  "msToParts": [Function],
			  "nanoseconds": [Function],
			  "parseDuration": [Function],
			  "partsToMs": [Function],
			  "seconds": [Function],
			  "weeks": [Function],
			}
		`);
	});
});
