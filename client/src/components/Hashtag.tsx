import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';


interface Hashtag {
    _id: string;
    name: string;
    posts: Array<string>;
}

export default function Hashtag() {
    const { id } = useParams();
    const [currentId, setcurrentId] = useState('');
    const [hashtag, setHashtag] = useState({} as Hashtag);

    useEffect(() => {
      setcurrentId(id);
      console.log(currentId)
    },[id])
  
    useEffect(() => {
        const fetchHashtag = async () => {
          try {
              const response = await fetch(`http://localhost:5000/hashtags/hashtag/${currentId}`);
              const data = await response.json();
              console.log(data)
              setHashtag(data);
          } catch (err) {
              console.error(err);
           }
  
        };
        currentId && fetchHashtag();
      }, [currentId]);
    return(
        <div>
            <div>{hashtag.name} detail</div>
        </div>
    )
}