import React, { useEffect, useState } from "react";

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.overlay}>
      {/* Logo / Brand */}
      <div style={styles.brand}>
        <div style={styles.logoRing}>
          <div style={styles.logoInner}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 10C8 10 12 8 16 8C20 8 24 10 24 10V22C24 22 20 24 16 24C12 24 8 22 8 22V10Z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M12 14L15 17L20 12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 style={styles.title}>
          <span style={{ color: "#a78bfa" }}>Next</span>Skills
        </h1>
        <p style={styles.tagline}>Level up your skills, one course at a time</p>
      </div>

      {/* Progress bar */}
      <div style={styles.progressWrap}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${Math.min(progress, 100)}%`,
            }}
          />
        </div>
        <p style={styles.progressLabel}>Loading your experience...</p>
      </div>

      <style>{`
        @keyframes spin-ring {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-logo {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.06); opacity: 0.85; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .splash-brand   { animation: fade-up 0.6s ease both; }
        .splash-tagline { animation: fade-up 0.6s 0.15s ease both; }
        .splash-bar     { animation: fade-up 0.6s 0.3s ease both; }
        .logo-ring-spin { animation: spin-ring 2.4s linear infinite; }
        .logo-pulse     { animation: pulse-logo 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    gap: "48px",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  logoRing: {
    width: 88,
    height: 88,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.15)",
    borderTopColor: "#a78bfa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "spin-ring 2.4s linear infinite",
    className: "logo-ring-spin",
  },
  logoInner: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "rgba(167,139,250,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "pulse-logo 2s ease-in-out infinite",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.02em",
    animation: "fade-up 0.6s ease both",
  },
  tagline: {
    margin: 0,
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.04em",
    animation: "fade-up 0.6s 0.15s ease both",
  },
  progressWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "220px",
    animation: "fade-up 0.6s 0.3s ease both",
  },
  progressTrack: {
    width: "100%",
    height: "3px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "99px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
    borderRadius: "99px",
    transition: "width 0.3s ease",
  },
  progressLabel: {
    margin: 0,
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.06em",
  },
};

export default SplashScreen;