'use client'

import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";

const S3TextManager = () => {
  const [inputText, setInputText] = useState("Golden Lion");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [altText, setAltText] = useState("Drinking at this bar");
  const [view, setView] = useState(1);  // Store toggle state (View 1 or View 2)

  // Configure AWS
  AWS.config.update({
  
  });

  const s3 = new AWS.S3();
  const bucketName = 'barcrawl-lancaster';

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAltTextChange = (e) => {
    setAltText(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAuth = () => {
    if (password === "1234") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleSaveToS3 = () => {
    const dataToSave = {
      inputText,
      view,  // Save the toggle status (view state)
    };

    const params = {
      Bucket: bucketName,
      Key: "stateData.json",  // Store both text and view state
      Body: JSON.stringify(dataToSave),  // Convert the data to a JSON string
      ContentType: "application/json",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading data: ", err);
      } else {
        console.log("Successfully uploaded data to S3", data);
      }
    });
  };

  const handleLoadFromS3 = () => {
    const params = {
      Bucket: bucketName,
      Key: "stateData.json",  // Load the state data
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.error("Error fetching data from S3: ", err);
      } else {
        const fileContent = JSON.parse(data.Body.toString("utf-8"));
        setInputText(fileContent.inputText);  // Load text data
        setView(fileContent.view);  // Load toggle state
      }
    });
  };

  useEffect(() => {
    // Load text data and toggle state from S3 when the component mounts
    handleLoadFromS3();
  }, []);

  const handleToggle = () => {
    const newView = view === 1 ? 2 : 1;
    setView(newView);
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <img
          src={view === 1 ? "https://cdn.dribbble.com/users/769413/screenshots/2403227/beerguy3.gif"
            : "https://media.tenor.com/PCXyUgpZAOkAAAAM/run-fat.gif"}
          alt={altText}
          style={imageStyle}
        />
        <p style={textStyle}>{inputText || "Default Text"}</p>
        <input
          type="text"
          value={altText}
          onChange={handleAltTextChange}
          style={altTextStyle}
          placeholder="Edit image description..."
        />
      </div>

      {!authenticated ? (
        <div style={authContainerStyle}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            style={passwordStyle}
          />
          <button onClick={handleAuth} style={authButtonStyle}>
            Submit
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Type something..."
            value={inputText}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <button onClick={handleToggle} style={toggleButtonStyle}>
            Toggle View
          </button>
          <button onClick={handleSaveToS3} style={saveButtonStyle}>
            Save to S3
          </button>
        </>
      )}
    </div>
  );
};

// Styles (same as previous)
const containerStyle = {
  textAlign: "left",
  margin: "20px",
  backgroundColor: "#000",
  color: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "500px",
};

const contentStyle = {
  marginBottom: "20px",
};

const imageStyle = {
  width: "100%",
  maxWidth: "300px",
  borderRadius: "8px",
  marginBottom: "10px",
};

const textStyle = {
  fontSize: "18px",
  color: "#fff",
  margin: "10px 0",
};

const inputStyle = {
  padding: "10px",
  marginBottom: "20px",
  fontSize: "16px",
  width: "90%",
  maxWidth: "400px",
  backgroundColor: "#222",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "5px",
  display: "block",
};

const altTextStyle = {
  padding: "10px",
  marginBottom: "10px",
  fontSize: "14px",
  width: "90%",
  maxWidth: "400px",
  backgroundColor: "#222",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "5px",
  display: "block",
};

const authContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const passwordStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "70%",
  maxWidth: "250px",
  backgroundColor: "#222",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: "5px",
};

const authButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  backgroundColor: "#28a745",
  color: "white",
  borderRadius: "5px",
};

const toggleButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  backgroundColor: "#007BFF",
  color: "white",
  borderRadius: "5px",
  marginTop: "20px",
};

const saveButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  border: "none",
  backgroundColor: "#ff9900",
  color: "white",
  borderRadius: "5px",
  marginTop: "20px",
};

export default S3TextManager;