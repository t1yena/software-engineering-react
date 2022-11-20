import React from "react";

const TuitStats = ({tuit, likeTuit,dislikeTuit}) => {
  return (
    <div className="row mt-2">
      <div className="col">
           <i className="far fa-message me-1"></i>
           {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col">
        <span onClick={() => likeTuit(tuit)} id="likes">
          {
            tuit.stats.likes > 0 &&
            <i className="fas fa-thumbs-up"></i>
          }
          {
            tuit.stats.likes <= 0 &&
            <i className="far fa-thumbs-up"></i>
          }
          <span>
            {tuit.stats && tuit.stats.likes}
          </span>
        </span>
      </div>

      <div className="col">
        <span onClick={() => dislikeTuit(tuit)} id="dislikes">
          {
            tuit.stats.dislikes > 0 &&
            <i className="fas fa-thumbs-down"></i>
          }
          {
            tuit.stats.dislikes <= 0 &&
            <i className="far fa-thumbs-down"></i>
          }
          <span>
            {tuit.stats && tuit.stats.dislikes}
          </span>
        </span>
      </div>

      <div className="col">
           <i className="far fa-inbox-out"></i>
         </div>
    </div>
  );
}
export default TuitStats