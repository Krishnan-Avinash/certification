import { useEffect, useRef } from "react";

export default function AudioPlayer({ song }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef.current;

    // Ensure audio starts only when it's ready
    const handleCanPlay = () => {
      audioEl.play().catch((err) => {
        console.warn("Autoplay failed:", err.message);
      });
    };

    if (audioEl) {
      audioEl.pause(); // Stop any previous song
      audioEl.load(); // Load the new song
      audioEl.addEventListener("canplay", handleCanPlay);
    }

    return () => {
      if (audioEl) {
        audioEl.removeEventListener("canplay", handleCanPlay);
      }
    };
  }, [song]);

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-center text-white">
      <h2 className="text-xl font-bold mb-3 text-indigo-200">Now Playing</h2>
      <p className="mb-4 text-lg font-medium">{song.title}</p>
      <audio
        ref={audioRef}
        controls
        className="w-full rounded-lg bg-white/20"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <source src={song.filePath} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
  
}
