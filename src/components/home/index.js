import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import * as authService from "../../services/auth-service"
import {useEffect, useState} from "react";
// import {useLocation, useParams} from "react-router-dom";
// import { findUserByCredentials } from "../../services/users-service";

const Home = () => {
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');
  const [user, setUser] = useState({}); 
  let userId = user._id;

  const findUser = async () => {
    try {
      const currentUser = await authService.profile();
      userId = currentUser._id;
      setUser(currentUser);
      console.log(userId);
    } catch (e) {
      console.log("No one logged in");
    }
  }

  const findTuits = () => {
    return service.findAllTuits()
        .then(tuits => setTuits(tuits))
    // if(userId) {
    //   return service.findTuitByUser(userId)
    //     .then(tuits => setTuits(tuits))
    // } else {
    //   return service.findAllTuits()
    //     .then(tuits => setTuits(tuits))
    // }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // eslint-disable-next-line
    let isMounted = true;
    await findUser();
    await findTuits();
    return () => {isMounted = false;}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTuit = () =>
      service.createTuit(userId, {tuit})
          .then(findTuits)

  const deleteTuit = (tid) =>
      service.deleteTuit(tid)
          .then(findTuits)

  return(
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        {
          userId &&
          <div className="d-flex">
            <div className="p-2">
              <img className="ttr-width-50px rounded-circle"
                   src={`../../images/${user.profilePhoto}`} alt='profile'/>
            </div>
            <div className="p-2 w-100">
              <textarea
                  onChange={(e) =>
                      setTuit(e.target.value)}
                placeholder="What's happening?"
                className="w-100 border-0"></textarea>
              <div className="row">
                <div className="col-10 ttr-font-size-150pc text-primary">
                  <i className="fas fa-portrait me-3"></i>
                  <i className="far fa-gif me-3"></i>
                  <i className="far fa-bar-chart me-3"></i>
                  <i className="far fa-face-smile me-3"></i>
                  <i className="far fa-calendar me-3"></i>
                  <i className="far fa-map-location me-3"></i>
                </div>
                <div className="col-2">
                  {/* eslint-disable-next-line */}
                  <a onClick={createTuit}
                     className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                    Tuit
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Tuits tuits={tuits} deleteTuit={deleteTuit} refreshTuits={findTuits}/>
    </div>
  );
};
export default Home;