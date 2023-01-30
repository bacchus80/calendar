import { CalendarEvent } from "../../../../models";
import { EventContent } from "../EventContent";
import { StyledDayItem, StyledCalEvent } from "../../Calendar.styles";
import { getEventCSSHeightAndTtartPosition } from "../../../../utils/eventFunctions";
import { getTimeFromDate } from "../../../../utils/dateFunctions";
import { config } from "../../../../constants/config";

interface CalendarDay {
  calendarDate: Date;
  dayEvents: CalendarEvent[];
}

export interface DayColumnProps {
  day: CalendarDay;
  index: number;
  sumEventHeights: number;
  handleOnClick: () => void;
  handleEditEvent: () => void;
  onMouseDown: any;
}
export function DayColumn({
  day,
  handleOnClick,
  handleEditEvent,
  onMouseDown,
  sumEventHeights,
  index,
}: DayColumnProps) {
  return (
    <StyledDayItem
      key={index}
      onClick={handleOnClick}
      onMouseDown={onMouseDown}
    >
      {day.dayEvents.map((dayEvent) => {
        const [startPosition, height] =
          getEventCSSHeightAndTtartPosition(dayEvent);
        const startTime: string = getTimeFromDate(dayEvent.startDate);
        const className: string | undefined =
          startTime === config.startTimeMidnght ? "midnight-event" : undefined;
        const topPosition = Number(startPosition) - sumEventHeights;
        sumEventHeights = sumEventHeights + Number(height);

        return (
          <StyledCalEvent
            topPosition={String(topPosition)}
            itemHeight={String(height)}
            key={dayEvent._id}
            className={className}
            onClick={handleEditEvent}
          >
            <EventContent dayEvent={dayEvent} height={height} />
          </StyledCalEvent>
        );
      })}
    </StyledDayItem>
  );
}
