import { useEffect, useState } from "react";
import {
  getTimeFromDate,
} from "../../utils/dateFunctions";
import { config } from "../../constants/config";
import {
  getDayEvents,
  getEventCSSHeightAndTtartPosition,
  emptyEventWithStartAndEndTimestamp,
  isEventOverlapping,
  getEmptyEvent,
} from "../../utils/eventFunctions";
import { EventModal } from "../EventModal";
import { CalendarHeader, TimeMarkers, EventContent } from "./CalendarParts";
import { CalendarEvent } from "../../models";
import {
  StyledCalEvent,
  CalendarHolder,
  StyledContainer,
  StyledDayItem,
  Timeline,
} from "./Calendar.styles";

type viewHour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

export interface CalerdarProps {
  /** Calendar exents */
  events: CalendarEvent[];
  /** Boolean whether events are being loaded or not */
  eventsAreLoading: boolean;
  /** Starting view hour for calendar */
  startViewingHour?: viewHour;
  /** End view hour for calendar */
  endViewingHour?: viewHour;
  /** Todays date */
  todaysDate: Date;
  /** Selected date */
  currentDate: Date;
  /** Function for switching to previous week */
  viewPreviousWeek: () => void;
  /** Function for switching to current week */
  viewCurrentWeek: () => void;
  /** Function for switching to next week */
  viewNextWeek: () => void;
  refetchEvents: () => void;
}

export interface CalendarDay {
  calendarDate: Date;
  dayEvents: CalendarEvent[];
}

/**
 * A week calendar display, each hour corresponds to 60px
 */
export function Calendar({
  currentDate,
  events,
  eventsAreLoading,
  startViewingHour = 0,
  endViewingHour = 23,
  viewPreviousWeek,
  viewCurrentWeek,
  viewNextWeek,
  refetchEvents,
}: CalerdarProps) {
  const [open, setOpen] = useState(false);
  const [clickYPosition, setClickYPosition] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>(
    getEmptyEvent()
  );
  const handleOpen = () => setOpen(true);
  const handleClose = (doRefetch: Boolean = true) => {
    if (doRefetch) {
      refetchEvents();
    }
    setOpen(false);
  };
  const viewHeightHour =
    endViewingHour > startViewingHour ? endViewingHour - startViewingHour : 24;
  const viewHeight = viewHeightHour * config.hourSlotHeight;

  // the days of selected week
  const calendarDays: CalendarDay[] = getCalendarDaysForSelectedWeek(
    currentDate,
    events
  );

  function checkIfEventOverlapping(event: CalendarEvent): boolean {
    let isOverlapping = false;
    events.every((compareEvent) => {
      if (isEventOverlapping(event, compareEvent)) {
        isOverlapping = true;
        return false;
      }
      return true;
    });
    return isOverlapping;
  }

  const createNewEvent = (date: any) => {
    const viewEvent: CalendarEvent = emptyEventWithStartAndEndTimestamp(
      date,
      clickYPosition
    );
    setSelectedEvent(viewEvent);
    handleOpen();
  };

  const editEvent = (e: any, event: CalendarEvent) => {
    setSelectedEvent(event);
    handleOpen();
    e.stopPropagation();
    e.preventDefault();
  };

  // used for setting clicked mouse position
  const onMouseDown = (e: any) => {
    var element: HTMLElement | null =
      document.getElementById("calendar-content");
    var topPos: number = element
      ? Math.ceil(element.getBoundingClientRect().top)
      : 0;
    const clickYPosition =
      Math.ceil((e.clientY - topPos) / config.hourSlotHeight) - 1;

    setClickYPosition(clickYPosition);
  };

  useEffect(() => {
    const element = document.getElementById("calendar-holder");
    if (element !== undefined && element !== null) {
      const startViewingHourPosition = startViewingHour*config.hourSlotHeight+1;
      console.log("scoll");
      element.scrollTo({
            top: startViewingHourPosition,
            behavior: "smooth",
        });
    }
  },[startViewingHour]);

  return (
    <div>
      <EventModal
        open={open}
        handleClose={handleClose}
        event={selectedEvent}
        checkIfEventOverlapping={checkIfEventOverlapping}
      />
      <CalendarHeader
        currentDate={currentDate}
        calendarDays={calendarDays}
        viewPreviousWeek={viewPreviousWeek}
        viewCurrentWeek={viewCurrentWeek}
        viewNextWeek={viewNextWeek}
      />
      <CalendarHolder viewHeight={viewHeight} id="calendar-holder">
        <Timeline>
          <TimeMarkers />
        </Timeline>
          {/* Calendar columns */}
          <StyledContainer id="calendar-content">
            {calendarDays.map((day, index) => {
              let sumEventHeights: number = 0;
              return (
                <StyledDayItem
                  isLoading={eventsAreLoading}
                  key={index}
                  onClick={() => createNewEvent(day.calendarDate)}
                  onMouseDown={onMouseDown}
                >
                  {day.dayEvents.map((dayEvent) => {
                    const [startPosition, height] =
                      getEventCSSHeightAndTtartPosition(dayEvent);
                    const startTime: string = getTimeFromDate(
                      dayEvent.startDate
                    );
                    const className: string | undefined =
                      startTime === config.startTimeMidnght
                        ? "midnight-event"
                        : undefined;
                    const topPosition = Number(startPosition) - sumEventHeights;
                    sumEventHeights = sumEventHeights + Number(height);

                    return (
                      <StyledCalEvent
                        topPosition={String(topPosition)}
                        itemHeight={String(height)}
                        key={dayEvent._id}
                        className={className}
                        onClick={(e: any) => editEvent(e, dayEvent)}
                      >
                        <EventContent dayEvent={dayEvent} height={height} />
                      </StyledCalEvent>
                    );
                  })}
                </StyledDayItem>
              );
            })}
          </StyledContainer>
      </CalendarHolder>
    </div>
  );
}

// Get calendar days for selected week
function getCalendarDaysForSelectedWeek(
  currentDate: Date,
  events: CalendarEvent[]
): CalendarDay[] {
  let tmp: Date = new Date(currentDate.valueOf());
  const calendarDays: CalendarDay[] = [];

  // create week days
  for (let i = 1; i < 8; i++) {
    const currentDayDate: Date = new Date(
      tmp.setDate(tmp.getDate() - tmp.getDay() + i)
    );
    const calendarDay: CalendarDay = {
      calendarDate: currentDayDate,
      dayEvents: getDayEvents(currentDayDate, events),
    };
    calendarDays.push(calendarDay);
  }
  return calendarDays;
}
