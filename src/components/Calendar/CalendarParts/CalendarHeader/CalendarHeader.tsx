import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Texts } from "../../../../constants";
import {
  getWeekdayLong,
  getMonthNames,
  getDayAndMonth,
} from "../../../../utils/dateFunctions";
import { CalendarDay } from "../../Calendar";
import {
  StyledCalendarHeader,
  CalendarMonthNameYear,
  StyledItem,
  StyledContainer,
  MonthAndName,
  DayNameHolder,
} from "../../Calendar.styles";

export interface CalendarHeaderProps {
  /* Selected date */
  currentDate: Date;
  calendarDays: CalendarDay[];
  /** Switch week */
  viewPreviousWeek: () => void;
  viewCurrentWeek: () => void;
  viewNextWeek: () => void;
}

export function CalendarHeader({
  currentDate,
  calendarDays,
  viewPreviousWeek,
  viewCurrentWeek,
  viewNextWeek,
}: CalendarHeaderProps) {
  const months = getMonthNames();
  const currentMonthName = months[currentDate.getMonth()];
  const currentYear: number = currentDate.getFullYear();

  return (
    <div
      style={{
        position: "sticky",
        top: "0px",
        width: "100%",
        zIndex: "100",
        backgroundColor: "white",
      }}
    >
      <StyledCalendarHeader>
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
            onClick={() => viewPreviousWeek()}
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
          />
          <Button onClick={() => viewCurrentWeek()} variant="outlined">
            {Texts.today}
          </Button>
          <Button
            title={Texts.viewNextWeek}
            onClick={() => viewNextWeek()}
            variant="outlined"
            startIcon={<ArrowForwardIosIcon />}
          />
        </ButtonGroup>
      </StyledCalendarHeader>
      <DayNameHolder>
        <StyledItem> </StyledItem>
        <StyledContainer>
          {calendarDays.map((day: CalendarDay, index) => (
            <StyledItem key={index}>
              <div>{getWeekdayLong(day.calendarDate)}</div>
              <MonthAndName>{getDayAndMonth(day.calendarDate)}</MonthAndName>
            </StyledItem>
          ))}
        </StyledContainer>
      </DayNameHolder>
    </div>
  );
}
