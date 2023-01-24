import { useEffect, useState } from "react";
import { apiRoutes } from "../apiRoutes";
import { CalendarEvent } from "../../models";
import { getStartOfDay, getEndOfDay } from "../../utils/dateFunctions";
import { splitCalendarEvents } from "../../utils/eventFunctions";

export interface useFindEventsProps {
  startDate: Date;
  endDate: Date;
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
export function useFindEvents({ startDate, endDate }: useFindEventsProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    const searchFromDate: Date = getStartOfDay(startDate);
    const searchToDate: Date = getEndOfDay(endDate);

    async function fetchData() {
      try {
        setIsloading(true);
        /*
           var myHeaders = new Headers();
       // myHeaders.append('pragma', 'no-cache');
        myHeaders.append('Cache-Control', 'no-cache');
        myHeaders.append('Content-Type', 'application/json');
        //myHeaders.append('Access-Control-Allow-Origin', apiRoutes.events);

        const inputData: CalendarEvent = {
          _id: "63cd1dbc07307e03e8c74713",
          activity: "Test 4.3.44",
          startDate: "2023-01-25 15:00",
          endDate: "2023-01-25 15:15",
          location: "Hemma igen 4.2",
        };

        var myInit = {
          method: 'PUT',
          headers: myHeaders,
          //body: inputData,
          body: JSON.stringify(inputData),
          //mode: 'cors',
        };
*/
        const response = await fetch(apiRoutes.events);
        const data: CalendarEvent[] = await response.json();

        const items = data.filter(function (item) {
          return (
            new Date(item.startDate) >= searchFromDate &&
            new Date(item.startDate) <= searchToDate
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
  }, [startDate, endDate]);

  return { error, isError, isLoading, events };
}
