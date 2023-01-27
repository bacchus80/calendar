import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Texts } from "../../constants";
import { CalendarEvent } from "../../models";

export interface EventFormProps {
  event: CalendarEvent;
  handleChange: (event: any) => void;
}

export function EventForm({ event, handleChange }: EventFormProps) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-startDate-input"
        label={Texts.startDate}
        type="text"
        value={event.startDate}
        name="startDate"
        onChange={handleChange}
      />
      <TextField
        id="outlined-endDate-input"
        label={Texts.endDate}
        type="text"
        value={event.endDate}
        name="endDate"
        onChange={handleChange}
      />
      <TextField
        id="outlined-activity-input"
        label={Texts.activity}
        type="text"
        value={event.activity}
        name="activity"
        onChange={handleChange}
      />
      <TextField
        id="outlined-location-input"
        label={Texts.location}
        type="text"
        value={event.location}
        name="location"
        onChange={handleChange}
      />
      {/*
      <br />
              <Button variant="outlined" type="submit" onClick={handleClick}>
          {Texts.save}
        </Button>
    */}
    </Box>
  );
}
