import React from 'react'
import Header from '../header/Header'
import MenuHeader from '../menuheader/MenuHeader'

const Layout = (props) => {
    return (
        <>
            <Header />
            <MenuHeader />
            {props.children}
        </>
    )
}

export default Layout
