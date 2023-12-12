import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetTop50Tracks } from '../api/apis';

function Top50Tracks(){

    const [ top50Tracks, setTop50Tracks ]   = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
    const navigateTo = useNavigate();
  
    useEffect( () => {
        GetTop50Tracks((data) => {
          setTop50Tracks( data );
          setLoading( false ); 
        }, (err) => {
          setError( err );
          setLoading( false );
        })
    }, [] ); 

    if( error ){
        return <strong>There was loading your results. Please try again later.</strong>;
    }

    return (
        <div>
          {/* <div className='top50album-p'>Top Tracks   </div>  */}
          <div className='results'>
            {
              loading 
              ?
              <p className='loading-content'>Loading Top 50 Tracks...</p>
              :
              top50Tracks.map( t => (
                <div className='album'>             
                  <img 
                    className='poster'
                    src={t.strTrackThumb
                        ? 
                        t.strTrackThumb
                        : 
                        'https://www.publicdomainpictures.net/pictures/330000/velka/image-1586763209WNr.jpg'}
                    alt={t.strTrack} 
                    onClick={ () => navigateTo(`/track/${t.idTrack}`) }
                  /> 
                  
                  <div className='album-lable'>
                    { t.strTrack } <br />
                    <p>{ t.strArtist }</p>                                         
                  </div>
                </div>
              )
            )
            }
          </div>
        </div>
      )    
}

export default Top50Tracks;