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
import testimg from "../img/testimage.jpg";

const useStyles = makeStyles({
  media: {
    height: 40,
    width: 40,
  },
  commentMargin: {
    marginTop: "10px",
  },
});

const Comment = () => {
  const classes = useStyles();

  return (
    <Box className={classes.commentMargin}>
      <Container maxWidth="sm">
        <Card>
          <Button>
            <CardMedia
              className={classes.media}
              image={testimg}
              title="Paella dish"
            />
            <CardActions>
              <Typography variant="p" component="p">
                Profile name
              </Typography>
            </CardActions>
          </Button>
          <Divider />
          <CardContent>
            <Typography variant="p" component="p">
              Super komentarz lorem ipsum sadk asdasd asl das sa
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Comment;
