import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { EventForm } from "../EventForm";
import { CalendarEvent } from "../../models";
import { Texts } from "../../constants";
import { isValidEventData } from "../../utils/eventFunctions";
import { useCreateDeleteUpdateEvent, apiMethod } from "../../api/hooks";

export interface EventModalProps {
  /* Whether the modal shoud be open*/
  open: boolean;
  /* Close fuction*/
  handleClose: () => void;
  checkIfEventOverlapping: (event: CalendarEvent) => boolean;
  /* Calendar event */
  event: CalendarEvent;
}

export function EventModal({
  open,
  handleClose,
  event,
  checkIfEventOverlapping,
}: EventModalProps) {
  const [eventData, setEventData] = useState<CalendarEvent>(event);
  const [newEventIsOverlapping, setNewEventIsOverlapping] =
    useState<boolean>(false);
  const [apiMethod, setApiMethod] = useState<apiMethod>("POST");
  const [enbleSaveAndUpdate, setEnableSaveAndUpdate] = useState<boolean>(true);
  const [lastCallApiTimestamp, setLastCallApiTimestamp] = useState<
    Date | string
  >("");
  // eslint-disable-next-line
  const { error, isError, isLoading, result } = useCreateDeleteUpdateEvent({
    event: eventData,
    method: apiMethod,
    lastCallApiTimestamp: lastCallApiTimestamp,
  });

  const handleModalClose = () => {
    setApiMethod("PUT");
    setNewEventIsOverlapping(false);
    handleClose();
  };

  const handleChange = (event: any) => {
    const newEventState: CalendarEvent = {
      ...eventData,
      [event.target.name]: event.target.value,
    };
    setEventData(newEventState);
    setEnableSaveAndUpdate(isValidEventData(newEventState));
  };

  const modalTitle =
    event && event._id && event._id !== ""
      ? Texts.editEvent
      : Texts.createNewEvent;

  const handleCreate = () => {
    const overlappingEvent = checkIfEventOverlapping(eventData);
    setApiMethod("POST");
    setNewEventIsOverlapping(overlappingEvent);
    if (!overlappingEvent) {
      setLastCallApiTimestamp(new Date());
      setTimeout(function () {
        setLastCallApiTimestamp("");
        handleModalClose();
      }, 300);
    }
  };

  const handleDelete = () => {
    setApiMethod("DELETE");
    setLastCallApiTimestamp(new Date());
    setTimeout(function () {
      setLastCallApiTimestamp("");
      handleModalClose();
    }, 300);
  };

  const handleUpdate = () => {
    const overlappingEvent = checkIfEventOverlapping(eventData);
    setApiMethod("PUT");
    setNewEventIsOverlapping(overlappingEvent);
    if (!overlappingEvent) {
      setLastCallApiTimestamp(new Date());
      setTimeout(function () {
        setLastCallApiTimestamp("");
        handleModalClose();
      }, 300);
    }
  };

  useEffect(() => {
    setEventData(event);
  }, [event]);

  return (
    <Dialog
      onClose={handleModalClose}
      aria-labelledby="dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {modalTitle}
        <IconButton
          title={Texts.close}
          aria-label="close"
          onClick={handleModalClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <EventForm event={eventData} handleChange={handleChange} />
        {newEventIsOverlapping ? (
          <Alert severity="warning">{Texts.overlappingWithOtherEvent}</Alert>
        ) : (
          <> </>
        )}
      </DialogContent>
      <DialogActions>
        {/* Show delete and update buttons for an exesting element.
            Only show save button for new events (after posting,
            the events are refetched so the event may get an ID.
         */}
        {eventData._id !== "" ? (
          <>
            <Button color="error" variant="outlined" onClick={handleDelete}>
              {Texts.delete}
            </Button>
            <Button
              variant="outlined"
              disabled={!enbleSaveAndUpdate}
              onClick={handleUpdate}
            >
              {Texts.update}
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            disabled={!enbleSaveAndUpdate}
            onClick={handleCreate}
          >
            {Texts.save}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
