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
    const { playlists, fetchPlaylists, updatePlaylistName, deletePlaylist } = props

    const fetchPlaylist = () => {
      fetch(`http://localhost:5000/playlists/${id}`)
        .then(res => res.json())
        .then(data => {
          setPlaylist(data)
        })
    }

    useEffect(() => {
        fetchPlaylist();
      }, [id]);
    
    const addSongToPlaylist = (song) => {
      const songExists = playlist.songs.some(playlistSong => playlistSong.name === song.name)

      if (!songExists) {
        fetch(`http://localhost:5000/playlists/addSong/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            song: song,
        })})
        .then(setPlaylist({
          ...playlist,
          songs: [...playlist.songs, song]
        }))
      } else {
        console.log('song already in playlist')
      }
    }

    const deleteSongFromPlaylist = (songId) => {
      fetch(`http://localhost:5000/playlists/deleteSong/${id}/${songId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },

      }).then(
        setPlaylist({
          ...playlist,
          songs: playlist.songs.filter(song => song.id !== songId)
        })
      )

    }
    
    return(
        <div className='flex'>
          <div>
          <h1>Playlist: {playlist.name}</h1>
           <PlaylistActionButtons id={id} updatePlaylistName={updatePlaylistName} deletePlaylist={deletePlaylist}/>
           <PlaylistSongs deleteSongFromPlaylist={deleteSongFromPlaylist} playlist={playlist} />
          </div>
          <AddSongForm addSongToPlaylist={addSongToPlaylist}/>
        </div>
    )
}

