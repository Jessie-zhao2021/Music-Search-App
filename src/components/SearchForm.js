import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CurrentTrendingAlbum from './CurrentTrendingAlbum';
import CurrentTrendingSingles from './CurrentTrendingSingles';

function SearchForm( ){

  const [ searchText, setSearchText ] = useState( '' );
  const navigateTo = useNavigate();

  function handleSubmit( ev ){
    ev.preventDefault();
    navigateTo(`/search/${ searchText }`)
  } 

  return (
    <>
      <div className='search-bar-div'>
        <h1 className='title'>Music Searchr</h1>
        <form className='search-bar' onSubmit={ handleSubmit }>
          <input type="text" onChange={ ev => setSearchText(ev.target.value)} placeholder='Search artist name ...'/>
          <button>
            <img src='https://purepng.com/public/uploads/medium/search-icon-sl7.png' alt='search_png'/>
          </button>
        </form>

        <div className='button-div'>
          <button className='top-button' onClick={ () => navigateTo('/Top50Album')}>Top 50 Ablums</button>
          <button className='top-button' onClick={ () => navigateTo('/Top50Tracks')}>Top 50 Tracks</button>
        </div>
        <br />
        <h3>Trending Ablum</h3>
      </div>
      
      <CurrentTrendingAlbum country='us'/>
      <CurrentTrendingSingles />
      <CurrentTrendingAlbum country='gb'/>
      <CurrentTrendingAlbum country='de'/>
      {/* <CurrentTrendingAlbum country='fr'/>       */}

    </>    
  );

}
  
export default SearchForm;