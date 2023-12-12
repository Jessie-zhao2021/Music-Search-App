import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { GetTop50Album } from '../api/apis';
import AlbumFace from './AlbumFace';
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
            <p className='loading-content'>Loading albums...</p>
            :
            Top50Album.map( m => ( <AlbumFace album={m} /> ) )
            }
          </div>
      </div>
      )    

};

export default Top50Album;