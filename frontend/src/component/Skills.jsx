import React, { useState } from "react";
import { skillList } from "../services/skillList";

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleOpen = (skill) => {
    setSelectedSkill(skill);
  };

  const handleClose = () => {
    setSelectedSkill(null);
  };

  return (
    <>
      <section
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <h2>Skills</h2>

        <div style={styles.grid}>
          {skillList.map((s) => (
            <div
              key={s.tech}
              className="glass"
              style={{
                ...styles.card,
                border:
                  hovered === s.tech
                    ? "2px solid rgb(35 60 120 / 85%)"
                    : "1px solid transparent",
              }}
              onClick={() => handleOpen(s)}
              onMouseEnter={() => setHovered(s.tech)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={s.image}
                alt={s.tech}
                style={{ width: "50px", marginBottom: "10px", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Modal */}
      {selectedSkill && (
        <div style={styles.overlay}>
          <div className="glass" style={styles.modal}>
            <h3>{selectedSkill.tech}</h3>

            <img
              src={selectedSkill.image}
              alt={selectedSkill.tech}
              style={{ width: "60px", margin: "10px 0" }}
            />

            <p style={{ marginTop: "10px", lineHeight: "1.6" }}>
              {selectedSkill.description || "No description available."}
            </p>

            <button style={styles.button} onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
  },

  /* 🔥 Overlay like your screenshot */
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  /* 💎 Glass modal */
  modal: {
    width: "400px",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",

    background:
      "linear-gradient(177deg, rgb(35 60 120 / 85%), rgba(200, 214, 235, 0.6))",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    color: "#fff",
  },

  button: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Skills;