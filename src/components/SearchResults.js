import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SearchAlbum } from '../api/apis';
import AlbumFace from './AlbumFace';
import { getLikedAlbumIds } from '../api/likeAlbum';

function SearchResults() {

  const params = useParams();

  const [ results, setResults ]   = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ]     = useState( null );

  useEffect( () => {
    const likedAlbumIds = getLikedAlbumIds();
    
    SearchAlbum( params.query, (data) => {
        data.album.forEach(m => {
            if (likedAlbumIds.includes(m.idAlbum)) {
                m['liked'] = true;
            }
        });
        setResults( data.album );
        setLoading( false ); 
      }, (err)=>{
        setError( err );
        setLoading( false );
      }
    ) 
  }, [params.query] );  

  if( error ){
    return <p className='loading-content'>There was loading your results. Please try again later.</p>;
  }

  if( results === null ){ 
    return <p className='loading-content'> Something wrong loading your results. Please check Artist full name...</p>;
    
  }
  
  return (
    <div>
      <p className='searchResults-p'>Albums for '{ params.query }'...</p>
      <div className='results'>
        {
          loading 
          ?
          <p>Loading ...</p>
          :
          results.map( m => (
            <AlbumFace album={m} />
          )
        )
        }
      </div>
    </div>
  );

}; 

export default SearchResults;
