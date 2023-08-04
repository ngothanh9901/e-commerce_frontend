import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import { replaceCart } from "../store/cart-slice";
import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
async function callAPIPayment(sum, idOrder) {
    const url =
      "http://localhost:8080/paypal/make/payment?sum=" +
      sum +
      "&idOrder=" +
      idOrder;
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
}  




const Cart = () => {

    const cart = useSelector((state) => state.cart);
    const dispatch=useDispatch();



    const params = new URLSearchParams(window.location.search);
    const [idOrder,setIdOder] = useState(params.get("idOrder"));
    const [paymentId,setPaymentId] = useState(params.get("paymentId"));
    const [PayerID,setPayerID] = useState(params.get("PayerID"));

    useEffect(()=>{
        
        async function callAPIConfirm(idOrder,paymentId,PayerId){
            const url = "http://localhost:8080/paypal/complete/payment/?idOrder="+idOrder+"&paymentId="+paymentId+"&PayerID="+PayerId;
            const data =  await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
            }).then(data => data.json());

            dispatch(replaceCart());

            return data;
        }



        if(idOrder && paymentId && PayerID){
            callAPIConfirm(idOrder,paymentId,PayerID);
        }

    },[idOrder,paymentId,PayerID]);
       

    const handleOnClickPayment = async (e) => {
        e.preventDefault();
        console.log('day laf total price');
        console.log(cart.totalPrice);
        const data = await callAPIPayment(cart.totalPrice,cart.idOrder);
       
        window.location.replace(data.redirect_url);
    };

    return(
    <>
        <Header/>
  
    <div className="bg-gray-100 h-screen py-8 ">
        <div className="container mx-auto px-4 mt-20">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left font-semibold">Product</th>
                                    <th className="text-left font-semibold">Price</th>
                                    <th className="text-left font-semibold">Quantity</th>
                                    <th className="text-left font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.items.map(item => <CartItem item={item} key={item.id}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${cart.totalPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Taxes</span>
                            <span>$0.00</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>$0.00</span>
                        </div>
                        <hr className="my-2"/>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">${cart.totalPrice}</span>
                        </div>
                        <button onClick={handleOnClickPayment} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                    </div>



                    <CChart
                        type="doughnut"
                        data={{
                            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                            datasets: [
                            {
                                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                                data: [40, 20, 80, 10],
                            },
                            ],
                        }}
                    />






                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default Cart;