import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react'

function Song(props) {
    const { song, onPreview, isPlaying, currentSong } = props;

    const handlePreview = (e, song) => {
        console.log(song)
        onPreview(e, song);
      };

    return (
        <div className='flex align-middle max-h-12 gap-1'>
            <img src={song.imageUrl} className='h-full'/>
            <div>
                <div>{song.name}</div>
                <div className=' text-xs'>{song.artist}</div>
            </div>
            
            <button disabled={!song.previewUrl} className={`${!song.previewUrl ? 'opacity-20 cursor-not-allowed' : ''} ml-auto`} onClick={(e) => {handlePreview(e, song)}}>{currentSong && currentSong.spotifyId === song.spotifyId && isPlaying ? <Pause /> : <Play/>}</button>
        </div>
    );
}

export default Song;
