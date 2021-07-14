import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddPost = () => {
  const classes = useStyles();
  const { control, register, handleSubmit } = useForm();
  let formData = new FormData();

  const onSubmit = async (data) => {
    try {
      formData.append("postImage", data.postImage[0]);
      formData.append("title", data.title);
      formData.append("tags", data.tags);
      const response = await axios.post("/posts/addPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      alert(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add new post
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Button variant="contained" component="label">
            Add Image
            <input
              {...register("postImage", { required: true })}
              type="file"
              id="postImage"
              name="postImage"
              hidden
            />
          </Button>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="title"
                name="title"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="tags"
                variant="outlined"
                required
                margin="normal"
                fullWidth
                name="tags"
                label="Tags"
                id="tags"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add post
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddPost;
