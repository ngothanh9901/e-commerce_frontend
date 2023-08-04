import { createSlice } from "@reduxjs/toolkit";

const initialStateCart = {
    items:[],
    totalQuantity:0,
    totalPrice:0,
    idOrder:null
};



const cartSlice = createSlice({
    name:'cart',
    initialState:initialStateCart,
    reducers:{
        replaceCart(state,action){
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice;
            state.idOrder = action.payload.idOrder;
        }
    }
});

export const replaceCart = () => {
    return async (dispatch) => {


      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      if(accessToken){
        console.log('chay vao cau lenh if')
          const url = "http://localhost:8080/api/order/cart";

          const data =  await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + accessToken,
              },
          }).then(data => data.json());

          console.log(data);

          const cart = {
              items:data.products,
              totalQuantity:data.quantity,
              totalPrice:data.sum,
              idOrder : data.idOrder
          }
          
          if(data && data.products){
            dispatch(cartAction.replaceCart(cart));
          }else{
            dispatch(cartAction.replaceCart({
              items:[],
              totalQuantity:0,
              totalPrice:0,
              idOrder:null
          }));
          }

          
        }else{
          console.log('chay vao cau lenh else')
          dispatch(cartAction.replaceCart({
            items:[],
            totalQuantity:0,
            totalPrice:0,
            idOrder:null
        }));
        }
        
    }
}

export const updateCart = (productCartId,quantity) => {
    return async (dispatch) => {

        const accessToken = localStorage.getItem('accessToken');
        
        const url = "http://localhost:8080/api/order/cart";

        const data = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productCartId: productCartId,
          quantity: quantity,
        }),
      }).then(data => data.json());

        const cart = {
            items:data.products,
            totalQuantity:data.quantity,
            totalPrice:data.sum,
            idOrder:data.idOrder
        }

      dispatch(cartAction.replaceCart(cart));

    };
};


export const addToCart = (id) => {
    return async (dispatch) => {
        const accessToken = localStorage.getItem('accessToken');
        const url = "http://localhost:8080/api/order";

        const data =  await fetch(url, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: id,
          }),
        }).then(data => data.json());

        console.log('this this add to cart');
        console.log(data);

        const cart = {
            items:data.products,
            totalQuantity:data.quantity,
            totalPrice:data.sum,
            idOrder:data.idOrder
        }

         dispatch(cartAction.replaceCart(cart));
    };
};


export const deleteToCart = (productCartId) => {
  return async (dispatch) => {
      const accessToken = localStorage.getItem('accessToken');
      const url = "http://localhost:8080/api/order/cart/"+productCartId;

      const data =  await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }).then(data => data.json());

      console.log('this this add to cart');
      console.log(data);

      const cart = {
          items:data.products,
          totalQuantity:data.quantity,
          totalPrice:data.sum,
          idOrder:data.idOrder
      }

       dispatch(cartAction.replaceCart(cart));
  };
};


export const cartAction = cartSlice.actions;
export default cartSlice;
