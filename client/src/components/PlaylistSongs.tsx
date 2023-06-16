import React from 'react';

function PlaylistSongs(props) {
  const { playlist } = props;

  console.log(playlist.songs, 'playlist in props')


    return (
        <div>
        <div>
          Current songs in the playlist:
        </div>
        <div>
          <ul>
            {playlist.songs && playlist.songs.map((song) => (
              <li key={song.id}>{song.name}</li>
            ))}
            
          </ul>
        </div>
      </div>
    );
}

export default PlaylistSongs;