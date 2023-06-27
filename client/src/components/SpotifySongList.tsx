import { useEffect, useState } from 'react';
import Song from './Song';

function SpotifySongList(props) {
    const [songList, setSongList] = useState([] as any);
    const { songNameInput, addSongToPlaylist, playlist, disableComponent } = props

    useEffect(() => {
        if(songNameInput.length === 0) {
            setSongList([])
        } else {
            fetch(`http://localhost:5000/spotify/${songNameInput.toLowerCase()}`)
            .then(res => res.json())
            .then(data => {
                setSongList(data)
            })

        }
    },[songNameInput])

    const playlistSongs = playlist.songs ? playlist.songs.map((song: any) => {
        return song.name
    }) : []

    const songListElement = songList.filter(song => !playlistSongs.includes(song.name))
                                    .map((song: any) => {
                                    return (
                                        <div className={`cursor-pointer flex ${ disableComponent ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => {!disableComponent && addSongToPlaylist(song)}} key={song.spotifyId}>
                                           <Song song={song}/>
                                        </div>
                                    )
                                    })
                                    

    return (
        <div>
            {songNameInput ? songListElement : <div>Search for a song</div>}
        </div>
    );
}

export default SpotifySongList;