import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Pagination = ({ pages }) => {
  const buttons = [];
  for (let i = 0; i < pages; i++) {
    buttons.push(
      <Button key={i} variant="outlined">
        {i + 1}
      </Button>
    );
  }
  console.log(buttons);

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
