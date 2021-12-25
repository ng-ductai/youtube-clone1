import React, { useState } from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch} from "react-icons/ai";
import { MdNotifications, MdApps, MdOutlineVideoCall } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({handleToggleSidebar}) => {
    const [input, setInput] = useState('')
    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        history(`/search/${input}`)
    }

    const user = useSelector(state => state.auth?.user)

    return (
        <div className="header">
            <FaBars className="header__menu" size={26} 
                onClick={()=> handleToggleSidebar()}
            />
            <Link to='/' className="header__logo">
                <img
                    src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
                    alt=""
                    className="header__logos"
                />
                   <p>YouTube </p> 
            </Link>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                />
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header__icons">
                <MdOutlineVideoCall size={30}/>
                <MdApps size={28} />
                <MdNotifications size={28}/>
                <img src={user?.photoURL}  alt="" />
            </div>
        </div>
    );
};

export default Header;
