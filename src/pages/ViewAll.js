import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./viewall.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_SERVER } from "../URLConfig";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const ViewAll = () => {
  const [allFiles, setAllFiles] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  let [color, setColor] = useState("black");

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${BACKEND_SERVER}/showAllData`)
      .then((res) => {
        const presentTime = new Date().getTime();
        const results = res.data.datas.filter((item) => {
          return item.expiryDate > presentTime;
        });
        setAllFiles(results);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renewExpiry = async (id) => {
    const newExpiryAt = new Date().getTime() + 86400000;
    await fetch(`${BACKEND_SERVER}/renewExpiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        newExpiryAt: newExpiryAt,
      }),
    })
      .then((res) => {
        res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const override = css`
     margin-top: 140px;
     margin-right: 60px;
  `;
  const redirect = (id) => {
    navigate(`/file/${id}`);
  };

  const deleteFile = async (id) => {
    await fetch(`${BACKEND_SERVER}/deleteFile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        res.json();
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="AllFilesPage">
        <h1>All Files</h1>

        <Link to="/" className="link">
          <button>+ Create New</button>
        </Link>
        <div className="filesContainer">
          {isLoading ? (
            <ClipLoader
              css={override}
              color={color}
              loading={isLoading}
              size={50}
            />
          ) : (
            allFiles.map((file) => {
              return (
                <div className="fileCard">
                  <div className="fileName">
                    <h4
                      onClick={() => {
                        redirect(file._id);
                      }}
                    >
                      {file.name}
                    </h4>
                  </div>
                  <div>
                    {" "}
                    <button
                      className="btn renew"
                      onClick={() => {
                        renewExpiry(file._id);
                        toast.success("Renewed for Next 24 hours!", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                    >
                      Renew
                    </button>
                    <button
                      className="btn delete "
                      onClick={() => {
                        deleteFile(file._id);
                        toast.success("Deleted !", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ViewAll;
