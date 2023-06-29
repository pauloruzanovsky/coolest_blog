import { useEffect, useState } from 'react';
import Song from './Song';

function SpotifySongList(props) {
    const [songList, setSongList] = useState([] as any);
    const { songNameInput, addSongToPlaylist, playlist, disableComponent, handlePreview, isPlaying, currentSong } = props
    const [searchingSongs, setSearchingSongs] = useState(false)

    useEffect(() => {
        if(songNameInput.length === 0) {
            setSongList([])
        } else {
            const queryParams = `existingSongs=${encodeURIComponent(JSON.stringify(playlist.songs))}&songName=${encodeURIComponent(songNameInput)}`
            setSearchingSongs(true)
            fetch(`http://localhost:5000/spotify/suggestionList?${queryParams}`)
            .then(res => res.json())
            .then(data => {
                setSongList(data)
                setSearchingSongs(false)
            })

        }
    },[songNameInput])

    const playlistSongs = playlist.songs ? playlist.songs.map((song: any) => {
        return song.name
    }) : []

    const songListElement = searchingSongs ? <div>Searching...</div> : songList.filter(song => !playlistSongs.includes(song.name))
                                    .map((song: any) => {
                                    return (
                                        <div className={`cursor-pointer flex ${ disableComponent ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => {!disableComponent && addSongToPlaylist(song)}} key={song.spotifyId}>
                                           <Song song={song} onPreview={handlePreview} isPlaying={isPlaying} currentSong={currentSong}/>
                                        </div> 
                                    )
                                    })
                                    

    return (
        <div className='flex flex-col gap-2'>
            {songNameInput ? songListElement : <div>Search for songs</div>}
        </div>
    );
}

export default SpotifySongList;