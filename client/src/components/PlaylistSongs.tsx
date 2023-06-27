import { Trash2 } from 'lucide-react';
import Song from './Song.tsx'

function PlaylistSongs(props) {
  const { playlist, deleteSongFromPlaylist } = props;
  let playlistElement = []
  if(playlist.songs) {
      playlistElement = playlist.songs
      .sort((a,b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;})
      .map((song) => (
      <li className='flex justify-between align-middle' key={song.spotifyId}>
        <Song song={song}/>
        <button onClick={() => {deleteSongFromPlaylist(song.spotifyId)}}><Trash2 /></button>
      </li>))
  }

    return (
        <div>
        <div>
          Current songs in the playlist:
        </div>
        <div>
          <ul className='flex flex-col gap-2'>
            {playlistElement}
          </ul>
        </div>
      </div>
    );
}

export default PlaylistSongs;