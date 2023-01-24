import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Texts } from "../../constants";
import { CalendarEvent } from "../../models";

export interface EventFormProps {
  event?: CalendarEvent;
}

export function EventForm({ event }: EventFormProps) {

  const initEvent: CalendarEvent = event
    ? {
        _id: event._id,
        activity: event.activity,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
      }
    : {
        // _id: "-1",
        activity: "",
        location: "",
        startDate: "",
        endDate: "",
      };

  const [eventData, setEventData] = useState<CalendarEvent>(initEvent);

  const handleChange = (event: any) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-startDate-input"
        label={Texts.startDate}
        type="text"
        value={eventData.startDate}
        name="startDate"
        onChange={handleChange}
      />
      <TextField
        id="outlined-endDate-input"
        label={Texts.endDate}
        type="text"
        value={eventData.endDate}
        name="endDate"
        onChange={handleChange}
      />
      <TextField
        id="outlined-activity-input"
        label={Texts.activity}
        type="text"
        value={eventData.activity}
        name="activity"
        onChange={handleChange}
      />
      <TextField
        id="outlined-location-input"
        label={Texts.location}
        type="text"
        value={eventData.location}
        name="location"
        onChange={handleChange}
      />
      <br />
    </Box>
  );
}
