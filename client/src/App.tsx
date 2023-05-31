import './App.css'
import Hashtags from './components/Hashtags.tsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<div>Home</div>} />
      <Route path='/hashtags' element={<Hashtags/>} />
    </Routes>
  );
}

export default App;