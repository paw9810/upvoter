import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import { API } from "../config";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles({
  media: {
    height: 40,
    width: 40,
  },
  commentMargin: {
    marginTop: "10px",
  },
});

const Comment = ({ data }) => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const profileImagePath = `${API}/media/profile/`;

  const handleChildren = async () => {
    try {
      const response = await axios.get(
        `/comments/getChildComments?postId=${data.postId}&parentComment=${data.id}`
      );
      if (response.data.length !== 0) setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box className={classes.commentMargin}>
      <Container maxWidth="sm">
        <Card>
          <Link
            component={Button}
            to={`/user/${data.user.name}`}
            size="small"
            color="secondary"
          >
            <CardMedia
              className={classes.media}
              image={profileImagePath + data.user.imageLocation}
              title="Paella dish"
            />
            <CardActions>
              <Typography variant="body1" component="span">
                {data.user.name}
              </Typography>
            </CardActions>
          </Link>
          <Divider />
          <CardContent>
            <Typography variant="body1" component="span">
              {data.text}
            </Typography>
          </CardContent>
          {data.hasChildren && <Divider />}
          {data.hasChildren && (
            <Button onClick={handleChildren}>Show answers</Button>
          )}
          {comments.map((comment, i) => (
            <Comment key={i} data={comment} />
          ))}
        </Card>
      </Container>
    </Box>
  );
};

export default Comment;
