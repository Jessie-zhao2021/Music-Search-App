const LOCAL_STORAGE_KEY='liked-albums';


export function likeAlbum(albumId, isLike) {
    const likedAlbums = getLikedAlbumIds();

    const albums = isLike ? [...likedAlbums, albumId] : likedAlbums.filter(m => m !== albumId);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(albums));
}

export function getLikedAlbumIds() {
    if(!localStorage.getItem(LOCAL_STORAGE_KEY)) {
        return [];
    }

    const json = localStorage.getItem(LOCAL_STORAGE_KEY);

    return JSON.parse(json);
}
