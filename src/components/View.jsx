import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getAllVideos } from "../services/allAPI";

function View({ uploadVideoStatus }) {
  const [allVideos, setAllVideos] = useState([]);
  const [deleteVideoStatus, setDeleteVideoStatus] = useState(false);

  const getAllUploadedVideos = async () => {
    const response = await getAllVideos();
    setAllVideos(response.data);
  };

  useEffect(() => {
    getAllUploadedVideos();
    setDeleteVideoStatus(false);
  }, [uploadVideoStatus, deleteVideoStatus]);

  return (
    <div className="w-100 d-flex flex-wrap">
      {allVideos.length > 0 ? (
        allVideos.map((video) => (
          <VideoCard
            key={video.id}
            displayVideo={video}
            setDeleteVideoStatus={setDeleteVideoStatus}
          />
        ))
      ) : (
        <p>Nothing to display !</p>
      )}
    </div>
  );
}

export default View;
