'use client'

import React, { useState } from "react";

const ToggleTextImage = () => {
  const [view, setView] = useState(1);
  const [inputText, setInputText] = useState("Golden Lion");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [altText, setAltText] = useState("Drinking at this bar");

  const handleToggle = () => {
    setView(view === 1 ? 2 : 1);
    setAltText(view === 1 ? "Moving to this bar" : "Drinking at this bar");
  };

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

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <img
          src={
            view === 1
              ? "https://cdn.dribbble.com/users/769413/screenshots/2403227/beerguy3.gif"
              : "https://media.tenor.com/PCXyUgpZAOkAAAAM/run-fat.gif"
          }
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
        </>
      )}
    </div>
  );
};

// Styles for black background and white text
const containerStyle = {
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "left",
  margin: "20px",
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

export default ToggleTextImage;
