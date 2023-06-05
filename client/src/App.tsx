import Hashtags from './components/Hashtags.tsx'
import Hashtag from './components/Hashtag.tsx'
import HashtagForm from './components/HashtagForm.tsx'
import { Route, Routes, Link } from 'react-router-dom'
import {useState} from 'react'

function App() {
  const [hashtagCreated, setHashtagCreated] = useState(false)


  const handleCreateHashtag = () => {
    setHashtagCreated(hashtagCreated => !hashtagCreated)
  }

  return (
    <div className='flex'>
        <div className='p-4'>
          <Hashtags hashtagCreated={hashtagCreated} handleCreateHashtag={handleCreateHashtag}/>
          <Link to='/hashtags/create'>Create Hashtag</Link>
        </div>
        <Routes>
          <Route path='/' element={<div>Home</div>} />
          <Route path='/hashtags/hashtag/:id' element={<Hashtag/>}/>
          <Route path='/hashtags/create' element={<HashtagForm hashtagCreated={hashtagCreated} handleCreateHashtag={handleCreateHashtag}/>} />
        </Routes>
    </div>
   
  );
}

export default App;