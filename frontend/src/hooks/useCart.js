import React, { createContext, useContext, useState, useEffect} from 'react';


const CartContext = createContext(null);
const CART_KEY = 'cart';  
const EMPTY_CART = {
   items:[],
   totalPrice: 0,
   totalCount: 0,

};

export default function CartProvider({ children }) {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems ] = useState(initCart.items);
    const [totalPrice,setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount,setTotalCount] = useState(initCart.totalCount);

    useEffect(() => {
      const totalPrice = sum(cartItems.map(item => item.price));
      const totalCount = sum(cartItems.map(item => item.quantity));
    
      setTotalPrice(totalPrice);
      setTotalCount(totalCount);
    
      // Store updated cart in local storage
      localStorage.setItem(
        CART_KEY,
        JSON.stringify({
          items: cartItems,
          totalPrice,
          totalCount,
        })
      );
    }, [cartItems]); // Run this effect only when cartItems change
    

   function getCartFromLocalStorage(){                     //without localstorage method ,all the cart details will loose when refresh
     try{
       const storedCart = localStorage.getItem(CART_KEY);
       console.log("Stored cart: ", storedCart); //Log stored cart content
       return storedCart? JSON.parse(storedCart) : EMPTY_CART;
   } catch (error){
       console.error("Error parsing stored cart:" , error);
       return EMPTY_CART;
   }
  }



   const sum = items => {         //this items are not cart items,they are list of price or quantity
     return items.reduce((prevValue, curValue) => prevValue + curValue, 0);

   };

   const removeFromCart = foodId => {
     const filteredCartItems = cartItems.filter(item => item.food.id !== foodId);
     setCartItems(filteredCartItems);

   };

   const changeQuantity = (cartItem, newQuantity) => {
   const { food } = cartItem; //get food from the cart item
   
   const changedCartItem = {  // create a new cart item called changecartitem which is an object that has prvious values of the cartitem.
    ...cartItem,             
    quantity: newQuantity,
    price: food.price * newQuantity,
   };

   setCartItems(
    cartItems.map(item => (item.food.id === food.id ? changedCartItem : item))
   )
   };

   const addToCart = food => {
     const cartItem = cartItems.find(item => item.food.id === food.id);
     if(cartItem){
        changeQuantity(cartItem, cartItem.quantity + 1);
     }else
     {
       setCartItems([...cartItems, {food, quantity:1, price:food.price}])

     }
   };

 return (
  <CartContext.Provider
   value={{ 
    cart: { items: cartItems, totalPrice, totalCount },
    removeFromCart,
    changeQuantity,
    addToCart,
    }}
   >

    {children}
   </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
