import React, { Component } from "react"
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import classes from './Layout.module.css'

class Layout extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        <Header />
        <main>
          { this.props.children }
        </main>
        <Footer />
      </div>
    )
  }
}

export default Layout