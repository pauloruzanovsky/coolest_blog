import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap'

interface Playlist {
    _id: string;
    name: string;
    posts: Array<string>;
}

export default function Playlists(props) {
    const { playlists } = props

  
    return(
        <Nav vertical className='p-2 bg-slate-300'>
            <div className='flex'>
                <div>List of playlists</div>
                <Link to='/playlists/create'><button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg></button> </Link>
            </div>
                {playlists.map((playlist : Playlist) => (
                    <NavItem key={playlist._id}>
                        <Link to={`/playlists/${playlist._id}`}>
                            {playlist.name}
                        </Link>
                    </NavItem>))}
                    
        </Nav>
    )
}