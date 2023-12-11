import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetAlbumInfo } from '../api/apis';
import whiteHeart from '../img/whiteHeart.png';
import redHeart from '../img/redHeart.png';

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
        return <strong>There was loading your results. Please try again later.</strong>;
    }
    
    if( album === null ){ 
        return <strong>There was loading your results. Please check Artist name.</strong>;
    }

    return(


        <div className='album' key={album.idAlbum}>             
              <img 
                className='poster'
                src={album.strAlbumThumb ? album.strAlbumThumb : 'https://avatar.amuniversal.com/user_avatars/avatars_gocomicsver3/3015000/3015243/No-Photo-Available.jpg'}
                alt={album.strAlbum} 
                onClick={ () => navigateTo(`/album/${album.idAlbum}`) }
              /> 
             
             <div className="album-lable" >
                <div onClick={ () => navigateTo(`/album/${album.idAlbum}`)}>{ album.strAlbum }( { album.strCountry ? album.strCountry.toUpperCase() : album.intYearReleased  } )</div>
                <div>{ album.strArtist }</div>
                {/* <div className='likeDiv'>
                    <img key={album.idAlbum} className="likeBtn" onClick={()=>{onLikeClick(album.idAlbum)}} src={like ? redHeart : whiteHeart} alt='red heart'/>
                </div> */}
            </div> 
        </div>
    )
    
    
}

function RenderlikedAlbums(){

    const likedAlbums = JSON.parse(localStorage.getItem('liked-albums')) || [];
    console.log('likedAlbums:',likedAlbums)
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

