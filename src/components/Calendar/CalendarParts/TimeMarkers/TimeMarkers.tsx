import { getHourStartTime } from "../../../../utils/dateFunctions";
import { TimeMarker } from "../../Calendar.styles";

export function TimeMarkers(): any {
  const hours: number[] = [...Array(24).keys()];
  const timeMarkers = hours.map((hour, index) => (
    <TimeMarker key={index}>{getHourStartTime(hour)}</TimeMarker>
  ));
  return (
    <>
      {timeMarkers}
    </>
  );
}
