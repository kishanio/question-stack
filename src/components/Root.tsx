import React, { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  LinearProgress
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";

import QuestionWrapper from "./QuestionWrapper";

const layoutTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#eeeeee"
    },
    primary: {
      main: "#233d4d"
    }
  }
});

const useStyles = makeStyles(theme => ({
  loading: {
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1
  }
}));

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={layoutTheme}>
        {loading && <LinearProgress className={classes.loading} />}
        <AppBar elevation={0} position="static">
          <Toolbar variant="dense">
            <Typography color="inherit" variant="h6">
              Question Stack
            </Typography>
          </Toolbar>
        </AppBar>
        <QuestionWrapper loading={loading} setLoading={setLoading} />
      </ThemeProvider>
    </React.Fragment>
  );
};
