
import Axios from 'axios'
import React, { useState } from "react"

import './App.css';

const mock = [
  { url: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75" },
  { url: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75" },
  { url: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75" },
  { url: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75" },
  { url: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/102709/ntorq-125-right-front-three-quarter.jpeg?isig=0&q=75" },
]

const BACKEND_URL = "https://imgcap1720.azurewebsites.net"
function App() {
  const [caption, setCaption] = useState("")
  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [searches, setSearches] = useState(null);

  const uploadImage = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);

    await Axios.post(BACKEND_URL + "/upload", formData)
      .then((response) => {
        setCaption(response.data.caption)
      }).catch(console.error)
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await Axios.get(BACKEND_URL + `/search?caption=${formData.get("caption")}`).then(res => {
      setSearches(res.data);
    }).catch(console.error)
  }


  return (
    <div >
      <form onSubmit={uploadImage}>
        <input
          name="file"
          type="file"
          id="file"
          onChange={handleChange}
        />
        <button type="submit">UPLOAD IMAGE</button>
      </form>

      {file !== "" && <img width={500} src={file} />}
      {caption !== "" && <div>
        <h1>Caption</h1>
        <p>{caption}</p></div>}


      <div>
        <h3>Search images</h3>

        <form id="search" onSubmit={handleSearch}>
          <label htmlFor="caption">Caption of Image</label>
          <input
            name="caption"
            type="text"
            id="caption"

          />

          <button type="submit">Search</button>
        </form>

        {searches !== null &&
          <div style={{ display: 'flex', flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>

            {searches.map((image) => <img src={image.url} alt="Image" width="400" />)}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
