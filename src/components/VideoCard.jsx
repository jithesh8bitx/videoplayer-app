import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { addToHistory, deleteVideo } from "../services/allAPI";

function VideoCard({ displayVideo, setDeleteVideoStatus }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);

    const { caption, embedLink } = displayVideo;
    const today = new Date();
    let timeStamp = new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(today);

    let videoDetails = {
      caption,
      embedLink,
      timeStamp,
    };

    await addToHistory(videoDetails);
  };

  const deleteTheVideo = async (id) => {
    await deleteVideo(id);
    setDeleteVideoStatus(true);
  };

  const dragStart = (e, id) => {
    console.log(`card that dragged id ${id}`);
    //to transfer id from videoCard to category
    e.dataTransfer.setData("videoID", id);
  };

  return (
    <>
      <Card
        style={{ width: "22rem" }}
        className="me-3 mb-3"
        draggable
        onDragStart={(e) => dragStart(e, displayVideo.id)}
      >
        <Card.Img
          draggable="false"
          variant="top"
          src={displayVideo.url}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
          onClick={handleShow}
        />
        <Card.Body style={{ height: "72px" }}>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <h6>{displayVideo.caption}</h6>
            <Button
              onClick={() => deleteTheVideo(displayVideo.id)}
              variant="danger"
            >
              <i className="fa-solid fa-trash-can"></i>
            </Button>
          </Card.Title>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayVideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="320px"
            src={displayVideo.embedLink + "?autoplay=1"}
            title={displayVideo.caption}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default VideoCard;
