import { useEffect, useState } from 'react';

function SpotifySongList(props) {
    const [songList, setSongList] = useState([] as any);
    const { songNameInput, addSongToPlaylist } = props

    const mockSongList = [
        {
            id: 1,
            name: 'Song 1',
        },
        {
            id: 2,
            name: 'Song 2',
        },
        {
            id: 3,
            name: 'Song 3',
        },
        {
            id: 4,
            name: 'Song 4',
        },
        {
            id: 5,
            name: 'Song 5',
        },
        {
            id: 6,
            name: 'Song 6',
        },
        {
            id: 7,
            name: 'Song 11',
        }
    ]


    useEffect(() => {
        setSongList(mockSongList)
    },[])

    useEffect(() => {
        const filteredSongList = mockSongList.filter(song => song.name.toLowerCase().includes(songNameInput.toLowerCase()))

        if(songNameInput.length === 0) {
            setSongList(mockSongList)
        }

        if (songNameInput.length > 0) {
            setSongList(filteredSongList)
        }
        
  

    },[songNameInput])

    const songListElement = songList.map((song: any) => {
        return <div className='cursor-pointer' onClick={() => {addSongToPlaylist(song)}} key={song.id}>{song.name}</div>
    })

    return (
        <div>
            {songNameInput ? songListElement : <div>Search for a song</div>}
        </div>
    );
}

export default SpotifySongList;