import { useState, useEffect } from 'react'

interface HashtagsProps {
    hashtagCreated: boolean;
    handleCreateHashtag: () => void
}

export default function HashtagForm(props : HashtagsProps) {
    const [hashtagInput, setHashtagInput] = useState('');
    const { hashtagCreated, handleCreateHashtag } = props
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
        } catch (err) {
            console.error(err)
        }

        setHashtagInput('')
        handleCreateHashtag()
    }

    useEffect(() => {
        console.log('hashtagCreated after submit: ', hashtagCreated)

    },[hashtagCreated])

    console.log(hashtagInput)
    return(
        <div>
            <div>Hashtag Form</div>
            <form onSubmit={createHashtag}>
                <input className='border ' onChange={(e) => setHashtagInput(e.target.value)} type='text' name='name' value={hashtagInput}></input>
                <button type='submit' className='border'>Submit</button>
            </form>
        </div>
    )
}