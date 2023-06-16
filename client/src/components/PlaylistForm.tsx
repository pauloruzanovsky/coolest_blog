import { useState } from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"



export default function PlaylistForm(props) {
    const [playlistInput, setPlaylistInput] = useState('');
    const { playlists, createPlaylist  } = props

    return(
        <div>
            <div>Create Playlist</div>
            <form onSubmit={(e) => {createPlaylist(e,playlistInput)}}>
                <Input className='border ' onChange={(e) => setPlaylistInput(e.target.value)} type='text' name='name' value={playlistInput}/>
                <Button type='submit' className='border'>Submit</Button>
            </form>
        </div>
    )
}