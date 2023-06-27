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
    const { updatePlaylistName, deletePlaylist, playlists, fetchPlaylists } = props
    const [disableComponent, setDisableComponent] = useState(false)


    const fetchPlaylist = () => {
      fetch(`http://localhost:5000/playlists/${id}`)
        .then(response => response.json())
        .then(data => {
          setPlaylist(data)
        })
    }

    useEffect(() => {
        fetchPlaylist();
        console.log('playlist fetched', playlists)
      }, [playlists, id]);

    useEffect(() => {
      console.log(playlist)
    },[playlist])
    
    const addSongToPlaylist = (song) => {
      if(playlist) {
        const songExists = playlist.songs.some(playlistSong => playlistSong.name === song.name)
        setDisableComponent(true)
        if (!songExists) {
          fetch(`http://localhost:5000/playlists/addSong/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              song: song,
          })})
          .then(() => {
            console.log('song added to playlist')
            fetchPlaylists()
            setTimeout(() => {
              setDisableComponent(false)
            }, 1000)
          })
        } else {
          console.log('song already in playlist')
        }
      }
    }

    const deleteSongFromPlaylist = (songId) => {
      console.log('playlist id: ', id, 'song id: ', songId)
      fetch(`http://localhost:5000/playlists/deleteSong/${id}/${songId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },

      }).then(() => {
        console.log('deleted song')
        fetchPlaylists()
      })
      .catch((error) => {
        console.log(error)
      })
  }

    
    return(
        <div className='flex'>
          <div>
          <h1>Playlist: {playlist.name}</h1>
           <PlaylistActionButtons id={id} updatePlaylistName={updatePlaylistName} deletePlaylist={deletePlaylist}/>
           <PlaylistSongs deleteSongFromPlaylist={deleteSongFromPlaylist} playlist={playlist} />
          </div>
          <AddSongForm addSongToPlaylist={addSongToPlaylist} disableComponent={disableComponent} playlist={playlist}/>
        </div>
    )
}

