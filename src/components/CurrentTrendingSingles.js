import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function CurrentTrendingSingles(){

    const MUSIC_SEARCH_BASE_URL = 'https://www.theaudiodb.com/api/v1/json';
    const MUSIC_SEARCH_API_KEY = '523532';

    const [ CurrentTrendingSingles, setCurrentTrendingSingles ]   = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
    const navigateTo = useNavigate();

  
    useEffect( () => {
        loadCurrentTrendingSingles();
    }, [] ); 

    function loadCurrentTrendingSingles(){
    
        axios.get(`${MUSIC_SEARCH_BASE_URL}/${MUSIC_SEARCH_API_KEY}/trending.php?country=us&type=itunes&format=Singles`)
          .then(res => {
            console.log( 'trending singles data::::::::::::', res.data );
            setCurrentTrendingSingles( res.data.trending );
            setLoading( false ); 
          })
          .catch(err => {
            console.warn('Error loading search results', err);
            setError( err );
            setLoading( false );
          });   
    };

    if( error ){
        return <strong>There was loading your results. Please try again later.</strong>;
    }
    if ( CurrentTrendingSingles === null  ){
        return console.log('search results of US CurrentTrendingSingles is null!');
    }

    return (
        <div>
            <div className='results'>
            {
              loading 
              ?
              <p>Loading Current Trending Singles...</p>
              :
              CurrentTrendingSingles.map( t => (
                <div className='movie'>             
                  <img 
                    className='poster'
                    src={t.strTrackThumb
                        ? 
                        t.strTrackThumb
                        : 
                        'https://www.publicdomainpictures.net/pictures/330000/velka/image-1586763209WNr.jpg'}
                    alt={t.strTrack} 
                    // key={m.id}
                    onClick={ () => navigateTo(`/track/${t.idTrack}`) }
                  /> 
                 
                  <h3> { t.strTrack } </h3>
                  <h5>
                    Artist: { t.strArtist }
                    <br/>
                    Album: { t.strAlbum }
                  </h5>
                </div>
              )
            )
            }
            </div>
        </div>
    )


};

export default CurrentTrendingSingles;