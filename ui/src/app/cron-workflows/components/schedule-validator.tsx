import React = require('react');
import {SuccessIcon, WarningIcon} from '../../shared/components/fa-icons';
import { RRule } from 'rrule'

const x = require('cronstrue');

export const ScheduleValidator = ({schedule}: {schedule: string}) => {
    try {
        if (schedule.startsWith("DTSTART") || schedule.startsWith("RRULE")) {
            const rule = RRule.fromString(schedule)
            return (
                <span>
                    <SuccessIcon /> {rule.toText()}
                </span>
            );
        } else if (schedule.split(' ').length === 6) {
            throw new Error('seconds are not supported');
        }
        return (
            <span>
                <SuccessIcon /> {x.toString(schedule)}
            </span>
        );
    } catch (e) {
        return (
            <span>
                <WarningIcon /> Schedule maybe invalid: {e.toString()}
            </span>
        );
    }
};
