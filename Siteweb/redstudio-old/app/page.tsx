export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        color: "#f5f5f5",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          🎤 RedStudio API
        </h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#bbb" }}>
          Backend API is running on port 3001
        </p>

        <div
          style={{
            background: "rgba(196, 30, 58, 0.1)",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid rgba(196, 30, 58, 0.3)",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>📚 API Endpoints</h2>

          <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: "bold", color: "#C41E3A" }}>
              Spotify Releases:
            </p>
            <code
              style={{
                background: "#1a1a1a",
                padding: "0.5rem",
                borderRadius: "4px",
                display: "block",
                marginTop: "0.5rem",
              }}
            >
              GET /api/releases/spotify/[artistId]
            </code>
          </div>

          <div>
            <p style={{ fontWeight: "bold", color: "#C41E3A" }}>
              SoundCloud Releases:
            </p>
            <code
              style={{
                background: "#1a1a1a",
                padding: "0.5rem",
                borderRadius: "4px",
                display: "block",
                marginTop: "0.5rem",
              }}
            >
              GET /api/releases/soundcloud/[username]
            </code>
          </div>
        </div>

        <p style={{ marginTop: "2rem", color: "#999" }}>
          Documentation disponible dans le README.md
        </p>
      </div>
    </main>
  );
}
