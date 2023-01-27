import { useEffect, useState } from "react";
import { apiRoutes } from "../apiRoutes";
import { CalendarEvent } from "../../models";
import { isValidDate } from "../../utils/dateFunctions";

export type apiMethod = "POST" | "DELETE" | "PUT";

export interface useCreateDeleteUpdateEventProps {
  /** Event to create */
  event: CalendarEvent;
  method: apiMethod;
  /** Timestamp when hook was used */
  lastCallApiTimestamp: Date | string;
}

/**
 * Create, delete or update an event
 */
export function useCreateDeleteUpdateEvent({
  event,
  method,
  lastCallApiTimestamp,
}: useCreateDeleteUpdateEventProps) {
  const [result, setResult] = useState<any>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    async function callApi() {
      try {
        setIsloading(true);

        const eventId = method === "POST" ? "" : event._id;
        delete event._id;
        const body = method === "DELETE" ? null : JSON.stringify(event);

        delete event._id;
        const settings = {
          method: method,
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: body,
        };

        const response = await fetch(
          String(apiRoutes.events) + eventId,
          settings
        );
        const data: CalendarEvent = await response.json();

        setResult(data);
      } catch (e) {
        setError(e);
        setIsError(true);
      } finally {
        setIsloading(false);
      }
    }

    if (isValidDate(lastCallApiTimestamp)) {
      callApi();
    }
  }, [event, method, lastCallApiTimestamp]);

  return { error, isError, isLoading, result };
}
