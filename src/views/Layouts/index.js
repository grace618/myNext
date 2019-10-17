import React from 'react';
import Footer from './Footer'
import Topbar from './Topbar'
function Layout(props) {
    return (
        <div>
            <Topbar />
            {props.children}
            <Footer />
        </div>
    )
}
export default Layout