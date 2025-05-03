import {
	HOURS_IN_DAY,
	MILLISECONDS_IN_A_SECOND,
	MINUTES_IN_HOUR,
	SECOND,
	SECONDS_IN_MINUTE,
} from './constant.js';
import { days, hours, minutes, seconds } from './conversion.js';

export const toParts = (ms: number) => {
	const absoluteMs = Math.abs(ms);

	return {
		days: Math.floor(days.from(absoluteMs)),
		hours: Math.floor(hours.from(absoluteMs) % HOURS_IN_DAY),
		isNegative: ms < 0,
		milliseconds: Math.round(absoluteMs % MILLISECONDS_IN_A_SECOND),
		minutes: Math.floor(minutes.from(absoluteMs) % MINUTES_IN_HOUR),
		seconds: Math.floor(seconds.from(absoluteMs) % SECONDS_IN_MINUTE),
	};
};
