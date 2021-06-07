import parser = require('cron-parser');
import { RRule, RRuleSet, rrulestr } from 'rrule'
import { DateTime } from "luxon";


export function getNextScheduledTime(schedule: string, tz: string): Date {
    let out: Date;
    if (schedule.startsWith("DTSTART") || schedule.startsWith("RRULE")) {
        try {
            const rule = RRule.fromString(schedule)
            const nextOne = rule.after(new Date(), true)
            out = nextOne
        } catch (e) {
            console.log("VROOM")
            // Do nothing
        }
    } else {
        try {
            out = parser
                .parseExpression(schedule, {utc: !tz, tz})
                .next()
                .toDate();
        } catch (e) {
            // Do nothing
        }
    }
    return out;
}
