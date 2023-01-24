import { useEffect, useState } from "react";
import { apiRoutes } from "../apiRoutes";
import { CalendarEvent } from "../../models";
import { splitCalendarEvents } from "../../utils/eventFunctions";

export interface useCreateEventProps {
  event: CalendarEvent;
  postData: boolean;
}

/**
 * Create a calendar event
 *
 */
export function createEvent({ event, postData }: useCreateEventProps) {
  const [result, setResult] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [myPostData, setMyPostData] = useState<boolean>(postData);

  useEffect(() => {
    async function createData() {
      try {
        setIsloading(true);

        const inputData: CalendarEvent = {
          activity: "Koda",
          startDate: "2023-01-26 08:00",
          endDate: "2023-01-26 12:00",
          location: "Kontoret",
        };
        /*
        var myInit = {
          method: 'GET',
          headers: myHeaders,
          //body: JSON.stringify(inputData),
          //mode: 'cors',
        };
        */
        const settings = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        };

        const response = await fetch(apiRoutes.events, settings);
        const data: any = await response.json();
        // events expanding over midnight are splitted to separate events for each day
      } catch (e) {
        setError(e);
        setIsError(true);
      } finally {
        setIsloading(false);
      }
    }
    if (myPostData && event.startDate !== "") {
      createData();
      setMyPostData(false);
    }
  }, [event, myPostData]);

  return { error, isError, isLoading, result };
}
