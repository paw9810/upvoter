import React from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import ProfilePostList from "../components/ProfilePostList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../config";

const ProfileView = () => {
  const profileImagePath = `${API}/media/profile/`;
  let { profileName } = useParams();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getProfile(profileName);
  }, [profileName]);

  const getProfile = async (profile) => {
    try {
      const response = await axios.get(`/users/${profile}`);
      if (response.data.length !== 0) setData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoaded(true);
    }
  };
  return (
    <div>
      <Header location="Your profile" />
      {loaded && (
        <Profile data={data} imgPath={profileImagePath + data.imageLocation} />
      )}
      <ProfilePostList />
    </div>
  );
};

export default ProfileView;
