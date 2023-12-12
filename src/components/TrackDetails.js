import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { GetTrackDetails } from '../api/apis';

function TrackDetails(){

    const MUSIC_SEARCH_BASE_URL = 'https://www.theaudiodb.com/api/v1/json';
    const MUSIC_SEARCH_API_KEY = '523532';

    
    const params = useParams();
    console.log( `params`, params );
    const navigateTo = useNavigate();

    const [ track, setTrack ]   = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );

  
    useEffect( () => {
        GetTrackDetails(params.id, (data) => {
            setTrack( data );
            setLoading( false );
        }, (err) => {
            setError( err );
            setLoading( false );
        });
    }, [params.id] ); 


    if( error ){
        return <strong>There was loading your results. Please try again later.</strong>;
    }

    return (
        <div>
            <div className="track-detail-vedio">
               <img className="track-detail-img" src={track.strTrackThumb ? 
                    track.strTrackThumb : 
                    'https://www.publicdomainpictures.net/pictures/330000/velka/image-1586763209WNr.jpg'} 
                    alt={track.strTrack} />

                {track.strMusicVid ? <ReactPlayer max-width={550} height={400} url={track.strMusicVid} /> : ""}    
            </div>
            <div className='track-detail-info'>
                {/* {track.strTrack3DCase ? <img src={track.strTrack3DCase} alt={track.strTrack} /> : ""} */}
                <div className='track-detail-info-left'>
                    <h2>{track.strTrack}</h2>
                    <h4>
                        <br/> Artist: {track.strArtist} <br/>               
                        <br/> Album: {track.strAlbum} <br/>
                        <br/> Style: {track.strStyle} <br/>
                        <br/> Genre: {track.strGenre} <br/>
                        <br/> TotalListeners:  {track.intTotalListeners} <br/>
                        <br/> Vedio Director: {track.strMusicVidDirector} <br/>
                        <br/> Vedio: <a className="track-link" href={track.strMusicVid} >{track.strMusicVid}</a> <br/> <br/>                      
                    </h4>
                </div>
                            
                { track.strDescriptionEN !== null ? 
                    <div className='track-detail-info-right'>
                        <h3>Description:</h3> <br />
                        {track.strDescriptionEN} 
                        <br />
                    </div>
                    :
                    ""
                }

            </div>  
        </div>
    )
};

export default TrackDetails;