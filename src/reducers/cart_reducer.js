import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((i) => i.id === id + color)

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...state, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    }
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }

      return { ...state, cart: [...state.cart, newItem] }
      // throw new Error(`No Matching "${action.type}" - action type`)
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    // eslint-disable-next-line array-callback-return
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {

        if (value === "inc") {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }

        }
        if (value === "dec") {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }

        }

      } else {
        return item;
      }
    })
    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_item, total_amount } = state.cart.reduce((total, cartItem) => {
      const { amount, price } = cartItem
      total.total_item += amount
      total.total_amount += price * amount
      console.log(total.total_item)
      console.log(total.total_amount)
      console.log(total)
      return total
    }, {
      total_item: 0,
      total_amount: 0,
    })
    return { ...state, total_item, total_amount }
  }
}
export default cart_reducer
