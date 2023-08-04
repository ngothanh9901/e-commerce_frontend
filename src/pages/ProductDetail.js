import { faCartShopping, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { addToCart,deleteToCart } from "../store/cart-slice";
import Header from '../components/Header';

const ProductDetail = () => {

    const response = useLoaderData();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const isCart = cart.items.find(el => el.id === response.id);


    const handerAddToCart = (event) => {
        if(!isCart){
            event.preventDefault();
            console.log("khong biet co duoc k");
            dispatch(addToCart(response.id));
        }else{
            event.preventDefault();
            const productCart = cart.items.filter(x => x.id === response.id)[0];
            dispatch(deleteToCart(productCart.productCartId));
        }
    };



    return (
        <>
        <Header/>
        <section class="text-gray-700 body-font overflow-hidden bg-white">
            <div class="container px-5 py-24 mx-auto">
                <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" class="lg:w-1/4 w-full object-cover object-center rounded border border-gray-200" src={response.imageLink}/>
                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{response.name}</h1>
                    
                        <p class="leading-relaxed">{response.description}</p>
                        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                        <div class="flex">
                        <span class="title-font font-medium text-2xl text-gray-900">${response.price}</span>
                        <button onClick={handerAddToCart} class="flex ml-auto   border-0 py-2 px-6  rounded">
                            <FontAwesomeIcon icon={faCartShopping} className='text-2xl mr-6'/>
                            {isCart && <sup><FontAwesomeIcon icon={faCircleCheck} className='absolute right-[18px] text-[#00a046] bg-white rounded-full'/></sup>}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};
export default ProductDetail;