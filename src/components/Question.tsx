import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { QuestionInterface } from "./QuestionWrapper";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  spreadWrapper: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

export default (props: { question: QuestionInterface }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <DialogTitle>{props.question.title}</DialogTitle>
        <DialogContent>
          <div dangerouslySetInnerHTML={{ __html: props.question.body }}></div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              window.open(props.question.link);
            }}
            color="primary"
          >
            Goto Stack Overflow
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem
        button
        onClick={() => {
          setOpen(true);
        }}
        className={classes.root}
      >
        <ListItemAvatar>
          <Avatar
            alt={props.question.owner.displayName}
            src={props.question.owner.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          primary={props.question.title}
          secondaryTypographyProps={{
            className: classes.spreadWrapper
          }}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                className={classes.inline}
              >
                {props.question.owner.displayName}
              </Typography>
              {moment.unix(props.question.creationDate).fromNow()}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};
