import { useEffect, useState } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/26br.jpg"
  });

  const [allMeme, setAllMeme] = useState([]);

  useEffect(() => {
    // fetch memes by calling api, setting dependencies array to [] to only call API once
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((memeData) => setAllMeme(memeData.data.memes));
  }, []);

  function getMemeImage() {
    let randomIndex = Math.floor(Math.random() * allMeme.length);
    let randomMeme = allMeme[randomIndex];

    setMeme((previousMeme) => {
      return {
        ...previousMeme,
        randomImage: randomMeme.url
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((previousMeme) => {
      return {
        ...previousMeme,
        [name]: value
      };
    });
  }
  return (
    <main>
      <div className="form">
        <input
          className="form--input"
          placeholder="Top text"
          name="topText"
          type="text"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form--input"
          placeholder="Bottom text"
          name="bottomText"
          type="text"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" type="submit" onClick={getMemeImage}>
          Get a new meme image{" "}
          <span role="img" aria-label="picture">
            🖼️
          </span>
        </button>
      </div>
      <div className="meme">
        <img className="meme--image" src={meme.randomImage} alt="meme-img" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
