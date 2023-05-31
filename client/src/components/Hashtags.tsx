import { useState, useEffect } from 'react'

export default function Hashtags() {
    const [hashtags, setHashtags] = useState([]);

   

    useEffect(() => {
      const fetchPeople = async () => {
        try {
            const response = await fetch('/hashtags');
            const data = await response.json();
            setHashtags(data);
            console.log('response ', response)
        } catch (err) {
            console.error(err);
         }

        
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