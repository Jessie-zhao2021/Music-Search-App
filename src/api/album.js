const LOCAL_STORAGE_KEY='liked-albums';


export function SetLikeAlbum(albumId, isLike) {
    const likedAlbums = GetLikedAlbumIds();

    const albums = isLike ? [...likedAlbums, albumId] : likedAlbums.filter(m => m !== albumId);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(albums));
}

export function GetLikedAlbumIds() {
    if(!localStorage.getItem(LOCAL_STORAGE_KEY)) {
        return [];
    }

    const json = localStorage.getItem(LOCAL_STORAGE_KEY);

    return JSON.parse(json);
}

export function ClearLikedAlbums() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}