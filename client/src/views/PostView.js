import React from "react";
import Header from "../components/Header";
import Post from "../components/Post.js";
import CommentSection from "../components/CommentSection.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../config";
import axios from "axios";

const PostView = () => {
  let { postImage } = useParams();
  const postImagePath = `${API}/media/posts/`;
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getPost = async (post) => {
    try {
      const response = await axios.get(`/posts/p?postImage=${post}`);

      if (response.data.length !== 0) setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTopComments = async (postId) => {
    try {
      const response = await axios.get(
        `/comments/getTopComments?postId=${postId}`
      );
      if (response.data.length !== 0) setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const requests = async () => {
    await getPost(postImage);
    await getTopComments(data.id);
    setLoaded(true);
  };
  useEffect(() => {
    requests();
  }, [loaded]);

  return (
    <div>
      <Header location="Post" />
      {loaded && <Post data={data} imgPath={postImagePath + data.location} />}
      {loaded && <CommentSection comments={comments} />}
    </div>
  );
};

export default PostView;
