import React from "react";
import Comment from "./Comment";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  commentSection: {
    marginTop: 40,
  },
});

const CommentSection = ({ comments }) => {
  const classes = useStyles();

  return (
    <section className={classes.commentSection}>
      {comments.map((comment, i) => (
        <Comment key={i} data={comment} />
      ))}
    </section>
  );
};

export default CommentSection;
