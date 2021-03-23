import React from "react";
import Comment from "./Comment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  commentSection: {
    marginTop: 40,
  },
});

const CommentSection = () => {
  const classes = useStyles();

  return (
    <section className={classes.commentSection}>
      <Comment />
      <Comment />
    </section>
  );
};

export default CommentSection;
