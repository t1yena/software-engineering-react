import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Routes, Route} from "react-router";
import {useEffect, useState} from "react";
import * as service from "../../services/auth-service"
import MyTuits from "./my-tuits";
import Tuits from "../tuits";
import MyLikes from "./my-likes";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  
  useEffect(() => {
    (async function() {
      try {
        const user = await service.profile();
        setProfile(user);
      } catch (e) {
        navigate('/login');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logout = () => {
    service.logout()
      .then(() => navigate('/login'));
  }

  return(
    <div className="ttr-profile">
      {/* <div className="border border-bottom-0">
        <h4 className="p-2 mb-0 pb-0 fw-bolder">NASA<i className="fa fa-badge-check text-primary"></i></h4>
        <span className="ps-2">67.6K Tuits</span>
        <div className="mb-5 position-relative">
          <img className="w-100" src="../images/nasa-profile-header.jpg" alt="profile"/>
          <div className="bottom-0 left-0 position-absolute">
            <div className="position-relative">
              <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                   src="../images/nasa-3.png" alt="profile"/>
            </div>
          </div>
          <Link to="/profile/edit"
                className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
            Edit profile
          </Link>
        </div>

        <div className="p-2">
          <h4 className="fw-bolder pb-0 mb-0">
          {profile.name}<i className="fa fa-badge-check text-primary"></i>
          </h4>
          <h6 className="pt-0">@{profile.username}</h6>
          <p className="pt-2">
            There's space for everybody. Sparkles
          </p>
          <p>
            <i className="far fa-location-dot me-2"></i>
            Pale Blue Dot
            <i className="far fa-link ms-3 me-2"></i>
            <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
            <i className="far fa-balloon ms-3 me-2"></i>
            Born October 1, 1958
            <br/>
            <i className="far fa-calendar me-2"></i>
            Joined December 2007
          </p>
          <b>178</b> Following
          <b className="ms-4">51.1M</b> Followers
          <ul className="mt-4 nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/profile/mytuits"
                    className="nav-link active">
                Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/tuits-and-replies"
                    className="nav-link">
                Tuits & replies</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/media"
                    className="nav-link">
                Media</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/likes"
                    className="nav-link">
                Likes</Link>
            </li>
          </ul>
        </div>
        <div className="m-2"> */}
        <h4>{profile.username}</h4>
        <h6>@{profile.username}</h6>
         <button 
          className="btn btn-primary"
          onClick={logout}>
          Logout</button>
          <ul className="mt-4 nav nav-pills nav-fill">
            <li className="nav-item">
              <Link to="/profile/mytuits"
                    className="nav-link active">
                My Tuits</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/tuits-and-replies"
                    className="nav-link">
                Tuits & replies</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/media"
                    className="nav-link">
                Media</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile/mylikes"
                    className="nav-link">
                Likes</Link>
            </li>
          </ul>
        {/* </div>
      </div> */}
      <Routes>
        <Route path="/mytuits"
               element={<MyTuits/>}/>
        {/* <Route path="/tuits-and-replies"
               element={<TuitsAndReplies/>}/> */}
        {/* <Route path="/media"
               element={<Media/>}/> */}
        <Route path="/mylikes"
               element={<MyLikes/>}/>
      </Routes>
      <Tuits/>
    </div>
    
  );
}
export default Profile;