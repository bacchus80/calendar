/**
 * Model for a calendar event
 */

export interface CalendarEvent {
  /** External id for the calendar event */
  _id?: string;
  /** The activity for the event */
  activity: string;
  /** Start date of the event in format YYYY-MM-DD HH:MM*/
  startDate: string;
  /** End date of the event in format YYYY-MM-DD HH:MM*/
  endDate: string;
  /** Location for the event */
  location: string;
}
