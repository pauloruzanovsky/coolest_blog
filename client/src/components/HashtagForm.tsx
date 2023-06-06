import { useState } from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface HashtagsProps {
    handleCreateHashtag: () => void
}

export default function HashtagForm(props : HashtagsProps) {
    const [hashtagInput, setHashtagInput] = useState('');
    const { handleCreateHashtag } = props
    const createHashtag = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            console.log('input: ',hashtagInput)
            const response = await fetch('http://localhost:5000/hashtags/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: hashtagInput,
                    posts: []
                })
            })
            const data = response.json()
            console.log(data)
            setHashtagInput('')
            handleCreateHashtag()
        } catch (err) {
            console.error(err)
        }

    }

    console.log(hashtagInput)
    return(
        <div>
            <div>Hashtag Form</div>
            <form onSubmit={createHashtag}>
                <Input className='border ' onChange={(e) => setHashtagInput(e.target.value)} type='text' name='name' value={hashtagInput}/>
                <Button type='submit' className='border'>Submit</Button>
            </form>
        </div>
    )
}