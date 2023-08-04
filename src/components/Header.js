import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCartShopping, faSearch, faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);

    const [displayDropDown,setDisplayDropDown] = useState(false);

    const handerLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const onClick = async(e) => {
        e.preventDefault();
        setDisplayDropDown(!displayDropDown);
    };


    return (
        <header className='w-screen bg-[#221f1f] fixed z-10 top-0 h-[50px]'>
            <div className='container text-lg flex justify-between items-center text-white h-[50px] max-w-[1540px] m-auto px-2'>
                <a href='/' >React Shop</a>

                <ul className='flex justify-between'>
                    <li className='mr-2 px-[8px] py-1 rounded hover:bg-gray-600 transition cursor-not-allowed md:mr-4'>
                        <Link to='/'>Home</Link>
                    </li>
                  
                    <li className='mr-2 px-[8px] py-1 rounded hover:bg-gray-600 transition cursor-not-allowed md:mr-4'>
                        <Link to='/order'>Order</Link>
                    </li>
                </ul>
            {/* <Search></Search> */}

                <ul className='flex justify-evenly w-1/6'>
                    <button className='block mr-2 px-[8px]'>
                        <FontAwesomeIcon icon={faSearch} />
                        
                    </button>

                    <button className='px-[6px] py-1 rounded hover:bg-gray-600 transition relative'>
                        <Link to='/cart'><FontAwesomeIcon icon={faCartShopping} className='text-xl'/></Link>
                        {cart.totalQuantity > 0 && <span className='absolute right-[-7px] top-0 bg-[#00a046] text-[12px] h-[10px] flex items-center justify-center px-[7px] py-[10px] rounded-full'>{cart.totalQuantity}</span>}
                    </button>

                    <button className='block mr-2 px-[8px]'>
                        {user.avatar ? <button onClick={onClick}><img className="mr-17 w-8 h-8 rounded-full" src={user.avatar} alt="Rounded avatar"></img></button>: <button onClick={onClick}><FontAwesomeIcon icon={faUser} className='text-xl'/></button>}

                                    {/* <!-- Dropdown menu --> */}
                        <div id="dropdownAvatarName"  className={displayDropDown?"mt-3 absolute right-[125px]  z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700 dark:divide-gray-600":"hidden"}>
                            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div class="font-medium ">{user.name}</div>
                                <div class="truncate">{user.email}</div>
                            </div>
                            {/* <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                            </ul> */}
                            <div class="py-2">
                                <button onClick={handerLogout} class="w-60 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</button>
                            </div>
                        </div>

                    </button>

                </ul>

            </div>

        </header>
    );
};

export default Header;
