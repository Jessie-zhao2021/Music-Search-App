import axios from 'axios';

const MUSIC_SEARCH_BASE_URL = 'https://www.theaudiodb.com/api/v1/json/523532/';
// const MUSIC_SEARCH_BASE_URL = 'https://www.theaudiodb.com/api/v1/json/2/';


export function SearchAlbum(query, onSuccess, onError) {

    axios.get(`${MUSIC_SEARCH_BASE_URL}searchalbum.php?s=${query}`)
    .then(res => {
        console.log( 'search data:', res.data  );
        onSuccess(res.data);
    })
    .catch(err => {
        console.warn('Error loading search results', err);
        onError(err);
    });
};

    
export function GetAlbumInfo( id, onSuccess, onError ){
  
    axios.get(`${MUSIC_SEARCH_BASE_URL}album.php?m=${id}`)
      .then(res => {
        console.log( 'Album data:', res.data.album[0]  );
        onSuccess( res.data.album[0] );
      })
      .catch(err => {
        console.warn('Error loading search results', err);
        onError( err );
      });
};


export function GetAlbumTrackList(id, onSuccess, onError){

    axios.get(`${MUSIC_SEARCH_BASE_URL}track.php?m=${id}`)
        .then(res => {
        console.log( 'album detail:', res.data  );
        onSuccess( res.data.track );
        })
        .catch(err => {
        console.warn('Error loading search results', err);
        onError( err );
        });
};


export function GetCurrentTrendingAlbum(country, onSuccess, onError){
    
    axios.get(`${MUSIC_SEARCH_BASE_URL}trending.php?country=${country}&type=itunes&format=albums`)
      .then(res => {
        console.log( 'trending album data:', res.data );
        onSuccess( res.data.trending );
      })
      .catch(err => {
        console.warn('Error loading search results', err);
        onError(err)
      });   
};


export function GetTop50Album(onSuccess, onError){
    
    axios.get(`${MUSIC_SEARCH_BASE_URL}mostloved.php?format=album`)
      .then(res => {
        console.log( 'top album data:', res.data.loved  );
        onSuccess( res.data.loved );
      })
      .catch(err => {
        console.warn('Error loading search results', err);
        onError( err );
      });   
};


export function GetTop50Tracks(onSuccess, onError){
    
    axios.get(`${MUSIC_SEARCH_BASE_URL}mostloved.php?format=track`)
      .then(res => {
        console.log( 'top track:', res.data  );
        onSuccess( res.data.loved );
      })
      .catch(err => {
        onError( err );
      });   
};


export function GetTrackDetails(id, onSuccess, onError){
    
    axios.get(`${MUSIC_SEARCH_BASE_URL}track.php?h=${id}`)
      .then(res => {
        console.log( 'track details:', res.data.track[0]  );
        onSuccess( res.data.track[0] );
      })
      .catch(err => {
        onError( err );
      });   
};