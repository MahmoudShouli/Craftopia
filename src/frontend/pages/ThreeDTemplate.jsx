import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModelViewer from "../components/viewer/ModelViewer";
import { toast } from "react-toastify";

const ThreeDTemplate = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fileExists, setFileExists] = useState(true);

  const modelUrl = state?.modelUrl;

  useEffect(() => {
    if (!modelUrl) {
      setFileExists(false);
      toast.error("❌ No model URL provided.");
      return;
    }

    // Try fetching the file
    fetch(modelUrl, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) {
          setFileExists(false);
          toast.error("🚫 No file to render");
        }
      })
      .catch((err) => {
        console.error("Error checking model file:", err);
        setFileExists(false);
        toast.error("🚫 No file to render");
      });
  }, [modelUrl]);

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#6a380f",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ← Go Back
      </button>

      {fileExists && modelUrl ? (
        <ModelViewer modelUrl={modelUrl} />
      ) : (
        <div style={{ marginTop: "3rem", fontSize: "1.25rem" }}>
          ❌ No model found for this template.
        </div>
      )}
    </div>
  );
};

export default ThreeDTemplate;
