import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SearchAlbum } from '../api/apis';


function SearchResults(){

  const params = useParams();
  const navigateTo = useNavigate();

  const [ results, setResults ]   = useState( [] );
  const [ loading, setLoading ] = useState( true );
  const [ error, setError ]     = useState( null );

  useEffect( () => {
    SearchAlbum( params.query, (data) => {
        setResults( data.album );
        setLoading( false ); 
      }, (err)=>{
        setError( err );
        setLoading( false );
      }
    ) 
  }, [params.query] );  

  if( error ){
    return <strong>There was loading your results. Please try again later.</strong>;
  }

  if( results === null ){ 
    return <strong>There was loading your results. Please check Artist name.</strong>;
  }
  
  return (
    <div>
      <h3>Results for "{ params.query }"</h3>
      <div className='results'>
        {
          loading 
          ?
          <p>Loading results...</p>
          :
          results.map( m => (
            <div className='album' key={m.idAlbum}>             
              <img 
                className='poster'
                src={m.strAlbumThumb ? m.strAlbumThumb : 'https://avatar.amuniversal.com/user_avatars/avatars_gocomicsver3/3015000/3015243/No-Photo-Available.jpg'}
                alt={m.strAlbum} 
                // key={m.id}
                onClick={ () => navigateTo(`/album/${m.idAlbum}`) }
              /> 
             
              <div className="album-lable" onClick={ () => navigateTo(`/album/${m.idAlbum}`)}>
                    { m.strAlbum } ({ m.intYearReleased })<br/>
                    <p>{ m.strArtist }</p>

              </div>
            </div>
          )
        )
        }
      </div>
    </div>
  );

}; // SearchResults()

export default SearchResults;
