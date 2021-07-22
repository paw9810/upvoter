import React from "react";
import Header from "../components/Header";
import Post from "../components/Post.js";
import CommentSection from "../components/CommentSection.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../config";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AuthContext from "../contexts/authContext";
import { useContext } from "react";
import { useAlert } from "react-alert";

const PostView = () => {
  const alert = useAlert();
  const { control, handleSubmit } = useForm();
  let { postImage } = useParams();
  const postImagePath = `${API}/media/posts/`;
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { userId } = useContext(AuthContext);

  const onSubmit = async (form) => {
    try {
      const formData = {
        parentComment: null,
        text: form.text,
        userId: userId,
        postId: data.id,
      };
      await axios.post("/comments/addComment", formData, {
        withCredentials: true,
      });
      await getTopComments(data.id);
    } catch (err) {
      alert.show("You have to be logged in to comment");
    }
  };

  useEffect(() => {
    const getPost = async (post) => {
      try {
        const response = await axios.get(`/posts/p?postImage=${post}`);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPost(postImage);
    setLoaded(true);
  }, [postImage]);
  const getTopComments = async (postId) => {
    try {
      const response = await axios.get(
        `/comments/getTopComments?postId=${postId}`
      );
      setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (data) {
      getTopComments(data.id);
    }
  }, [data]);

  if (data === null) return null;
  return (
    <div style={{ marginBottom: 50 }}>
      <Header location="Post" />
      {loaded && <Post data={data} imgPath={postImagePath + data.location} />}
      <Container component="main" maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="text"
                variant="outlined"
                required
                margin="normal"
                fullWidth
                name="text"
                label="Comment"
                id="text"
                multiline
                rows={2}
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Add comment
          </Button>
        </form>
      </Container>
      {loaded && (
        <CommentSection comments={comments} getTopComments={getTopComments} />
      )}
    </div>
  );
};

export default PostView;
