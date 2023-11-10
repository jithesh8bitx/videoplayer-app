import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteHistory, getAllHistory } from "../services/allAPI";
import { Button } from "react-bootstrap";

function WatchHistory() {
  const [history, setHistory] = useState([]);

  const watchHistory = async () => {
    const { data } = await getAllHistory();
    setHistory(data);
  };

  const removeHistory = async (id) => {
    await deleteHistory(id);
    watchHistory();
  };

  useEffect(() => {
    watchHistory();
  }, []);

  return (
    <>
      <div className="container mt-5 d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link
          to="/home"
          className="d-flex align-items-center"
          style={{ textDecoration: "none", color: "white", fontSize: "20px" }}
        >
          <i className="fa-solid fa-arrow-left fa-beat me-2"></i> Back to Home
        </Link>
      </div>
      <div className="container text-end mt-3">
        <Button variant="danger" onClick={() => removeHistory()}>
          Clear history
        </Button>
      </div>
      {history.length > 0 ? (
        <table className="table mt-3 mb-5 container">
          <thead>
            <tr>
              <th>#</th>
              <th>Caption</th>
              <th>URL</th>
              <th>Time Stamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.caption}</td>
                <td>
                  <a href={item.embedLink} target="blank">
                    {item.embedLink}
                  </a>
                </td>
                <td>{item.timeStamp}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeHistory(item.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="container text-center p-5 fs-4">
          <p>Nothing here !</p>
        </div>
      )}
    </>
  );
}

export default WatchHistory;
