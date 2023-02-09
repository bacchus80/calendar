import { CalendarEvent } from "../models";
import {
  getStartOfDay,
  getEndOfDay,
  getDateFromDate,
  addDaysToDate,
  getTimeFromDate,
  getDateInFormatYYYYMMDD,
  getHourStartTime,
  isValidStartAndEndTime,
} from "../utils/dateFunctions";
import { config } from "../constants";

/**
 * Return events for selected date given a set of calendar events
 *
 * @param date - Date for finding events for this day
 * @param events - Calendar events
 */
export function getDayEvents(
  date: Date,
  events: CalendarEvent[]
): CalendarEvent[] {
  const dayEvents: CalendarEvent[] = events.filter((event: CalendarEvent) => {
    const compareDate = date.toLocaleDateString("sv");
    const eventDate = getDateFromDate(event.startDate);

    return eventDate === compareDate;
  });

  return dayEvents;
}

/**
 * Splits events propatating over midnight
 *
 * @returns Calendar events
 */
export function splitCalendarEvents(events: CalendarEvent[]): CalendarEvent[] {
  if (events && events.length > 0) {
    let newEvents: CalendarEvent[] = [];
    events.forEach((event) => {
      const start = getDateFromDate(event.startDate);
      const end = getDateFromDate(event.endDate);
      if (end === start) {
        newEvents.push(event);
      } else if (end > start) {
        var date1: number = new Date(start) as unknown as number;
        var date2: number = new Date(end) as unknown as number;
        const diffDays: number = (date2 - date1) / (1000 * 60 * 60 * 24) + 1;

        for (let i = 0; i < diffDays; i++) {
          //const currentDate: Date = new Date(tmp.setDate(tmp.getDate() - tmp.getDay()+1+i));
          const currentDate: Date = addDaysToDate(new Date(event.startDate), i);
          const splittedEvent: CalendarEvent = {
            _id: event._id,
            activity: event.activity,
            location: event.location,
            startDate: i === 0 ? event.startDate : getStartOfDay(currentDate),
            endDate:
              i + 1 === diffDays ? event.endDate : getEndOfDay(currentDate),
            isSplittedEvent: true,
          };
          newEvents.push(splittedEvent);
        }
      }
    });
    return newEvents;
  }
  return [];
}

/**
 * Returns of top position and height for the event
 */
export function getEventCSSHeightAndTtartPosition(event: CalendarEvent) {
  const startTime = getTimeFromDate(event.startDate);
  const endTime = getTimeFromDate(event.endDate);
  const diff =
    new Date(event.endDate).valueOf() - new Date(event.startDate).valueOf();
  const hourStart: number = Number(startTime.split(":")[0]);
  const minuteStart: number = Number(startTime.split(":")[1]);
  const hourEnd: number = Number(endTime.split(":")[0]);
  const hourDiff: number = Math.floor(hourEnd - hourStart);
  const startPosition: number =
    minuteStart + Number(hourStart * config.hourSlotHeight - 1); //diffTop/1000/60;
  const eventHeight: number = diff / 1000 / 60 + hourDiff + 1 + 1;

  return [startPosition, eventHeight];
}

/** Get an empty calendar event */
export function getEmptyEvent(): CalendarEvent {
  return {
    activity: "",
    endDate: "",
    location: "",
    startDate: "",
    _id: "",
  };
}

export function emptyEventWithStartAndEndTimestamp(
  date: any,
  clickYPosition: number
): CalendarEvent {
  const cleanDate = getDateInFormatYYYYMMDD(date);
  const startTime = getHourStartTime(clickYPosition);
  const endTime = getHourStartTime(1 + clickYPosition);
  const emptyEvent = getEmptyEvent();
  emptyEvent.startDate = cleanDate + " " + startTime;
  emptyEvent.endDate = cleanDate + " " + endTime;

  return emptyEvent;
}

/**
 * Validates if an event can be posted
 *
 * @returns boolean
 */
export function isValidEventData(event: CalendarEvent): boolean {
  return isValidStartAndEndTime(event) && event.activity !== "";
}

/**
 * Checks if an events starttime exist in an other event
 *
 * @returns boolean
 */
export function isStartimeOverlapping(
  eventToCheck: CalendarEvent,
  compareEvent: CalendarEvent
): boolean {
  return (
    Date.parse(compareEvent.startDate) < Date.parse(eventToCheck.startDate) &&
    Date.parse(eventToCheck.startDate) < Date.parse(compareEvent.endDate)
  );
}

/**
 * Checks if an events endtime exist in an other event
 *
 * @returns boolean
 */
export function isEndTimeOverlapping(
  eventToCheck: CalendarEvent,
  compareEvent: CalendarEvent
): boolean {
  return (
    Date.parse(compareEvent.startDate) < Date.parse(eventToCheck.endDate) &&
    Date.parse(eventToCheck.endDate) < Date.parse(compareEvent.endDate)
  );
}

/**
 * Checks if an event can fit inside another event
 *
 * @returns boolean
 */
export function isEventFittingInsideOtherEvent(
  eventToCheck: CalendarEvent,
  compareEvent: CalendarEvent
): boolean {
  return (
    Date.parse(compareEvent.startDate) < Date.parse(eventToCheck.startDate) &&
    Date.parse(compareEvent.endDate) > Date.parse(eventToCheck.endDate)
  );
}

/**
 * Checks if an event can include another event
 *
 * @returns boolean
 */
export function isEventIncludingOtherEvent(
  eventToCheck: CalendarEvent,
  compareEvent: CalendarEvent
): boolean {
  return (
    Date.parse(eventToCheck.startDate) < Date.parse(compareEvent.startDate) &&
    Date.parse(eventToCheck.endDate) > Date.parse(compareEvent.endDate)
  );
}

/**
 * Checks in an event is overlapping with another event
 * @returns boolean
 */
export function isEventOverlapping(
  eventToCheck: CalendarEvent,
  compareEvent: CalendarEvent
): boolean {
  return (
    isStartimeOverlapping(eventToCheck, compareEvent) ||
    isEndTimeOverlapping(eventToCheck, compareEvent) ||
    isEventFittingInsideOtherEvent(eventToCheck, compareEvent) ||
    isEventIncludingOtherEvent(eventToCheck, compareEvent)
  );
}
