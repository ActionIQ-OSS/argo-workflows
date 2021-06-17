import React = require('react');

const x = require('cronstrue');
import { RRule } from 'rrule'

/*
    https://github.com/bradymholt/cRonstrue
    vs
    https://github.com/robfig/cron

    I think we must assume that these libraries (or any two libraries) will never be exactly the same and accept that
    sometime it'll not work as expected. Therefore, we must let the user know about this.
 */

export const PrettySchedule = ({schedule}: {schedule: string}) => {
    try {
        let pretty = ""
        if (schedule.startsWith("DTSTART") || schedule.startsWith("RRULE")) {
            pretty = RRule.fromString(schedule).toText();
        } else {
            pretty = x.toString(schedule);
        }
        return <span title={pretty}>{pretty}</span>;
    } catch (e) {
        return <>{e.toString()}</>;
    }
};
