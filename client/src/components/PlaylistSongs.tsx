
function PlaylistSongs(props) {
  const { playlist, deleteSongFromPlaylist } = props;
  let playlistElement = []

  if(playlist.songs) {
      playlistElement = playlist.songs.sort((a,b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
      })
      .map((song) => (
      <li className='flex justify-between' key={song.id}>
        <div>{song.name}</div>
        <button onClick={() => {deleteSongFromPlaylist(song.id)}}>x</button>
      </li>))
  }

    return (
        <div>
        <div>
          Current songs in the playlist:
        </div>
        <div>
          <ul>
            {playlistElement}
          </ul>
        </div>
      </div>
    );
}

export default PlaylistSongs;