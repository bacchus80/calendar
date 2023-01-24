import { CalendarEvent } from "../models";
import {
  getStartOfDay,
  getEndOfDay,
  getDateFromDate,
  addDaysToDate,
} from "../utils/dateFunctions";

/**
 * Return events for selected date given a set of calendar evets
 *
 * @param date - Date for finding events for this day
 * @param events - Calendar events
 */
export function getDayEvents(
  date: Date,
  events: CalendarEvent[]
): CalendarEvent[] {
  const result: CalendarEvent[] = [];
  events.forEach((event: CalendarEvent) => {
    const compareDate = date.toLocaleDateString("sv");
    const eventDate = getDateFromDate(event.startDate);
    if (eventDate === compareDate) {
      result.push(event);
    }
  });

  return result;
}

/**
 * Splits events propatating over midnight
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
            startDate:
              i === 0 ? event.startDate : String(getStartOfDay(currentDate)),
            endDate:
              i + 1 === diffDays
                ? event.endDate
                : String(getEndOfDay(currentDate)),
          };
          newEvents.push(splittedEvent);
        }
      }
    });
    return newEvents;
  }
  return [];
}

export function createEvent(event: CalendarEvent) {}
