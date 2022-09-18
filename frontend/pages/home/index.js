import React from "react"
import {connect} from "react-redux";
import Home from "../../components/Home";
class index extends React.Component {
    onRedirectHome = (value) => {
        // this.setState({page: value})
        // this.fetchMusicList(value)
        // this.fetchChillMusicList(value)
        // this.fetchRelaxMusicList(value)
    }
    render() {

        return (
            <div>
                {/*<div className="custom-sidebar-platform">*/}
                {/*    <div className="custom-navbrand-sidebar">*/}
                {/*        <img src="images/logo2.png"/>*/}
                {/*        <nav className="navbar-brand">DIGITVL</nav>*/}
                {/*        <hr/>*/}
                {/*        <ul className="nav flex-column custom-sidebar-navlinks">*/}
                {/*            <li className="nav-item mt-5">*/}
                {/*                /!*<img src="images/"/>*!/*/}
                {/*                <Link className="nav-link active custom-nav-link" href="/">Home</Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="/trending">Trending</Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="/blogs">Blogs</Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="/donate">Donate</Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="/support">Support</Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="#">Store</Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="#">Wallet</Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="#">Library</Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="#">Feeds</Link>*/}
                {/*            </li>*/}
                {/*            <hr/>*/}
                {/*            <li className="nav-item">*/}
                {/*                <Link className="nav-link" href="#">Logout</Link>*/}
                {/*            </li>*/}
                {/*        </ul>*/}

                {/*    </div>*/}
                {/*</div>*/}
                <Home/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;