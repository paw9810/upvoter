import React from "react";
import Header from "../components/Header";
import Post from "../components/Post.js";
import Pagination from "../components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../config";
import { useParams } from "react-router-dom";

const MainView = () => {
  let { defaultPage } = useParams();
  const postImagePath = `${API}/media/posts/`;
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPosts(defaultPage);
  }, [defaultPage]);

  const getPosts = async (page) => {
    try {
      const response = await axios.get(`/page/${page}`);
      if (response.data[0].length !== 0) setData(response.data[0]);
      setPageCount(response.data[1]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoaded(true);
    }
  };

  if (data)
    return (
      <div>
        <Header location="Home" />
        {loaded &&
          data.map((post, i) => (
            <Post key={i} data={post} imgPath={postImagePath + post.location} />
          ))}

        <Pagination pages={pageCount} />
      </div>
    );
};

export default MainView;
