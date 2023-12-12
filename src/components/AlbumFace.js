import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import whiteHeart from '../img/whiteHeart.png';
import redHeart from '../img/redHeart.png';
import { SetLikeAlbum } from '../api/album';

export default function AlbumFace({album}) {

    const navigateTo = useNavigate();
    const [ like, setLike] = useState( false );
    const likedAlbums = JSON.parse(localStorage.getItem('liked-albums')) || [];

    console.log(likedAlbums);

    const onLikeClick = (albumId)=>{
        SetLikeAlbum(albumId, !like);
        setLike(!like);
    };

    return (        
        <div className={(album.strCountry && album.strCountry.length > 0) ? 'trending-album-item' : 'album' } key={album.idAlbum}>             
            <img 
                className='poster'
                src={album.strAlbumThumb ? album.strAlbumThumb : 'https://www.publicdomainpictures.net/pictures/330000/velka/image-1586763209WNr.jpg'}
                alt={album.strAlbum} 
                onClick={ () => navigateTo(`/album/${album.idAlbum}`)}
            /> 
            
            <div className="album-lable" >
                <div onClick={ () => navigateTo(`/album/${album.idAlbum}`)}>{ album.strAlbum }( { album.strCountry ? album.strCountry.toUpperCase() : album.intYearReleased } )</div>
                <div className='artist-like'>
                    { album.strArtist }
                    <span>
                        <img key={album.idAlbum} className="likeBtn" onClick={()=>{onLikeClick(album.idAlbum)}} src={like ? redHeart : whiteHeart} alt='red heart'/>
                    </span>
                </div>
            </div>  
         
        </div>
    );

}