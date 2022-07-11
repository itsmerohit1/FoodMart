import { Fragment } from "react";
import "./Header.css";
import food from "./food_img/image2.webp";
import { Cartbutton } from "./CartButton";

export default function Header(props) {
  return (
    <Fragment>
      <header class="header">
        <h1>Food Plaza</h1>
        <Cartbutton onClick={props.onShowCart}></Cartbutton>
      </header>

   
      
    </Fragment>
  );
}
