import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

interface Hashtag {
    _id: string;
    name: string;
    posts: Array<string>;
}

interface HashtagsProps {
    hashtagCreated: boolean;
    handleCreateHashtag: () => void;
}

export default function Hashtags(props : HashtagsProps) {
    const { hashtagCreated, handleCreateHashtag } = props
    const [hashtags, setHashtags] = useState<Hashtag[]>([]);
    const fetchHashtags = async () => {
        try {
            const response = await fetch('http://localhost:5000/hashtags');
            const data = await response.json();
            console.log(data)
            setHashtags(data);
        } catch (err) {
            console.error(err);
         }

      };


      useEffect(() => {
        fetchHashtags();
      },[])

    useEffect(() => {
        if(hashtagCreated) {
            console.log('rerendering hashtags')
            fetchHashtags();
            handleCreateHashtag();
        }
     
    }, [hashtagCreated]);
  
    return(
        <div>
            <div>List of hashtags</div>
            <ul>
                {hashtags.map((hashtag : Hashtag) => (
                    <Link key={hashtag._id} to={`/hashtags/${hashtag._id}`}>
                        <li>{hashtag.name}</li>
                    </Link>))}
            </ul>
        </div>
    )
}