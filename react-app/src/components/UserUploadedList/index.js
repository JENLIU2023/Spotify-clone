import React, { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom';
import { fetchSongs } from "../../store/songs";
import { fetchAlbums } from "../../store/albums";
import EditSongPage from "./EditSongModal";
import EditAlbumModal from "../SingleAlbum/EditAlbumModal";
import DeleteAlbumModal from "../SingleAlbum/DeleteAlbumModal";
import DeleteSongModal from "./DeleteSongModal";
import DeleteSongInAlbumModal from "./DeleteSongInAlbumModal";
import AddSongToAlbumModal from "./AddSongToAlbumModal";
import './UserUploadedSongList.css'

const UserUploadedList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    
    if(!sessionUser){
        history.push("/")
    }

    const songs = Object.values(useSelector((state) => state.songs));
    const albums = useSelector((state) => state.albums);

    let userSongs = []
    if(songs.length > 0) {
        for(let song of songs) {
            if(song.userId === sessionUser?.id){
                userSongs.push(song)
            }
        }
    }

    let userAlbums = []
    if(Object.values(albums).length > 0) {
        for(let album of Object.values(albums)) {
            if(album.userId === sessionUser?.id){
                userAlbums.push(album)
            }
        }
    }

    useEffect(() => {
        dispatch(fetchSongs());
        dispatch(fetchAlbums());
    }, [dispatch]);
  
    return (
        <div className="uploaded-song-list">
            <div>
                <h2>Uploaded Songs List :</h2>
                <div>
                    <div className="uploaded-song-list-intro">
                        <h4>#</h4>
                        <h4>Title</h4>
                        <h4>Artist</h4>
                        <h4>Date added</h4>
                        <h4><i className="fa-solid fa-pen-to-square"></i>Album</h4>
                        <button><i className="fa-solid fa-pencil fa-lg"></i></button>
                        <button><i className="fa-solid fa-trash-can fa-lg"></i></button>
                        {/* <button><i className="fa-solid fa-compact-disc fa-lg"></i></button> */}
                    </div>
                    <div className="uploaded-song-list-details">
                        {userSongs?.map((song, index) => (
                        <div key={song.id}  className="uploaded-song-list-each">
                            <h4>{index+1}</h4>
                            <h4>{song.title}</h4>
                            <h4>{song.artist}</h4>
                            
                            <h4>{song.createdAt.slice(4, 16)}</h4>
                            {song.albumId?.length > 0 ? (
                            <OpenModalButton
                                buttonText={albums[song.albumId[0]]?.title}
                                modalComponent={<DeleteSongInAlbumModal song={song} album={albums[song.albumId[0]]}/>}
                            />
                            ):(
                            <OpenModalButton
                                buttonText="--"
                                modalComponent={<AddSongToAlbumModal song={song} albums={userAlbums}/>}
                            />
                            )}
                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={<EditSongPage song={song}/>}
                            />
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteSongModal song={song}/>}
                            />
                            
                        </div>
                        ))}
                    </div>
                </div>
            
            <div>
                <h2>Created Albums List :</h2>
                {userAlbums?.map((album, index) => (
                    <div key={album.id}>
                        <div>
                            {/* <div style={{backgroundImage: `url(${album.coverImage})`}}>Album</div> */}
                            <img src={album.coverImage} alt="coverImage" width={200} height={200}/>
                            <h4>{album.title}</h4>
                            <h5>{album.releasedYear} · {album.artist}</h5>
                            <OpenModalButton
                                buttonText="＋ Edit album"
                                modalComponent={<EditAlbumModal album={album}/>}
                            />
                            <OpenModalButton
                                buttonText="－ Delete album"
                                modalComponent={<DeleteAlbumModal album={album}/>}
                            />
                        </div>
                        <div>
                            {Object.values(album.songs).map((song, index) => (
                                <div key={song.id}>
                                    <h4>{index+1}</h4>
                                    <h4>{song.title}</h4>
                                    <h4>{song.artist}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
  }
  
  export default UserUploadedList