import styled, { keyframes, css } from "styled-components";
import { COLORS, config } from "../../constants";

const pulsate = keyframes`
  0%   {background-color: ${COLORS["fafbfc"]};}
  50%   {background-color: ${COLORS["e1e1e1"]};}
  100% {background-color: ${COLORS["fafbfc"]};}
`;

export const DayNameHolder = styled("div")`
  display: grid;
  grid-template-columns: auto 1fr;
`;
export const CalendarHolder = styled(DayNameHolder) <{
  viewHeight: number;
}>`
  position: relative;
  overflow: scroll;
  height: ${(p) => (p.viewHeight ? `${p.viewHeight}px` : "auto")};
`;

export const StyledContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledItem = styled("div")`
  flex: 1 0 14%;
  height: 48px;
  border-bottom: solid 1px ${COLORS["efefef"]};
  width: ${config.widthHourMarkers}px;
`;

export const MonthAndName = styled("div")`
  font-size: 90%;
  color: ${COLORS["444444"]};
`;

export const StyledDayItem = styled("div") <{
  isLoading?: boolean;
}>`
  flex: 1 0 14%;
  height: ${24 * config.hourSlotHeight}px;
  border-right: 1px solid ${COLORS["e1e1e1"]};
  border-bottom: 1px solid ${COLORS["e1e1e1"]};
  background-color: ${COLORS["fafbfc"]};
  ${({ isLoading }) =>
    isLoading &&
    css`
      animation: ${pulsate} 2s linear infinite;
    `}

  &:hover {
    cursor: pointer;
  }
`;

export const Timeline = styled("div")`
  display: grid;
`;

export const StyledCalendarHeader = styled("div")`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  margin-bottom: 1rem;
`;

export const CalendarMonthNameYear = styled("div")`
  display: grid;
  font-size: 140%;
  font-weight: bold;
`;

export const TimeMarker = styled("div")`
  height: 60px;
  border-right: 1px solid ${COLORS["e1e1e1"]};
  border-bottom: 1px solid ${COLORS["e1e1e1"]};
  font-size: 80%;
  width: ${config.widthHourMarkers}px;
`;

export const StyledCalEvent = styled("div") <{
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
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const CalendarTimeOrLocation = styled("div")`
  font-size: 90%;
`;

export const CalendarActivity = styled("div")`
  font-weight: bold;
  font-size: 95%;
`;
