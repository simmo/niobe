import { describe, expect, it } from 'vitest';
import * as api from './index.js';

describe('api', () => {
	it('exports the correct values', () => {
		expect(api).toMatchInlineSnapshot(`
			{
			  "DAY": 86400000,
			  "HOUR": 3600000,
			  "HOURS_IN_DAY": 24,
			  "MILLISECOND": 1,
			  "MILLISECONDS_IN_A_SECOND": 1000,
			  "MINUTE": 60000,
			  "MINUTES_IN_HOUR": 60,
			  "SECOND": 1000,
			  "SECONDS_IN_MINUTE": 60,
			  "days": [Function],
			  "hours": [Function],
			  "milliseconds": [Function],
			  "minutes": [Function],
			  "parseDuration": [Function],
			  "seconds": [Function],
			  "toParts": [Function],
			}
		`);
	});
});
