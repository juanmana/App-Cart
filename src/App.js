import React,{useEffect,useState} from 'react';
import TopMenu from './components/TopMenu'
import useFetch from './hooks/useFetch'
import {urlApiProducts} from './utils/constants'
import Products from './components/Products'
import {STORAGE_PRODUCT_CART} from './utils/constants'
import { ToastContainer,toast} from 'react-toastify'

function App() {


    
 const products = useFetch(urlApiProducts, null)
 const [productCart, setProductCart] = useState([])


 useEffect(()=>{

getProductCart();
 },[])



 const getProductCart = () =>{


  const idProducts = localStorage.getItem(STORAGE_PRODUCT_CART)

  if(idProducts){
    const idProductsSplit = idProducts.split(',')
    setProductCart(idProductsSplit)
  }else{
    setProductCart([])
  }
 }
  

const addProductCart = (id,name)=>{

const idProducts = productCart;

idProducts.push(id)
setProductCart(idProducts)

localStorage.setItem(STORAGE_PRODUCT_CART, productCart)

getProductCart();

toast.success(`${name} añadido al carito correctamente`)

}

  return (
    <div>
    <TopMenu productCart={productCart} getProductCart={getProductCart} products={products}/>
    <Products products={products} addProductCart={addProductCart}/>
    <ToastContainer 
    position="bottom-left"
    autoClose={5000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover={false}
    
    
    />
    </div>
  );
}

export default App;
