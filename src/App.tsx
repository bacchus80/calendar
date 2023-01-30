import { useEffect, useState } from "react";
import { Calendar } from "./components";
import { useFindEvents } from "./api/hooks/";
import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
  addDaysToDate,
  getStartOfDay,
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
  const todaysDate: Date = new Date(getStartOfDay(new Date()));
  const [currentDate, setCurrenDate] = useState<Date>(todaysDate);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>(
    getFirstDayOfWeek(currentDate)
  );
  const [lastDayOfWeek, setLastDayOfWeek] = useState<Date>(
    getLastDayOfWeek(todaysDate)
  );
  //const [refetch, setRefetch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [lastFetchTimenstamp, setLastFetchTimenstamp] =
    useState<Date>(todaysDate);
  const {
    events,
    error,
    isLoading: eventsAreLoading,
  } = useFindEvents({
    startDate: firstDayOfWeek,
    endDate: lastDayOfWeek,
    lastFetchTimenstamp: lastFetchTimenstamp,
  });
  const viewNextWeek = () => {
    viewWeek(addDaysToDate(currentDate, 7));
  };
  const viewPreviousWeek = () => {
    viewWeek(addDaysToDate(currentDate, -7));
  };
  const viewCurrentWeek = () => {
    viewWeek(todaysDate);
  };
  const viewWeek = (date: Date) => {
    setCurrenDate(date);
    setFirstDayOfWeek(getFirstDayOfWeek(date));
    setLastDayOfWeek(getLastDayOfWeek(date));
  };
  const handleNetworkErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRefetch = () => {
    setLastFetchTimenstamp(new Date());
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
          {Texts.aNetworkErrorOccurred}
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
          startViewingHour={8}
          endViewingHour={17}
          eventsAreLoading={eventsAreLoading}
          viewPreviousWeek={viewPreviousWeek}
          viewCurrentWeek={viewCurrentWeek}
          viewNextWeek={viewNextWeek}
          refetchEvents={handleRefetch}
        />
      </CalendarHolder>
    </div>
  );
}

export default App;
