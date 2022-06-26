
import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from '../redux/cart/types';
export const getCartFromLS = () => {
  const data = localStorage.getItem("cartItems")
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)

  return {
    items: items as CartItem[],
    totalPrice
  }
  
}