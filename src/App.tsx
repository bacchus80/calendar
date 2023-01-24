import { useEffect, useState } from "react";
import { Calendar } from "./components";
import { useFindEvents } from "./api/hooks/";
import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
  addDaysToDate,
} from "./utils/dateFunctions";
import "./App.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Texts } from "./constants";
import { CalendarHolder } from "./App.styles";

export type viewWeek = "prev" | "current" | "next";

function App() {
  const todaysDate: Date = new Date();
  const [currentDate, setCurrenDate] = useState<Date>(todaysDate);
  const [firstday, setFirstday] = useState<Date>(
    getFirstDayOfWeek(currentDate)
  );
  const [open, setOpen] = useState<boolean>(false);
  const [lastday, setLastday] = useState<Date>(getLastDayOfWeek(todaysDate));
  const { events, error, isError } = useFindEvents({
    startDate: firstday,
    endDate: lastday,
  });

  function switchWeek(type: viewWeek) {
    let updatedDate = todaysDate;
    if (type == "prev") {
      updatedDate = addDaysToDate(currentDate, -7);
    } else if (type == "next") {
      updatedDate = addDaysToDate(currentDate, 7);
    }
    setCurrenDate(updatedDate);
    setFirstday(getFirstDayOfWeek(updatedDate));
    setLastday(getLastDayOfWeek(updatedDate));
  }

  const handleNetworkErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <div className="App">
      <Snackbar
        onClose={handleNetworkErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {Texts.someNetworkErrorOccurred}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleNetworkErrorClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Alert>
      </Snackbar>
      <CalendarHolder>
        <Calendar
          currentDate={currentDate}
          todaysDate={todaysDate}
          events={events}
          switchWeek={switchWeek}
        />
      </CalendarHolder>
    </div>
  );
}

export default App;
