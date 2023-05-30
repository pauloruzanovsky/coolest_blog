import { useState, useEffect } from 'react'

export default function Hashtags() {
    const [hashtags, setHashtags] = useState([]);

   

    useEffect(() => {
      const fetchPeople = async () => {
          const response = await fetch('/api/hashtags');
          const data = await response.json();
          setHashtags(data);
          console.log('response ', response)
      };
      fetchPeople();
    }, []);
  
    return(
        <div>
            <div>List of users</div>
            <ul>
               
            </ul>
        </div>
    )
}