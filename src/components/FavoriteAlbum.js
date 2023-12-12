import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetAlbumInfo } from '../api/apis';
// import whiteHeart from '../img/whiteHeart.png';
// import redHeart from '../img/redHeart.png';

function LikedAlbum(id){
    const navigateTo = useNavigate();
    const [ album, setAlbum ] = useState([]);
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState(false);

    useEffect(() => {
        GetAlbumInfo(id, (data) => {
            setAlbum(data);
            setLoading( false )
        }, (err) => {
            setError( err );
            setLoading( false )}
        )
    }, [])

    if( error ){
        return <strong>There was loading your favorite album...</strong>;
    }
    
    if(loading) {
        return (<p className='loading-content'>loading...</p>);
    }

    return(
        
        <div className='album' key={album.idAlbum}>             
              <img 
                className='poster'
                src={album.strAlbumThumb ? album.strAlbumThumb : 'https://www.publicdomainpictures.net/pictures/330000/velka/image-1586763209WNr.jpg'}
                alt={album.strAlbum} 
                onClick={ () => navigateTo(`/album/${album.idAlbum}`) }
              /> 
             
             <div className="album-lable" >
                <div onClick={ () => navigateTo(`/album/${album.idAlbum}`)}>{ album.strAlbum }( { album.strCountry ? album.strCountry.toUpperCase() : album.intYearReleased  } )</div>
                <div>{ album.strArtist }</div>
            </div> 
        </div>
    )
    
    
}

function RenderlikedAlbums(){

    const likedAlbums = JSON.parse(localStorage.getItem('liked-albums')) || [];
    console.log('likedAlbums:',likedAlbums);
    return(
        <>
            {likedAlbums.length === 0 ? <div className='likeAlbums-p'>There is nothing... <br/>Please Add your Favorite music!</div> : ""}
            <div className='likeAlbums'>
            
            {
                likedAlbums.map( (id) => (
                    <div>
                        {LikedAlbum(id) }
                    </div>
                ))  
            }
                
            </div>
            {likedAlbums.length < 7 ? <div ><br/><br/></div> : ""}
        </>
    )
     
};

export default RenderlikedAlbums;

