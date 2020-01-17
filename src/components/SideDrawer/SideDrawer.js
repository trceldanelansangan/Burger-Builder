import React from "react";
import classes from "./SideDrawer.css";
import Logo from "./../Logo/Logo";
import NavigationItems from "./../Navigation/NavigationItems/NavigationItems";
import BackDrop from "./../UI/Backdrop/Backdrop";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

const sideDrawer = props => {

  let classSideDrawer = [classes.SideDrawer, classes.Close]
  if(props.showSideDrawer){
    classSideDrawer = [classes.SideDrawer, classes.Open]
  }

  return (
    <Auxiliary>
      <BackDrop show={props.showSideDrawer} clicked={props.closeSideDrawer}/>
      <div className={classSideDrawer.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
