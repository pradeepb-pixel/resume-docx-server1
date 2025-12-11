"use client";

import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState({
    name: "",
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    certifications: "",
  });

  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    const response = await fetch(
      "https://resume-docx-server1.onrender.com/generate-docx",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      }
    );

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Resume.docx";
    a.click();

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>Resume Builder With Preview</h1>

      {/* INPUT FIELDS */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Full Name"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          onChange={(e) => setResume({ ...resume, name: e.target.value })}
        />
        <input
          placeholder="Title (e.g., Senior Consultant)"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          onChange={(e) => setResume({ ...resume, title: e.target.value })}
        />
        <textarea
          placeholder="Summary"
          rows={4}
          style={{ width: "100%", padding: "10px" }}
          onChange={(e) => setResume({ ...resume, summary: e.target.value })}
        />
        <textarea
          placeholder="Skills"
          rows={4}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          onChange={(e) => setResume({ ...resume, skills: e.target.value })}
        />
        <textarea
          placeholder="Experience"
          rows={4}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          onChange={(e) => setResume({ ...resume, experience: e.target.value })}
        />
        <textarea
          placeholder="Education"
          rows={2}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          onChange={(e) => setResume({ ...resume, education: e.target.value })}
        />
        <textarea
          placeholder="Certifications"
          rows={2}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          onChange={(e) =>
            setResume({ ...resume, certifications: e.target.value })
          }
        />
      </div>

      {/* PREVIEW SECTION */}
      <h2>Preview</h2>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#fafafa",
          marginBottom: "20px",
        }}
      >
        <h2>{resume.name}</h2>
        <h4 style={{ color: "#555" }}>{resume.title}</h4>

        <h3>Summary</h3>
        <p>{resume.summary}</p>

        <h3>Skills</h3>
        <p>{resume.skills}</p>

        <h3>Experience</h3>
        <p>{resume.experience}</p>

        <h3>Education</h3>
        <p>{resume.education}</p>

        <h3>Certifications</h3>
        <p>{resume.certifications}</p>
      </div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        style={{
          padding: "12px 24px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        {loading ? "Generating..." : "Download DOCX"}
      </button>
    </div>
  );
}



