import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap'

interface Hashtag {
    _id: string;
    name: string;
    posts: Array<string>;
}

export default function Hashtags(props) {
    const { hashtags } = props

  
    return(
        <Nav vertical className='p-2 bg-slate-300'>
            <div className='flex'>
                <div>List of hashtags</div>
                <Link to='/hashtags/create'><button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg></button> </Link>
            </div>
                {hashtags.map((hashtag : Hashtag) => (
                    <NavItem key={hashtag._id}>
                        <Link to={`/hashtags/${hashtag._id}`}>
                            {hashtag.name}
                        </Link>
                    </NavItem>))}
                    
        </Nav>
    )
}