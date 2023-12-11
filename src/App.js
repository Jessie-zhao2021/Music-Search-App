
import { Route, Routes, useParams, HashRouter as Router, Link } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import AlbumDetails from './components/AlbumDetails';
import Top50Tracks from './components/Top50Tracks';
import TrackDetails from './components/TrackDetails';
import Top50Album from './components/Top50Album';
import RenderlikedAlbums from './components/FavoriteAlbum';
import About from './components/About';
import './App.css';




function App(){

  return (
    <div>
      <Router>
        
        <nav className='nav'>
          <div className='menu-items'>          
            <Link to="/" className='menu-item'>Home</Link>
            <Link to="/Top50Album" className='menu-item'>Top Album</Link>
            <Link to="/Top50Tracks" className='menu-item'>Top Tracks</Link>
            <Link to="/FavoriteAlbum" className='menu-item'>My Favorite</Link>
            <Link to="/about" className='menu-item'>About</Link>
          </div>

        </nav>

        <Routes>

          <Route path="/" exact element={ <SearchForm /> } />
        
          <Route path="/search/:query" element={ <SearchResults /> } />

          <Route path="/FavoriteAlbum" element={ <RenderlikedAlbums /> } />
          
          <Route path="/album/:id" element = { <AlbumDetails />}/>

          <Route path='/Top50Album' element = { <Top50Album /> }/>

          <Route path='/Top50Tracks' element = { <Top50Tracks /> }/>

          <Route path="/track/:id" element = { <TrackDetails />}/>

          <Route path="/about" element = { <About />}/>
        
        </Routes>
      
      </Router>
      <div className='footer'> Copyright © 2023 jessiezhao1816@gmail.com </div>
    </div>
  );
}


export default App;

