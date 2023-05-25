import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice=action.payload.map((array)=>array.price)
    maxPrice=Math.max(...maxPrice)
    console.log(maxPrice)
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters:{
        ...state.filters,
        max_price:maxPrice,
        price:maxPrice
      }
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true
    }
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false
    }
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload
    }
  }
  if (action.type === SORT_PRODUCTS) {

    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products]
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => (
        a.price - b.price
      ))
    }
    if (sort === "price-higest") {
      tempProducts = tempProducts.sort((a, b) => (
        b.price - a.price
      ))
    }


    // if (sort === "name-a") {
    //   tempProducts = tempProducts.sort((a, b) => (
    //     a.name.localeCompare(b.name)
    //   ));
    // }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    }
    
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => (
        b.name.localeCompare(a.name)
      ));
    }
    return {
      ...state,
      filtered_products: tempProducts
    }
  }
  if(action.type === UPDATE_FILTERS){
    const {name,value}=action.payload
    return{
      ...state,
      filters:{
        ...state.filters,
        [name]:value
      }
    }
  }
  if(action.type === FILTER_PRODUCTS){
    const {all_products}=state
    const{text,company,category,color,price,shipping}=state.filters
    let tempProducts=[...all_products]

    if(text){
      tempProducts=tempProducts.filter((product)=>{
        console.log(product)
        // return product.name.toLowerCase().startsWith(text)
        return product.name.toLowerCase().includes(text.toLowerCase());
      })
    }

    if(category !== "all"){
      tempProducts = tempProducts.filter((product)=>product.category === category)
    }
    if(company !== "all"){
      tempProducts = tempProducts.filter((product)=>product.company === company)
    }


    return{
      ...state,
      filtered_products:tempProducts
    }
  }
  if(action.type===CLEAR_FILTERS){
    return{
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
