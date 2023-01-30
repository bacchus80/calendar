import { getHourStartTime } from "../../../../utils/dateFunctions";
import { TimeMarker } from "../../Calendar.styles";

export function TimeMarkers(): any {
  const hours: number[] = [];
  for (var i = 0; i < 24; ++i) {
    hours.push(i);
  }
  return (
    <>
      {hours.map((hour, index) => (
        <TimeMarker key={index}>{getHourStartTime(hour)}</TimeMarker>
      ))}
    </>
  );
}
