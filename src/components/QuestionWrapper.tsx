import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import QuestionList from "./QuestionList";

const stackApiUrl = `https://api.stackexchange.com/2.2`;

export interface QuestionInterface {
  title: string;
  owner: { displayName: string; avatar: string };
  body: string;
  creationDate: number;
  link: string;
}

export default (props: { setLoading: Function; loading: boolean }) => {
  const [questions, setQuestions] = useState<Array<QuestionInterface>>([]);
  const [endPage, setEndPage] = useState(0);
  const [page, setPage] = useState<number>(1);

  const fetchQuestions = async () => {
    console.log(`Fetching ${page}`);
    props.setLoading(true);
    let response: any = await fetch(
      `${stackApiUrl}/questions?page=${page}&pagesize=20&order=desc&sort=creation&site=stackoverflow&filter=withBody`
    );

    let newQuestions: any = await response.json();

    props.setLoading(false);
    setQuestions([
      ...questions,
      ...newQuestions.items.map((i: any) => ({
        title: i.title,
        owner: {
          displayName: i.owner.display_name,
          avatar: i.owner.profile_image
        },
        creationDate: i.creation_date,
        body: i.body,
        link: i.link
      }))
    ]);
  };

  const scrollEvent = () => {
    const totalScrolled =
      window.innerHeight + document.documentElement.scrollTop;

    const pageHeight = document.documentElement.offsetHeight;
    console.log("scrolling", totalScrolled, pageHeight);
    if (totalScrolled < pageHeight / 2) {
      return;
    }

    setEndPage(window.innerHeight + document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", () => {
        console.log("Listner Remove");
      });
    };
  }, []);

  useEffect(() => {
    if (!props.loading) {
      setPage(page + 1);
    }
  }, [endPage]);

  useEffect(() => {
    fetchQuestions();
  }, [page]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <QuestionList questions={questions} />
      </Grid>
    </Grid>
  );
};
