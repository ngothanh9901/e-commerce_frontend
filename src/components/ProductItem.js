
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartShopping,faCircleCheck} from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { addToCart,deleteToCart } from "../store/cart-slice";
const ProductItem = ({product}) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    console.log('day la car trong product Itme');
    console.log(cart);
    const isCart = cart.items.find(el => el.id === product.id);


    const handerAddToCart = (event) => {
        if(!isCart){
            event.preventDefault();
            console.log("khong biet co duoc k");
            dispatch(addToCart(product.id));
        }else{
            event.preventDefault();
            const productCart = cart.items.filter(x => x.id === product.id)[0];
            dispatch(deleteToCart(productCart.productCartId));
        }
    };



    
    return (
        
        <Link to={`/product/${product.id}`}  className='w-[300px] h-[400px] shadow-md mt-[10px] border relative rounded-lg productItem transition-all duration-300 sm:mr-[5px] sm:ml-[5px]'>
            <img className='w-[150px] m-auto mt-[50px]' src={product.imageLink} alt={product.name}/>
            <div className='absolute left-0 right-0 top-[250px] text-center'>{product.name}</div>
            <div className='absolute left-0 right-0 bottom-[45px] flex justify-between items-center'>
                <span className='ml-4 text-xl'>${product.price}</span>
                <button onClick={handerAddToCart}>
                   
                    <div className='relative'>
                        <FontAwesomeIcon icon={faCartShopping} className='text-2xl mr-6'/>
                        {isCart && <sup><FontAwesomeIcon icon={faCircleCheck} className='absolute right-[18px] text-[#00a046] bg-white rounded-full'/></sup>}
                    </div>

                </button>
            </div>
        </Link>
    )
};

export default ProductItem;