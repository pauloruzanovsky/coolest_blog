import { useContext, useEffect, useState } from 'react';
import { myContext } from './Context.tsx'
import Header from './Header.tsx'
import Hashtags from './Hashtags.tsx'
import { Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.tsx';
import Hashtag from './Hashtag.tsx';
import HashtagForm from './HashtagForm.tsx';



function Content () {
    const userObject = useContext(myContext)
    const [hashtags, setHashtags] = useState<[]>([]);
    const navigate = useNavigate()
    const [hashtagInput, setHashtagInput] = useState('');


    const fetchHashtags = async () => {
            const response = await fetch('http://localhost:5000/hashtags');
            const data = await response.json();
            setHashtags(data);
      };

    useEffect(() => {
        fetchHashtags();
    },[])

    const createHashtag = (e: React.FormEvent, hashtagInput) => {
        e.preventDefault();

        const newHashtag = {
            name: hashtagInput,
            posts: []
        }
        fetch('http://localhost:5000/hashtags/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHashtag)
        })
        setHashtagInput('')
        const newHashtags = [...hashtags]
        if(hashtags.filter(hashtag => hashtag.name === hashtagInput).length === 0) {
            newHashtags.push(newHashtag)
            setHashtags(newHashtags)
        }
    }   

    const updateHashtag = (id, updatedHashtagName) => {
        if(hashtags.filter(hashtag => hashtag.name === updatedHashtagName).length === 0) {
            fetch(`http://localhost:5000/hashtags/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: updatedHashtagName,
                }),
            })

            const newHashtags = [...hashtags]
            
                newHashtags.forEach(hashtag => {
                if (hashtag._id === id) {
                    hashtag.name = updatedHashtagName
                }
                })
            setHashtags(newHashtags)
          }
    }

    const deleteHashtag = (id) => {
        fetch(`http://localhost:5000/hashtags/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: '',
            }),
          })

          const newHashtags = hashtags.filter(hashtag => hashtag._id !== id)
          setHashtags(newHashtags)
          navigate('/')
    }

    return (
        <>
        <Header userObject={userObject} />
        <div className='flex'>
        <Hashtags hashtags={hashtags}/>
        <main className='p-3'>
        <Routes>
            <Route path='/hashtags/:id' element={<PrivateRoute><Hashtag updateHashtag={updateHashtag} deleteHashtag={deleteHashtag} hashtags={hashtags}/></PrivateRoute>}/>
            <Route path='/hashtags/create' element={<PrivateRoute><HashtagForm createHashtag={createHashtag}/></PrivateRoute>} />
        </Routes>
        </main>
        
        </div>
        </>
    );
}

export default Content;