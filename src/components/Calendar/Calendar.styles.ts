import styled from "styled-components";
import { COLORS } from "../../constants";

export const CalendarHolder = styled("div")`
  display: grid;
  grid-template-columns: auto 1fr;
  margin-top: 2rem;
`;

export const StyledContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledItem = styled("div")`
  flex: 1 0 14%;
  height: 48px;
`;

export const MonthAndName = styled("div")`
  font-size: 90%;
  color: ${COLORS["444444"]};
`;

export const StyledDayItem = styled("div")`
  flex: 1 0 14%;
  height: 1464px;
  border-right: 1px solid ${COLORS["e1e1e1"]};
  border-bottom: 1px solid ${COLORS["e1e1e1"]};
  border-top: 1px solid ${COLORS["e1e1e1"]};
  background-color: ${COLORS["fafbfc"]};
`;

export const Timeline = styled("div")`
  display: grid;
`;

export const CalendarHeader = styled("div")`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
`;

export const CalendarMonthNameYear = styled("div")`
  display: grid;
  font-size: 140%;
  font-weight: bold;
`;

export const TimeMarker = styled("div")`
  height: 60px;
  border-right: 1px solid ${COLORS["e1e1e1"]};
  border-top: 1px solid ${COLORS["e1e1e1"]};
  font-size: 80%;
`;

export const CalEvent = styled("div")<{
  itemHeight: string;
  topPosition: string;
}>`
  background-color: ${COLORS["9fe3b0"]};
  border-top: 1px solid ${COLORS["e1e1e1"]};
  border-bottom: 1px solid ${COLORS["e1e1e1"]};
  font-size: 90%;
  text-align: left;
  position: relative;
  box-sizing: border-box;
  padding: 8px;
  height: ${(p) => (p.itemHeight ? `${p.itemHeight}px` : "60px")};
  top: ${(p) => (p.topPosition ? `${p.topPosition}px` : "auto")};
  &.midnight-event {
    border-top-style: none;
  }
`;

export const CalendarTimeOrLocation = styled("div")`
  font-size: 90%;
`;

export const CalendarActivity = styled("div")`
  font-weight: bold;
  font-size: 95%;
`;
