import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { Link } from "react-router-dom";
//test image
//import image from "../img/testimage.jpg";

const useStyles = makeStyles({
  media: {
    minHeight: 250,
    backgroundSize: "contain",
  },
  desc: {
    paddingTop: 0,
  },
  padding: {
    padding: "4px",
  },
  margin: {
    marginBottom: "20px",
  },
});

const Post = ({ data, imgPath }) => {
  const classes = useStyles();

  return (
    <Box className={classes.margin}>
      <Container maxWidth="sm">
        <Card>
          <CardActions className={classes.padding}>
            <Button size="medium" color="primary">
              {data.title}
            </Button>
          </CardActions>
          <CardActions className={classes.padding}>
            <Link
              component={Button}
              to={`/user/${data.user.name}`}
              size="small"
              color="secondary"
            >
              {data.user.name}
            </Link>
            {/* <Button size="small" color="secondary">
              {data.user.name}
            </Button> */}
          </CardActions>
          <CardContent className={classes.desc}>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.tags}
            </Typography>
          </CardContent>
          <CardActionArea>
            {/* test image */}
            <CardMedia
              className={classes.media}
              image={imgPath}
              title="metin"
            />
          </CardActionArea>
          <CardActions>
            <Grid container justifyContent="center">
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                <Button>
                  <ThumbUpIcon />
                </Button>
                <Button variant="text">{data.rating}</Button>
                <Button color="secondary">
                  <ThumbDownIcon />
                </Button>
              </ButtonGroup>
            </Grid>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
};

export default Post;
