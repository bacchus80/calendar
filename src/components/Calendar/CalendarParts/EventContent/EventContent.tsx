import { CSSProperties, ReactElement } from "react";
import { CalendarEvent } from "../../../../models";
import { getTimeFromDate } from "../../../../utils/dateFunctions";
import {
  CalendarTimeOrLocation,
  CalendarActivity,
} from "../../Calendar.styles";

export interface EventContentProps {
  dayEvent: CalendarEvent;
  height: number;
}

export function EventContent({ dayEvent, height }: EventContentProps) {
  return Number(height) > 59 ? (
    <LargeEvent event={dayEvent} />
  ) : (
    <SmallEvent event={dayEvent} height={height} />
  );
}

interface LargeEventProps {
  event: CalendarEvent;
}
function LargeEvent({ event }: LargeEventProps): ReactElement {
  const startTime: string = getTimeFromDate(event.startDate);
  const endTime: string = getTimeFromDate(event.endDate);
  return (
    <>
      <CalendarTimeOrLocation>
        {startTime} - {endTime}
      </CalendarTimeOrLocation>
      <CalendarActivity>{event.activity}</CalendarActivity>
      <CalendarTimeOrLocation>{event.location}</CalendarTimeOrLocation>
    </>
  );
}

interface SmallEventProps {
  event: CalendarEvent;
  height: number;
}
function SmallEvent({ event, height }: SmallEventProps) {
  const smallStyle: CSSProperties =
    Number(height) < 20 ? { position: "relative", top: "-8px" } : {};
  const startTime: string = getTimeFromDate(event.startDate);
  const endTime: string = getTimeFromDate(event.endDate);

  return (
    <CalendarTimeOrLocation
      style={smallStyle}
      title={`${startTime} - ${endTime}`}
    >{`${event.activity} ${event.location}`}</CalendarTimeOrLocation>
  );
}
