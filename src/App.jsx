import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [keyword,setKeyword] = useState("");
  const [tracks,settracks] = useState([]);
  const [isloading,setIsLoading] = useState(true);

  const getTracks= async ()=>{
    setIsLoading(true);
    let data = await fetch(`https://v1.nocodeapi.com/vaishnavivarma3938/spotify/RwpKgeLAUGsBRaFr/search?q=${keyword===""?"trending":keyword}&type=track`);
    let convertedData = await data.json();
    /*console.log(convertedData.tracks.items);*/
    settracks(convertedData.tracks.items);
    setIsLoading(false);
  };

  useEffect(()=>{
    getTracks();

  },[]);
   return (
    <>
    <nav className="navbar navbar-dark navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      SPOTIFY
    </a>
    <button
      onClick={getTracks}
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
   >
      <span className="navbar-toggler-icon" />
   </button>
    <div className="collapse navbar-collapse deflex justify-content-center" id="navbarSupportedContent">
     
      
        <input value={keyword}
        onChange={event=>{setKeyword(event.target.value)}}
          className="form-control me-2 w-75"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button onClick={getTracks} className="btn btn-outline-success" type="submit">
          Search
        </button>
     
    </div>
  </div>
</nav>
<div className="container">
  <div className={`row ${isloading?"":"d-none"}`}>
    <div className="col-12 py-5 text-center">
    <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>

    </div>
  </div>
  <div className="row">
    
    {
      tracks.map((element)=>{
        return <div key = {element.id} className="col-lg-3 col-md-6 py-2">
          <div className="card">
  <img src={element.album.images[0].url} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{element.name}</h5>
    <p className="card-text">
     Artist : {element.album.artists[0].name}
    </p>
    <p className="card-text">
     Release Date : {element.album.release_date}
    </p>
    <audio src = {element.preview_url} controls className='w-100'></audio>
  </div>
</div>

        </div>
      })
    }

  </div>

</div>
    </>
  )
}

export default App
