import { useState } from 'react';
import SpotifySongList from './SpotifySongList.js';


export default function AddSongForm(props) {
    const [songNameInput, setSongNameInput] = useState('');
    const { addSongToPlaylist, playlist, disableComponent } = props

    return (
        <div>
        <form>
            <div>Add a new song to your playlist</div>
            <label>Song Name</label>
            <input type="text" className=' border-slate-900 border-1' value={songNameInput} onChange={ (e) => setSongNameInput(e.target.value)}/>
        </form>
        <SpotifySongList disableComponent={disableComponent} playlist={playlist} songNameInput={songNameInput} addSongToPlaylist={addSongToPlaylist}/>
        </div>
    );
}