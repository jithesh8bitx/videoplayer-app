import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  addCategory,
  deleteCategory,
  getAVideo,
  getAllCategory,
  updateCategory,
} from "../services/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoCard from "./VideoCard";

function Category() {
  const [show, setShow] = useState(false);

  const [categoryName, setCategoryName] = useState([]);
  const [category, setCategory] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddCategory = async () => {
    if (categoryName) {
      let rbody = {
        categoryName,
        videos: [],
      };
      const response = await addCategory(rbody);
      handleClose();
      setCategoryName("");
      getAllCategories();
      if (response.status >= 200 && response.status < 300) {
        toast.success("Category added succesfully");
      } else {
        toast.error("something went wrong !");
      }
    } else {
      toast.warning("Please enter category name !");
    }
  };

  const getAllCategories = async () => {
    const { data } = await getAllCategory();
    setCategory(data);
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    getAllCategories();
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const videoDrop = async (e, id) => {
    let videoID = e.dataTransfer.getData("videoID");
    const { data } = await getAVideo(videoID);
    let selectedCategory = category.find((item) => item.id === id);
    selectedCategory.videos.push(data);
    await updateCategory(id, selectedCategory);
    getAllCategories();
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="d-grid ms-3">
        <button className="btn btn-warning" onClick={handleShow}>
          Add New Category
        </button>
      </div>
      {category.length > 0 ? (
        category.map((item) => (
          <div
            className="m-3 rounded border p-3"
            key={item.id}
            onDragOver={(e) => dragOver(e)}
            onDrop={(e) => videoDrop(e, item.id)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h6>{item.categoryName}</h6>
              <Button onClick={() => removeCategory(item.id)} variant="danger">
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            </div>
            <Row>
              <Col>
                {item.videos.length > 0 ? (
                  item.videos.map((item) => (
                    <VideoCard displayVideo={item} className="w-100" />
                  ))
                ) : (
                  <p>Nothing here !</p>
                )}
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <p>Nothing here !</p>
      )}
      <Modal show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group controlId="cn">
              <Form.Control
                onChange={(e) => setCategoryName(e.target.value)}
                type="text"
                placeholder="Enter categpry name"
              />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default Category;
