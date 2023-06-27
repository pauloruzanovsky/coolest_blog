import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react'

function Song(props) {
    const { song } = props
    const songPreviewRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePreview = () => {
        if(isPlaying) {
            songPreviewRef.current.pause()
            setIsPlaying(false)
        } else {
            songPreviewRef.current.play()
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        if(song.previewUrl) {
            songPreviewRef.current = new Audio(song.previewUrl)
            songPreviewRef.current.volume = 0.01
        }
    },[song])

    return (
        <div className='flex align-middle max-h-12 gap-1'>
            <img src={song.imageUrl} className='h-full'/>
            <div>
                <div>{song.name}</div>
                <div>{song.artist}</div>
            </div>
            
            <button className={`${!song.previewUrl ? 'opacity-50 cursor-not-allowed' : ''} ml-auto`} onClick={handlePreview}>{!isPlaying ? <Play/> : <Pause /> }</button>
        </div>
    );
}

export default Song;

