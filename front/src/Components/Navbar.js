import React from 'react'
import {Link} from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div div className={styles.navbar}>
      <div className={styles.brand}>
        <img className={styles.logo} alt="insta" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjFi0WKfxwrK5vsA0wTS1s6M6dVJzNX8vp9Q&usqp=CAU"></img>
      </div>
      <div className={styles.icon_bar}>
        <Link className={styles.navItem} to="/"><img className={styles.home_icons} alt="home" src="https://illustoon.com/photo/7783.png" />Home</Link>
        <Link className={styles.navItem} to="/post"><img className={styles.create_icons} alt="create" src="https://cdn-icons-png.flaticon.com/512/6537/6537820.png"/>Create</Link>
        <Link className={styles.navItem} to="/user/profile"><img className={styles.profile_icons} alt="profile_pic" src="https://images.unsplash.com/photo-1486663845017-3eedaa78617f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhbmRzY2FwZSUyMHdpdGglMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"/>Profile</Link>
      </div>
      <div className={styles.line}></div>
    </div>
  )
}

export default Navbar