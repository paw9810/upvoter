import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const Pagination = ({ pages }) => {
  const buttons = [];
  for (let i = 0; i < pages; i++) {
    buttons.push(
      <Link component={Button} to={`/p/${i + 1}`} key={i} variant="outlined">
        {i + 1}
      </Link>
      // <Button onClick={handlePage} key={i} variant="outlined" value={i + 1}>
      //   {i + 1}
      // </Button>
    );
  }

  // TODO: show fewer pages when many
  // if (pages > 3) return (
  //   <Grid container justify="center">

  //   </Grid>
  // )
  return (
    <>
      <Grid container justifyContent="center">
        {buttons}
      </Grid>
    </>
  );
};

export default Pagination;
