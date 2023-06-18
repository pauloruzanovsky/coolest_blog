import { useContext, useEffect, useState } from 'react';
import { myContext } from './Context.tsx'
import Header from './Header.tsx'
import Playlists from './Playlists.tsx'
import Playlist from './Playlist.tsx';
import PlaylistForm from './PlaylistForm.tsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.tsx';

function Content () {
    const userObject = useContext(myContext)
    const [playlists, setPlaylists] = useState<[]>([]);
    const navigate = useNavigate()
    const [playlistInput, setPlaylistInput] = useState('');

    const fetchPlaylists = async () => {
            const response = await fetch('http://localhost:5000/playlists');
            const data = await response.json();
            setPlaylists(data);
            console.log('playlists updated')
      };

    useEffect(() => {
        fetchPlaylists();
    },[])


    const createPlaylist = (e: React.FormEvent, playlistInput) => {
        e.preventDefault();

        const newPlaylist = {
            name: playlistInput,
            posts: []
        }
        fetch('http://localhost:5000/playlists/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlaylist)
        })
        .then(() => fetchPlaylists())
        setPlaylistInput('')
        const newPlaylists = [...playlists]
        if(playlists.filter(playlist => playlist.name === playlistInput).length === 0) {
            newPlaylists.push(newPlaylist)
            const newPlaylistSorted = newPlaylists.sort((a, b) => a.name.localeCompare(b.name))
            setPlaylists(newPlaylistSorted)
        }
    }   

    const updatePlaylistName = (id, updatedPlaylistName) => {
        if(playlists.filter(playlist => playlist.name === updatedPlaylistName).length === 0) {
            fetch(`http://localhost:5000/playlists/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: updatedPlaylistName,
                }),
            })

            const newPlaylists = [...playlists]
            
                newPlaylists.forEach(playlist => {
                if (playlist._id === id) {
                    playlist.name = updatedPlaylistName
                }
                })
            setPlaylists(newPlaylists)
          }
    }

    const deletePlaylist = (id) => {
        fetch(`http://localhost:5000/playlists/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: '',
            }),
          })

          const newPlaylists = playlists.filter(playlist => playlist._id !== id)
          setPlaylists(newPlaylists)
          navigate('/')
    }


    return (
        <>
        <Header userObject={userObject} />
        <div className='flex'>
        <Playlists playlists={playlists}/>
        <main className='p-3'>
        <Routes>
            <Route path='/playlists/:id' element={<PrivateRoute><Playlist updatePlaylistName={updatePlaylistName} deletePlaylist={deletePlaylist} fetchPlaylists={fetchPlaylists} playlists={playlists}/></PrivateRoute>}/>
            <Route path='/playlists/create' element={<PrivateRoute><PlaylistForm playlistInput={playlistInput} setPlaylistInput={setPlaylistInput} createPlaylist={createPlaylist}/></PrivateRoute>} />
        </Routes>
        </main>
        
        </div>
        </>
    );
}

export default Content;