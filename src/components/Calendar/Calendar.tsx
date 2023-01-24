import { CSSProperties, ReactElement, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  getHourStartTime,
  getDateInFormatYYYYMMDD,
  getDayAndMonth,
  getTimeFromDate,
  getWeekdayLong,
  getMonthNames,
} from "../../utils/dateFunctions";
import { getDayEvents } from "../../utils/eventFunctions";
import { EventModal } from "../EventModal";
import { Texts } from "../../constants";
import { CalendarEvent } from "../../models";
import {
  CalendarHeader,
  MonthAndName,
  CalendarMonthNameYear,
  CalendarActivity,
  CalendarTimeOrLocation,
  CalEvent,
  CalendarHolder,
  StyledContainer,
  StyledItem,
  StyledDayItem,
  Timeline,
  TimeMarker,
} from "./Calendar.styles";
import { viewWeek } from "../../App";

export interface CalerdarProps {
  /* Calendar exents */
  events: CalendarEvent[];
  /* Todays date */
  todaysDate: Date;
  /* Selected date */
  currentDate: Date;
  /** Switch week */
  switchWeek: (type: viewWeek) => void;
}

interface CalendarDay {
  calendarDate: Date;
  dayEvents: CalendarEvent[];
}

/**
 * A week calendar display, each hour corresponds to 60px
 */
export function Calendar({
  todaysDate,
  currentDate,
  events,
  switchWeek,
}: CalerdarProps) {
  const months = getMonthNames();

  const [open, setOpen] = useState(false);
  const [clickYPosition, setClickYPosition] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(
    undefined
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentMonthName = months[currentDate.getMonth()];
  const currentYear: number = currentDate.getFullYear();

  // the days of selected week
  const calendarDays: CalendarDay[] = getCalendarDaysForSelectedWeek(currentDate, events);
 

  const createNewEvent = (date: any) => {
    const cleanDate = getDateInFormatYYYYMMDD(date);
    const startTime = getHourStartTime(clickYPosition);
    const endTime = getHourStartTime(1 + clickYPosition);
    const viewEvent: CalendarEvent = {
      _id: "-1",
      activity: "",
      startDate: cleanDate + " " + startTime,
      endDate: cleanDate + " " + endTime,
      location: "",
    };
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
    const clickYPosition = Math.ceil((e.clientY - topPos) / 61) - 1;

    setClickYPosition(clickYPosition);
  };

  return (
    <div>
      <EventModal open={open} handleClose={handleClose} event={selectedEvent} />
      <CalendarHeader>
        <CalendarMonthNameYear>
          {currentMonthName} {currentYear}
        </CalendarMonthNameYear>
        <ButtonGroup
          size="small"
          aria-label="small button group"
          style={{ marginLeft: "auto" }}
        >
          <Button
            title={Texts.viewPreviousWeek}
            onClick={() => switchWeek("prev")}
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
          />
          <Button onClick={() => switchWeek("current")} variant="outlined">
            {Texts.today}
          </Button>
          <Button
            title={Texts.viewNextWeek}
            onClick={() => switchWeek("next")}
            variant="outlined"
            startIcon={<ArrowForwardIosIcon />}
          />
        </ButtonGroup>
      </CalendarHeader>
      <CalendarHolder>
        <Timeline>
          <StyledItem> </StyledItem>
          {getDayHours()}
        </Timeline>
        <div>
          <StyledContainer>
            {calendarDays.map((day: CalendarDay, index) => (
              <StyledItem key={index}>
                <div>{getWeekdayLong(day.calendarDate)}</div>
                <MonthAndName>{getDayAndMonth(day.calendarDate)}</MonthAndName>
              </StyledItem>
            ))}
          </StyledContainer>

          {/* Calendar columns */}
          <StyledContainer id="calendar-content">
            {calendarDays.map((day, index) => {
              let sumEventHeights: number = 0;
              return (
                <StyledDayItem
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
                    const endTime: string = getTimeFromDate(dayEvent.endDate);
                    const className: string | undefined =
                      startTime === "00:00" ? "midnight-event" : undefined;
                    const topPosition = Number(startPosition) - sumEventHeights;
                    sumEventHeights = sumEventHeights + Number(height);

                    const smallStyle: CSSProperties =
                      Number(height) < 20
                        ? { position: "relative", top: "-8px" }
                        : {};
                    return (
                      <CalEvent
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
                            <CalendarActivity>
                              {dayEvent.activity}
                            </CalendarActivity>
                            <CalendarTimeOrLocation>
                              {dayEvent.location}
                            </CalendarTimeOrLocation>
                          </>
                        ) : (
                          <CalendarTimeOrLocation
                            style={smallStyle}
                            title={`${startTime} - ${endTime}`}
                          >{`${dayEvent.activity} ${dayEvent.location}`}</CalendarTimeOrLocation>
                        )}
                      </CalEvent>
                    );
                  })}
                </StyledDayItem>
              );
            })}
          </StyledContainer>
        </div>
      </CalendarHolder>
    </div>
  );
}

function getDayHours(): ReactElement[] {
  const hours: ReactElement[] = [];
  for (var i = 0; i < 24; ++i) {
    hours[i] = <TimeMarker key={i}>{getHourStartTime(i)}</TimeMarker>;
  }
  return hours;
}

/**
 * Returns of top position and height for the event
 */
function getEventCSSHeightAndTtartPosition(event: CalendarEvent) {
  const startTime = getTimeFromDate(event.startDate);
  const endTime = getTimeFromDate(event.endDate);
  const diff =
    new Date(event.endDate).valueOf() - new Date(event.startDate).valueOf();
  const hourStart: number = Number(startTime.split(":")[0]);
  const minuteStart: number = Number(startTime.split(":")[1]);
  const hourEnd: number = Number(endTime.split(":")[0]);
  const hourDiff: number = Math.floor(hourEnd - hourStart);
  const startPosition: number = minuteStart + Number(hourStart * 61 - 1); //diffTop/1000/60;
  const eventHeight: number = diff / 1000 / 60 + hourDiff + 1;

  return [startPosition, eventHeight];
}

// Get calendar days for selected week
function getCalendarDaysForSelectedWeek(currentDate: Date, events: CalendarEvent[]): CalendarDay[]{
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
