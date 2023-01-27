import { useEffect, useState } from "react";
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
import { useCreateDeleteUpdateEvent, apiMethod } from "../../api/hooks";

export interface EventModalProps {
  /* Whether the modal shoud be open*/
  open: boolean;
  /* Close fuction*/
  handleClose: () => void;
  /* Calendar event */
  event: CalendarEvent;
}

export function EventModal({ open, handleClose, event }: EventModalProps) {
  const [eventData, setEventData] = useState<CalendarEvent>(event);
  const [apiMethod, setApiMethod] = useState<apiMethod>("POST");
  const [lastCallApiTimestamp, setLastCallApiTimestamp] = useState<
    Date | string
  >("");
  // eslint-disable-next-line
  const { error, isError, isLoading, result } = useCreateDeleteUpdateEvent({
    event: eventData,
    method: apiMethod,
    lastCallApiTimestamp: lastCallApiTimestamp,
  });

  const handleChange = (event: any) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  //  const {error, isError, isLoading, result} = useCreateEvent({event: event});
  const modalTitle =
    event && event._id && event._id !== "-1"
      ? Texts.editEvent
      : Texts.createNewEvent;

  /*
  TODO - handle result/error response
  */
  const handleCreate = () => {
    setApiMethod("POST");
    setLastCallApiTimestamp(new Date());
    setTimeout(function () {
      handleClose();
      setLastCallApiTimestamp("");
    }, 500);
  };

  const handleDelete = () => {
    setApiMethod("DELETE");
    setLastCallApiTimestamp(new Date());
    setTimeout(function () {
      handleClose();
      setLastCallApiTimestamp("");
    }, 500);
  };

  const handleUpdate = () => {
    setApiMethod("PUT");
    setLastCallApiTimestamp(new Date());
    setTimeout(function () {
      handleClose();
      setLastCallApiTimestamp("");
    }, 500);
  };

  useEffect(() => {
    setEventData(event);
  }, [event]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {modalTitle}
        <IconButton
          title={Texts.close}
          aria-label="close"
          onClick={handleClose}
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
      </DialogContent>
      <DialogActions>
        {/* Show delete and update buttons for an exesting element.
            Only show save button for new events
         */}
        {event?._id !== "-1" ? (
          <>
            <Button color="error" variant="outlined" onClick={handleDelete}>
              {Texts.delete}
            </Button>
            <Button variant="outlined" onClick={handleUpdate}>
              {Texts.update}
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={handleCreate}>
            {Texts.save}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
