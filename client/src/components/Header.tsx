import { Link } from 'react-router-dom'

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
        <header className='navbar bg-base-100'>
          <Link to='/' className='btn btn-ghost text-base-content normal-case text-xl'>GrooveBuddy.</Link>
          <div className='flex items-center'>Hello, {userObject && userObject.name}</div>
          {userObject && <Link to='/login'><button className='btn btn-secondary' onClick={logout}>Logout</button></Link>}
        </header>
    )
}
