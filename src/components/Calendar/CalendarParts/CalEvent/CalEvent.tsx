import { CSSProperties } from "react";
import {
  StyledCalEvent,
  CalendarTimeOrLocation,
  CalendarActivity,
} from "../../Calendar.styles";
import { getEventCSSHeightAndTtartPosition } from "../../../../utils/eventFunctions";
import { getTimeFromDate } from "../../../../utils/dateFunctions";
import { CalendarEvent } from "../../../../models";
import { config } from "../../../../constants";

export interface CalEventProps {
  dayEvent: CalendarEvent;
  sumEventHeights: number;
  height: number;
  editEvent: (e: any, event: CalendarEvent) => void;
}

export function CalEvent({
  dayEvent,
  sumEventHeights,
  height,
  editEvent,
}: CalEventProps) {
  const [startPosition] = getEventCSSHeightAndTtartPosition(dayEvent);
  const startTime: string = getTimeFromDate(dayEvent.startDate);
  const endTime: string = getTimeFromDate(dayEvent.endDate);
  const className: string | undefined =
    startTime === config.startTimeMidnght ? "midnight-event" : undefined;
  const topPosition = Number(startPosition) - sumEventHeights;
  sumEventHeights = sumEventHeights + Number(height);

  const smallStyle: CSSProperties =
    Number(height) < 20 ? { position: "relative", top: "-8px" } : {};
  return (
    <StyledCalEvent
      topPosition={String(topPosition)}
      itemHeight={String(height)}
      key={dayEvent._id}
      className={className}
      onClick={(e: any) => editEvent(e, dayEvent)}
    >
      {Number(height) > 59 ? (
        <>
          <CalendarTimeOrLocation>
            {startTime} - {endTime}
          </CalendarTimeOrLocation>
          <CalendarActivity>{dayEvent.activity}</CalendarActivity>
          <CalendarTimeOrLocation>{dayEvent.location}</CalendarTimeOrLocation>
        </>
      ) : (
        <CalendarTimeOrLocation
          style={smallStyle}
          title={`${startTime} - ${endTime}`}
        >{`${dayEvent.activity} ${dayEvent.location}`}</CalendarTimeOrLocation>
      )}
    </StyledCalEvent>
  );
}
