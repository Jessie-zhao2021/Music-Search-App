import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { GetTop50Album } from '../api/apis';

function Top50Album(){

    const [ Top50Album, setTop50Album ]   = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
    const navigateTo = useNavigate();

  
    useEffect( () => {
      GetTop50Album((data) => {
        setTop50Album( data );
        setLoading( false ); 
      }, (err) => {
        setError( err );
        setLoading( false );
      });
    }, [] ); 

    if( error ){
        return <strong>There was loading your results. Please try again later.</strong>;
    }

    return (
        <div>
          {/* <div className='top50album-p'>Top 50 Album</div>  */}
          <div className='results'>
            {
            loading 
            ?
            <p className='loading-content'>Loading results...</p>
            :
            Top50Album.map( m => (
                <div className='album' key={m.idAlbum}>             
                <img 
                    className='poster'
                    src={m.strAlbumThumb ? m.strAlbumThumb : 'https://www.publicdomainpictures.net/pictures/330000/velka/image-1586763209WNr.jpg'}
                    alt={m.strAlbum} 
                    // key={m.id}
                    onClick={ () => navigateTo(`/album/${m.idAlbum}`) }
                /> 
                
                <div className="album-lable" >
                    { m.strAlbum } ({ m.intYearReleased })<br/>
                    <p>{ m.strArtist }</p>

                </div>
                </div>
            )
            )
            }
          </div>
      </div>
      )    

};

export default Top50Album;