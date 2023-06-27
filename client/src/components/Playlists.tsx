import { Plus } from 'lucide-react';
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
                <Link to='/playlists/create'><button><Plus /></button> </Link>
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