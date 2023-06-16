import { Link } from 'react-router-dom'
import { Button } from "./ui/button"

interface userObjectProps {
    _id: string;
    email: string;
    googleId?: string;
    githubId?: string;
    name: string;
    picture: string;

}
export default function Header({userObject} : {userObject: userObjectProps}) {
    const logout = () => {
       fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
       })
       .then(() => {
        window.location.reload()
        }   
        
       ).catch(err => {
        console.log(err)
       })
    }
    return (
        <header className='p-4 bg-slate-400 font-bold size-xl flex justify-between'>
          <Link to='/' className='cursor-pointer'># Spotify Playlists</Link>
          <div>Hello {userObject && userObject.name}</div>
          {userObject && <Link to='/login'><Button onClick={logout}>Logout</Button></Link>}
        </header>
    )
}
