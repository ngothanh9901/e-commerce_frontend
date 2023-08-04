import { Outlet} from "react-router-dom";
import { useDispatch} from "react-redux";
import { replaceCart } from "../store/cart-slice";
import { replaceUser } from "../store/user-slice";

const RootLayout = () => {
    const dispatch = useDispatch();
 
    
    dispatch(replaceCart());
    dispatch(replaceUser());


    console.log("root layout van chay");
    return (
        <>
            {/* <Header/> */}
            <Outlet/>
        </>
    );
};

export default RootLayout;
