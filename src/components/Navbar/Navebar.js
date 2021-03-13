import React,{useState} from "react";
import {Link} from "react-router-dom";
// import {Button} from "../Button/Button";
import "./Navbar.css"

function Navbar(){
    const [click,setClick] = useState(false);
    // const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // const showButton = () => {
    //     if(window.innerWidth <= 960){
    //         setButton(false);
    //     } else {
    //         setButton(true);
    //     }
    // };

    // useEffect(() => {
    //     showButton();
    // }, [])

    // window.addEventListener("resize", showButton);
    return(
        <>
        <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    Webtalk  <i className="fas fa-spa"></i>
                    </Link>
                    <div className="menu-icon" onClick={handleClick} >
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to ="/"  className="nav-links" onClick={closeMobileMenu}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to ="/categories" className="nav-links" onClick={closeMobileMenu}>Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link to ="/posts" className="nav-links" onClick={closeMobileMenu}>Posts</Link>
                        </li>
                    </ul>
                    {/* {button && <Button buttonStyle="btn-outline">Posts</Button>} */}
                </div>
        </nav>
        </>
    )
}
export default Navbar;