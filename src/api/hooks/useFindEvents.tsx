import { useEffect, useState } from "react";
import { apiRoutes } from "../apiRoutes";
import { CalendarEvent } from "../../models";
import { getStartOfDay, getEndOfDay } from "../../utils/dateFunctions";
import { splitCalendarEvents } from "../../utils/eventFunctions";

export interface useFindEventsProps {
  /** Start date to filter events from */
  startDate: Date;
  /** End date to filter events from */
  endDate: Date;
  /** Timestamp when hook was used */
  lastFetchTimenstamp: Date;
}

/**
 * Returs calendar events
 *
 * Fetch calendar events from the server. Since you can only fetch all data
 * on the server endpoint and not filter them you could make one request
 * and store the data.
 *
 * But to mimic real world application the endpoint is called everytime when
 * a new start-date and end-date i changed
 *
 * Fetched events are "filtered" in this function and events expanding over
 * midnight is splitted to new events (each event cover only 1 day maximum)
 */
export function useFindEvents({
  startDate,
  endDate,
  lastFetchTimenstamp,
}: useFindEventsProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    const searchFromDate: string = getStartOfDay(startDate);
    const searchToDate: string = getEndOfDay(endDate);

    async function fetchData() {
      try {
        setIsloading(true);

        const settings = {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
        };

        const response = await fetch(String(apiRoutes.events), settings);
        const data: CalendarEvent[] = await response.json();
        const items = data.filter(function (item) {
          return (
            new Date(item.startDate) >= new Date(searchFromDate) &&
            new Date(item.startDate) < new Date(searchToDate)
          );
        });

        // sort items on date
        items.sort(function (a, b) {
          return (
            new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
          );
        });
        // events expanding over midnight are splitted to separate events for each day
        setEvents(splitCalendarEvents(items));
      } catch (e) {
        setError(e);
        setIsError(true);
      } finally {
        setIsloading(false);
      }
    }
    fetchData();
  }, [startDate, endDate, lastFetchTimenstamp]);

  return { error, isError, isLoading, events };
}
