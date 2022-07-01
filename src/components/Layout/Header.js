import { Fragment } from "react";
import "./Header.css";
import food from "./food_img/image2.webp";
import { Cartbutton } from "./CartButton";

export default function Header(props) {
  return (
    <Fragment>
      <header class="header">
        <h1>Zomato</h1>
        <Cartbutton onClick={props.onShowCart}></Cartbutton>
      </header>

      <div class="main-image">
        <img src={food} alt="khana khazana"></img>
      </div>
    </Fragment>
  );
}
