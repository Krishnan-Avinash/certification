import { useState } from "react";

export default function SongList({ songs, onPlay }) {
  const [playingId, setPlayingId] = useState(null);

  const handlePlayPause = (song) => {
    if (playingId === song._id) {
      setPlayingId(null);
      onPlay(null); // Pause
    } else {
      setPlayingId(song._id);
      onPlay(song); // Play
    }
  };

  return (
    <div className="grid gap-4">
      {songs.map((song) => (
        <div
          key={song._id}
          className="p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-md flex justify-between items-center hover:bg-white/20 transition"
        >
          <div>
            <h2 className="text-white text-lg font-semibold">{song.title}</h2>
            <p className="text-gray-300 text-sm">{song.artist}</p>
          </div>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              playingId === song._id
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            onClick={() => handlePlayPause(song)}
          >
            {playingId === song._id ? "Pause ⏸️" : "Play ▶️"}
          </button>
        </div>
      ))}
    </div>
  );
}
