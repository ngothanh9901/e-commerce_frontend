import { createSlice } from "@reduxjs/toolkit";

const initialStateUser = {
    avatar:null,
    name:null,
    email:null,
};

const userSlice = createSlice({
    name:'user',
    initialState:initialStateUser,
    reducers:{
        saveUserInformation(state,action){
            state.avatar = action.payload.avatar;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        isLoad(state){
            state.isLoad = !state.isLoad;
        },
        logout(state){
            console.log('da log out roi ma');
            state.name=null;
            state.email=null;
            state.avatar=null;
        },
        replaceUser(state,action){
            state.avatar = action.payload.avatar;
            state.name = action.payload.items;
            state.email = action.payload.email;
        }
    }

});




export const replaceUser = () => {
    return async (dispatch) => {
        let userInfor = {
            name : null,
            avatar: null,
            email:null,
        }
        
        const accessToken = localStorage.getItem('accessToken');
        console.log('day la token khi logout');
        console.log(accessToken);
        if(accessToken){
            const url = 'http://localhost:8080/user/me';

            const data = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }).then(data => data.json());
            
            userInfor = {
                name : data.name,
                avatar: data.avatar,
                email:data.email
            };

            dispatch(userAction.replaceUser(userInfor));
        }else{
            dispatch(userAction.replaceUser({
                items:[],
                totalQuantity:0,
                totalPrice:0
            }));
        }
            
    }
}

export const userAction = userSlice.actions;
export default userSlice;

