import React from "react";
import Header from "../components/Header";
import Post from "../components/Post.js";
import Grid from "@material-ui/core/Grid";
import Pagination from "../components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../config";

const MainView = () => {
  const postImagePath = `${API}/media/posts/`;
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get("/page/");
        setData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoaded(true);
      }
    };

    getPost();
  }, []);

  if (data)
    return (
      <div>
        <Header location="Home" />
        {loaded &&
          data.map((post, i) => (
            <Post key={i} data={post} imgPath={postImagePath + post.location} />
          ))}

        <Pagination pages={3} />
      </div>
    );
};

export default MainView;
