
import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from '../redux/cart/types';
export const getCartFromLS = () => {
  // const data = localStorage.getItem("cartItems") || ""
  // const isDataArray = Array.isArray(JSON.parse(data))

  // if(isDataArray){
  //   const cart = JSON.parse(data)    
  //   const totalPrice = calcTotalPrice(cart);
  //   return { items: cart ? cart : [], totalPrice}
  // } else {
  //   return {items: [], totalPrice: 0}
  // }

  const data = localStorage.getItem("cartItems")
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)

  return {
    items: items as CartItem[],
    totalPrice
  }
  
}