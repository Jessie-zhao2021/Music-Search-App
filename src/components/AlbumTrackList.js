
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetAlbumTrackList } from '../api/apis'


function AlbumTrackList( props ){

    const [ results, setResults ]   = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
    const navigateTo = useNavigate();

    console.log('idAlbum:', props.albumId);

    useEffect( () => {
        GetAlbumTrackList( props.albumId, (data) => {
            setResults( data );
            setLoading( false ); 
        }, (err) => {
            setError( err );
            setLoading( false );
        } );
      }, [props.albumId] ); 

    const Tracks = results.map(item => {
        return (
                <div key={item.idTrack} className='track-li'>
                    <h5 onClick={ () => navigateTo(`/track/${item.idTrack}`)}>{item.strTrack}</h5>
                    <h6>{item.intDuration.slice(0, 1)} : {item.intDuration.slice(1,3)}</h6>
                </div>   
        )
    })

    return(
        <div>

            <h4>Album track </h4>
            <div className='track-ul'>
                {Tracks}    
            </div>
            

        </div>
    )
};

export default AlbumTrackList;