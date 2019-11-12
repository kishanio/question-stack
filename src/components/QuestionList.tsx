import React from "react";
import { List } from "@material-ui/core";

import { QuestionInterface } from "./QuestionWrapper";
import Question from "./Question";

export default (props: { questions: Array<QuestionInterface> }) => {
  return (
    <List disablePadding={true}>
      {props.questions.map((q, idx: number) => (
        <Question question={q} key={idx} />
      ))}
    </List>
  );
};
