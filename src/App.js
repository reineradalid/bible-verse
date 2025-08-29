import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import bibleImg from "./img/bible-2.png";
import "./styles.css";
import { verses } from "./verses";

const moods = {
  Peaceful: "#E6F3FF",
  Hopeful: "#FFF5E6",
  Grateful: "#F3FFE6",
  Anxious: "#FFE6E6",
};

function App() {
  const [mood, setMood] = useState("Peaceful");

  const getRandomVerse = (currentMood) => {
    const moodVerses = verses[currentMood] || [];
    if (moodVerses.length === 0) return { text: "No verses available.", book: "" };
    const randomIndex = Math.floor(Math.random() * moodVerses.length);
    return moodVerses[randomIndex];
  };

  const [verse, setVerse] = useState(getRandomVerse(mood));

  // Update verse whenever mood changes
  useEffect(() => {
    setVerse(getRandomVerse(mood));
  }, [mood]);

  const handleNewVerse = () => {
    setVerse(getRandomVerse(mood));
  };

  return (
    <>
    <div
  className="app-container"
  style={{ backgroundColor: moods[mood] }}
>
  <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
  className="bibleContainer"
  
>
  {/* Bible image */}
  <img
    src={bibleImg}
    alt="Open Bible"
   className="my-element" />

  {/* Verse overlay inside the image */}
  <div className="verse-container">
    {/* Left page */}
    <div className="verse-left">
      <p className="verse-text">{verse.text}</p>
    </div>

    {/* Right page */}
    <div className="verse-right">
      <p className="book-signature">{verse.book}</p>
    </div>
  </div>
</motion.div>

<div className="buttons">
  <label style={{color:"gray"}}>select your mood</label>
  <select
    value={mood}
    onChange={(e) => setMood(e.target.value)}
    className="custom-button"
  >
    {Object.keys(moods).map((m) => (
      <option key={m} value={m}>
        {m}
      </option>
    ))}
  </select>

  <button onClick={handleNewVerse} className="custom-button">
    New Verse
  </button>
</div>
      
    </div>
  
      </>
  );
}

export default App;
