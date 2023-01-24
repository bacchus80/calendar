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

export interface EventModalProps {
  /* Whether the modal shoud be open*/
  open: boolean;
  /* Close fuction*/
  handleClose: () => void;
  /* Calendar event */
  event?: CalendarEvent;
}

export function EventModal({ open, handleClose, event }: EventModalProps) {
  const modalTitle =
    event && event._id && event._id !== "-1"
      ? Texts.editEvent
      : Texts.createNewEvent;

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
        <EventForm event={event} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disabled type="submit">
          {Texts.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
