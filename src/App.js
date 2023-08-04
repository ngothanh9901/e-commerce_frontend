
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './pages/Root';
import Login from './pages/Login';
import {action as authAction} from './pages/Login';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import OrderHistory from './pages/OrderHistory';
import FormRegisterUser from './pages/FormRegisterUser';
import {action as registerAction} from "./pages/FormRegisterUser"

const router = createBrowserRouter([

  {
    path:'/',
    element:<RootLayout/>,
    loader: async ({request}) => {
      const url = new URL(request.url);
      const token = url.searchParams.get("token-google");
        if(token) {
          localStorage.setItem('accessToken', token);
        }
        console.log(token);
        return token;
    },
    children:[
        {
          index:true,
          element:<Home/>,
          loader: async () => {

            const url = "http://localhost:8080/api/product?pageNumber=1&pageSize=12";
            const response = await fetch(url, {method: 'GET',}).then(data => data.json());
            return response;
        }
      },

      {
        path:'/product/:id',
        element:<ProductDetail/>,
        loader: async ({params}) => {

          const url = `http://localhost:8080/api/product/${params.id}`;
          const response = await fetch(url, {method: 'GET',}).then(data => data.json());
          return response;
        }
      },
      {path:'/cart',element:<Cart/>},
      {path:'/order',element: <OrderHistory/>},      
      {path:'products',element:<Products/>},
      // {
      //   path:'/login',
      //   element:<Login/>,
      //   action:authAction
      // }
    ],
  },
  {
    path:'/login',
    element:<RootLayout/>,
    
    children:[
      {
        index:true,
        element:<Login/>,
        action:authAction,
      },
    ]
  },
  {
    path:'/register/user',
    element:<FormRegisterUser/>,
    action:registerAction,
  }




]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
