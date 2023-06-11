import { useState } from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"



export default function HashtagForm(props) {
    const [hashtagInput, setHashtagInput] = useState('');
    const { hashtags, createHashtag  } = props

    return(
        <div>
            <div>Hashtag Form</div>
            <form onSubmit={(e) => {createHashtag(e,hashtagInput)}}>
                <Input className='border ' onChange={(e) => setHashtagInput(e.target.value)} type='text' name='name' value={hashtagInput}/>
                <Button type='submit' className='border'>Submit</Button>
            </form>
        </div>
    )
}