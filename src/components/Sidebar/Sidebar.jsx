import React from 'react'
import './_sidebar.scss'
import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp,
    MdHome,
    MdOutlineExplore,
    MdOutlineVideoLibrary,
    MdVideogameAsset,
    MdSportsSoccer
} from 'react-icons/md'
import {AiOutlineClockCircle} from 'react-icons/ai'
import {BsClockHistory, BsFileMusic, BsNewspaper} from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { log_out } from '../../redux/actions/authAction'
import { Link } from 'react-router-dom'

const Sidebar = ({sidebar, handleToggleSidebar}) => {
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(log_out())
    }

    return (
        <nav className={sidebar ? 'sidebar open' : 'sidebar'}
            onClick={() => handleToggleSidebar(false)}>            
            <Link to='/'>
                <li>
                    <MdHome size={23} />
                    <span>Home</span>
                </li>
            </Link>
            <li>
                <MdOutlineExplore size={23} />
                <span>Explore</span>
            </li>
            <Link to='/feed/subscriptions'>
                <li>
                    <MdSubscriptions size={23} />
                    <span>Subscriptions</span>
                </li>
            </Link>
            <hr />
            <li>
                <MdOutlineVideoLibrary size={23} />
                <span>Library</span>
            </li>
            <li>
                <BsClockHistory size={23} />
                <span>Watched Video</span>
            </li>
            <li>
                <AiOutlineClockCircle size={23} />
                <span>Watch Later</span>
            </li>
            <li>
                <MdThumbUp size={23} />
                <span>Liked Video</span>
            </li>
            <hr/>
            <li className='sidebar__title'>
                Subscriptions
            </li>
            <li>
                <BsFileMusic size={23} />
                <span>Music</span>
            </li>
            <li>
                <MdSportsSoccer size={23} />
                <span>Sports</span>
            </li>
            <li>
                <MdVideogameAsset size={23} />
                <span>Game</span>
            </li>
            <li>
                <BsNewspaper size={23} />
                <span>News</span>
            </li>
            <hr/>
            <li onClick={handleLogOut}>
                <MdExitToApp size={23} />
                <span>Log out</span>
            </li>
        </nav>
    )
}

export default Sidebar
