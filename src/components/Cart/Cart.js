import React, { useState, useEffect } from "react";
import "./Cart.scss";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/img/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/img/cart-full.svg";
import { ReactComponent as Close } from "../../assets/img/close.svg";
import { ReactComponent as Garbage } from "../../assets/img/garbage.svg";
import { STORAGE_PRODUCT_CART, BASE_PATH } from "../../utils/constants";
import {
  removeArrayDuplicates,
  countDuplicateItemArray,
  removeitemArray
} from "../../utils/arrayFunc";

const Cart = props => {
  const { productCart, getProductCart, products } = props;

  const [cartOpen, setCartOpen] = useState(false);
  const widthCartContent = cartOpen ? 400 : 0;

  const [singleProductsCart, setSingleProductsCart] = useState([]);

  const [cartTotalPrice, setCartTotalPrice] = useState(0)

  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productCart);
    setSingleProductsCart(allProductsId);
  }, [productCart]);


  useEffect(() => {

const productData = [];
let totalPrice =  0;
const allProductsId = removeArrayDuplicates(productCart);
allProductsId.forEach(productId=>{

    const quantity = countDuplicateItemArray(productId,productCart)
    const productValue ={

        id: productId,
        quantity:quantity

    };
    productData.push(productValue)
})


if(!products.loading && products.result){

    products.result.forEach(product=>{
        productData.forEach(item=>{
            if(product.id == item.id){
            const totalValue = product.price * item.quantity;
            totalPrice = totalPrice + totalValue
            }
        })
    })
}

setCartTotalPrice(totalPrice)

}, [productCart, products]);



  const openCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };

  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCT_CART);
    getProductCart();
  };


  const increaseQuantity = (id)=>{

const arrayItemscart = productCart;
arrayItemscart.push(id);
localStorage.setItem(STORAGE_PRODUCT_CART, arrayItemscart)
getProductCart();

  }



  const decreaseQuantity = (id)=>{

    const arrayItemscart = productCart;
    const result = removeitemArray(arrayItemscart, id.toString())
    localStorage.setItem(STORAGE_PRODUCT_CART, result)
    getProductCart();
    
      }
  return (
    <>
      <Button variant="link" className="cart">
        {productCart.length > 0 ? (
          <CartFull onClick={openCart} />
        ) : (
          <CartEmpty onClick={openCart} />
        )}
      </Button>

      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
<div className="cart-content__products">
        {singleProductsCart.map((idProductsCart, index) => (
          <CartContentProducts
            key={index}
            products={products}
            idsProductsCart={productCart}
            idProductCart={idProductsCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />

      </div>
    </>
  );
};

function CartContentHeader(props) {
  const { closeCart, emptyCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={closeCart} />
        <h2>Carrito</h2>
      </div>

      <Button variant="link" onClick={emptyCart}>
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CartContentProducts(props) {
  const {
    products: { loading, result },
    idsProductsCart,
    idProductCart,
    increaseQuantity,
    decreaseQuantity
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCart == product.id) {
        const quantity = countDuplicateItemArray(product.id, idsProductsCart);

        return (
          <RenderProduct key={index} product={product} quantity={quantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
        );
      }
    });
  }

  return null;
}

function RenderProduct(props) {
  const { product, quantity,increaseQuantity,decreaseQuantity } = props;

  return (
    <div className="cart-content__product">
      <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />

      <div className="cart-content__product-info">
        <div>
          <h3>{product.name.substr(0, 25)}...</h3>
          <p>{product.price.toFixed(2)} € / ud.</p>
        </div>

        <div>
          <p>En carrito: {quantity} ud.</p>

          <div>
              <button onClick={()=>increaseQuantity(product.id)}>+</button>
              <button onClick={()=>decreaseQuantity(product.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function CartContentFooter(props){

const  {cartTotalPrice} = props;

return(


    <div className="cart-content__footer">

<div>


    <p>Total aproximado</p>
    { <p>{cartTotalPrice.toFixed(2)}</p>}

</div>

<button>Tramitar Pedido</button>

    </div>
)


}

export default Cart;
