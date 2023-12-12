import { useState, useEffect } from 'react';
import {GetCurrentTrendingAlbum} from '../api/apis'
import { ClearLikedAlbums } from '../api/album';
import AlbumFace from './AlbumFace';


function CurrentTrendingAlbum(props){

    const [ CurrentTrendingAlbum, setCurrentTrendingAlbum ]   = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
    console.log(props);
  
    useEffect(() => {
        ClearLikedAlbums();
        GetCurrentTrendingAlbum( props.country, (data) => {
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

    return (
        <>
            <div className='trending-album'>
            {
            loading 
            ?
            <p>Loading trending albums...</p>
            :
            CurrentTrendingAlbum.map( m => ( <AlbumFace album={m} /> ))
            }
            </div>
        </>
    )
};

export default CurrentTrendingAlbum;