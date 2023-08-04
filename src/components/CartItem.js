import { useDispatch } from "react-redux";
import { deleteToCart, updateCart } from "../store/cart-slice";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const CartItem = (props) => {
    const dispatch = useDispatch();
    
    const handerOnclickIncrease = () => {
        console.log('rat la la nha');
        const newQuantity = props.item.quantity + 1;
        dispatch(updateCart(props.item.productCartId, newQuantity))
    };

     
    const handleOnClickReduce = () => {

        console.log('rat la la nha');
        const newQuantity = props.item.quantity - 1;
        dispatch(updateCart(props.item.productCartId, newQuantity))
    };
    
    const handleOnClickDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteToCart(props.item.productCartId));
      };

    return (
        <tr>
            <td className="py-4">
                <div className="flex items-center">
                    <img className="h-16 w-16 mr-4" src={props.item.imageLink} alt="Product image"/>
                    <Link to={`/product/${props.item.id}`}><span className="font-semibold">{props.item.name}</span></Link>
                </div>
            </td>
            <td className="py-4">${props.item.price}</td>
                <td className="py-4">
                    <div className="flex items-center">
                        <button onClick={handleOnClickReduce} className="border rounded-md py-2 px-4 mr-2">-</button>
                        <span className="text-center w-8">{props.item.quantity}</span>
                        <button onClick={handerOnclickIncrease} className="border rounded-md py-2 px-4 ml-2">+</button>
                    </div>
                </td>
             <td className="py-4">${props.item.totalOfProductType}</td>
             <button onClick={handleOnClickDelete} className="py-8"><DeleteOutlined style={{ fontSize: "20px"}} /></button>
        </tr>
    );
};

export default CartItem;