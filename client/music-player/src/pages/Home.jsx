import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import SongList from "../components/SongList";
import AudioPlayer from "../components/AudioPlayer";

const staticSongs = [
  {
    _id: "1",
    title: "Emphasize",
    artist: "Dezzi boy",
    filePath: "/songs/song1.mp3",
  },
  {
    _id: "2",
    title: "Bring Me",
    artist: "Navinkumar",
    filePath: "/songs/song2.mp3",
  },
  {
    _id: "3",
    title: "Believer",
    artist: "Imagine Dragons",
    filePath: "/songs/song3.mp3",
  },
  {
    _id: "4",
    title: "Ocean Drive",
    artist: "Duke Dumont",
    filePath: "/songs/song4.mp3",
  },
  {
    _id: "5",
    title: "Blinding Lights",
    artist: "The Weeknd",
    filePath: "/songs/song5.mp3",
  },
  {
    _id: "6",
    title: "Shape of You",
    artist: "Ed Sheeran",
    filePath: "/songs/song6.mp3",
  },
  {
    _id: "7",
    title: "Ocean Drive",
    artist: "Duke Dumont",
    filePath: "/songs/song7.mp3",
  },
  {
    _id: "8",
    title: "I'm the Girl",
    artist: "Wild Heart",
    filePath: "/songs/song8.mp3",
  },
  {
    _id: "9",
    title: "Little Shire Must Sleep Too",
    artist: "Stephen Salvati",
    filePath: "/songs/song9.mp3",
  },
  {
    _id: "10",
    title: "Ocean Drive",
    artist: "Duke Dumont",
    filePath: "/songs/song10.mp3",
  },
  {
    _id: "11",
    title: "The Adventures of Mr.Hardy",
    artist: "Roman Dudchik",
    filePath: "/songs/song11.mp3",
  },
  {
    _id: "12",
    title: "Shape of You",
    artist: "Ed Sheeran",
    filePath: "/songs/song12.mp3",
  },
  {
    _id: "13",
    title: "Saiyaara",
    artist: "Faheem Abdullah",
    filePath: "/songs/song13.mp3",
  },
  {
    _id: "14",
    title: "Flow",
    artist: "Dimond_Tunes, Loksil",
    filePath: "/songs/song14.mp3",
  },
  {
    _id: "15",
    title: "Laal Pari",
    artist: "Simar Kaur, Yo Yo Honey Singh",
    filePath: "/songs/song15.mp3",
  },
  {
    _id: "16",
    title: "Tu Hain Toh Main Hoon",
    artist: "Tanishk Bagchi, Afsana Khan",
    filePath: "/songs/song16.mp3",
  },
  {
    _id: "17",
    title: "Keejo Kesari Ke Laal",
    artist: "Lakhbir Singh Lakha",
    filePath: "/songs/song17.mp3",
  },
  {
    _id: "18",
    title: "Tera Ban Jaunga",
    artist: "Akhil Sachdeva, Tulsi Kumar",
    filePath: "/songs/song18.mp3",
  },
  {
    _id: "19",
    title: "Zamaana Lage",
    artist: "Shashwat Singh",
    filePath: "/songs/song19.mp3",
  },
  {
    _id: "20",
    title: "Churake",
    artist: "Kanika Kapoor, Vllen",
    filePath: "/songs/song20.mp3",
  },
  {
    _id: "21",
    title: "Ennai Sondham-Bhediya",
    artist: "Denniz Joseph, Rajesh G",
    filePath: "/songs/song21.mp3",
  },
  {
    _id: "22",
    title: "Apna Bana Le",
    artist: "Arijit Singh, Sachin-Jigar",
    filePath: "/songs/song22.mp3",
  },
  {
    _id: "23",
    title: "Ve Maahi",
    artist: "Arijit Singh, Asees Kaur",
    filePath: "/songs/song23.mp3",
  },
  {
    _id: "24",
    title: "Jhoome Jo Pathaan",
    artist: "Arijit Singh, Vishal Dadlani",
    filePath: "/songs/song24.mp3",
  },
];

export default function Home() {
  const [currentSong, setCurrentSong] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredSongs = staticSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white px-4 py-8">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6 border-b border-white/20 pb-4">
          <h1 className="text-4xl font-bold text-indigo-300">🎧 Audio Streamer</h1>
          <div className="text-right">
            <p className="text-sm text-gray-300">
              Logged in as <span className="font-semibold">{userEmail}</span>
            </p>
            <button
              onClick={handleLogout}
              className="mt-1 text-sm text-red-400 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search songs by title or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
        />

        <SongList songs={filteredSongs} onPlay={setCurrentSong} />
        {currentSong && <AudioPlayer song={currentSong} />}
      </div>
    </div>
  );
}
