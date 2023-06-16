import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PlaylistSongs from "./PlaylistSongs.tsx"
import PlaylistActionButtons from './PlaylistActionButtons.tsx'
import AddSongForm from './AddSongForm.tsx';

interface Playlist {
    _id: string;
    name: string;
    songs: Array<string>;
}

export default function Playlist(props) {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({} as Playlist);
    const { playlists, updatePlaylistName, deletePlaylist } = props

    const fetchPlaylist = () => {
      playlists.forEach(playlist => {
        if (playlist._id === id) {
          setPlaylist(playlist)
        }
      })
    };

    useEffect(() => {
        fetchPlaylist();
      }, [id]);
    
    const addSongToPlaylist = (song) => {
      console.log(song, 'added')
      setPlaylist({...playlist, songs: [...playlist.songs, song]})
    }
    
    return(
        <div className='flex'>
          <div>
          <h1>Playlist: {playlist.name}</h1>
           <PlaylistActionButtons id={id} updatePlaylistName={updatePlaylistName} deletePlaylist={deletePlaylist}/>
           <PlaylistSongs playlist={playlist} />
          </div>
          <AddSongForm addSongToPlaylist={addSongToPlaylist}/>
        </div>
    )
}

