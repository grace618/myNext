import React from 'react';
import Footer from './Footer'
import Topbar from './Topbar'
function Layout(props) {
    console.log(props)
    return (
        <div>
            <Topbar />
            <div>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}
export default Layout