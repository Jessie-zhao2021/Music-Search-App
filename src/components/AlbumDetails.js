import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import AlbumTrackList from './AlbumTrackList';
import { GetAlbumInfo } from '../api/apis';
  

function AlbumDetails(){

    const params = useParams()
    const [ music, setMusic ]  = useState( null );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
  
    useEffect( () => {
      GetAlbumInfo( params.id, (data) => {
        setMusic( data );
        setLoading( false ); 
      }, (err) => {
        setError( err );
        setLoading( false );
      });
    }, [params.id] );  


    if(loading) {
      return (<p className='loading-content'>loading...</p>);
    }

    if (error) {
      return (<p>error, please try again...</p>);
    }

   
    return (

      <div className='album-detail-page'>  

        <div className="album-detail">   
          <img className="album-detail-img" src={music.strAlbumThumb} alt={music.strAlbum}/>
          <AlbumTrackList albumId={ music.idAlbum }/>
        </div>
        
        <h4>Album Title: { music.strAlbum }</h4>
        <h4>Artist name: { music.strArtist }{music.idAlbum}</h4>
        <h4>Release Year: { music.intYearReleased }</h4>
        <h4>Album Description: </h4>
        <p>{ music.strDescriptionEN }</p>
        
      </div>    
    )
  }

export default AlbumDetails;