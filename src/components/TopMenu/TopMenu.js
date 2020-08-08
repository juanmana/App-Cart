import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {ReactComponent as Logo} from '../../assets/img/logo .svg'
import './TopMenu.scss'
import Cart from '../Cart'


const TopMenu = (props) => {


  const {productCart,getProductCart,products} = props
  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <Container>
        <BrandNav />
        <Cart productCart={productCart} getProductCart={getProductCart} products={products}/>
        {/* <MenuNav /> */}
      </Container>
    </Navbar>
  );
};

function BrandNav() {

  return <Navbar.Brand>

      <Logo />

      <h2>La Casa de los helados</h2>
  </Navbar.Brand>;
}



function MenuNav(){
    return(

        <Nav className="mr-auto">
     <Nav.Link href='#'>Aperitivos</Nav.Link>
     <Nav.Link href='#'>Comida</Nav.Link>
     <Nav.Link href='#'>Sabores</Nav.Link>

        </Nav>
    )
}





export default TopMenu;
