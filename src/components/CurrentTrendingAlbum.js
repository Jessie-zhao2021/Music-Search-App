import { useState, useEffect } from 'react';
import {GetCurrentTrendingAlbum} from '../api/apis'
import AlbumFace from './AlbumFace';
import { getLikedAlbumIds } from '../api/likeAlbum';


function CurrentTrendingAlbum(props){

    const [ CurrentTrendingAlbum, setCurrentTrendingAlbum ]   = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
    console.log(props);
  
    useEffect(() => {
        const likedAlbumIds = getLikedAlbumIds();
        GetCurrentTrendingAlbum( props.country, (data) => {
            data.forEach(m => {
                if (likedAlbumIds.includes(m.idAlbum)) {
                    m['liked'] = true;
                }
            });
            setCurrentTrendingAlbum(data);
            setLoading( false ); 
        }, (err) => {
            setError( err );
            setLoading( false );
        } );
    }, [props.country] ); 

    if( error ){
        return <strong>There was loading your results. Please try again later.</strong>;
    }

    if (loading) {
        return <p>Loading trending albums...</p>;
    }

    return (
        <div className='trending-album'>
            { CurrentTrendingAlbum.map( m => ( <AlbumFace album={m} /> )) }
        </div>
    )
};

export default CurrentTrendingAlbum;