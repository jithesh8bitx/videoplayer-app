import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { uploadAllVideo } from "../services/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add({ setUploadVideoStatus }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [videos, setVideos] = useState({
    id: "",
    caption: "",
    url: "",
    embedLink: "",
  });

  const embedVideoLink = (e) => {
    const { value } = e.target;
    const link = `https://www.youtube.com/embed/${value.slice(-11)}`;
    setVideos({ ...videos, embedLink: link });
  };

  const handleUpload = async () => {
    const { id, caption, url, embedLink } = videos;
    if (!id || !caption || !url || !embedLink) {
      toast.warning("Please fill all the fields");
    } else {
      const response = await uploadAllVideo(videos);
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        setUploadVideoStatus(response.data);
        toast.success(`${response.data.caption} is succesfully uploaded`);
        setVideos({
          id: "",
          caption: "",
          url: "",
          embedLink: "",
        });
        handleClose();
      } else {
        toast.error("something went wrong. Try again !");
      }
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <h5>Upload New Video</h5>
        <button className="btn" onClick={handleShow}>
          <i className="fa-solid fa-cloud-arrow-up fs-5"></i>
        </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <i className="fa-solid fa-film me-2 text-warning"></i>Upload Videos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the following details</p>
          <form className="border border-secondary rounded p-2">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Video-ID"
                onChange={(e) => setVideos({ ...videos, id: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Video Caption"
                onChange={(e) =>
                  setVideos({ ...videos, caption: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Video Image Url"
                onChange={(e) => setVideos({ ...videos, url: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter YouTube Video link"
                onChange={(e) => embedVideoLink(e)}
              />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default Add;
