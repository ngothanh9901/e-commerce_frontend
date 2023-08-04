
import { useLoaderData } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { ProductFilters } from "../components/product-filters/ProductFilters";
import Pagination from "../components/utils/Pagination";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const Home = () => {

    const response = useLoaderData('');
    const [products,setProducts] = useState(response.content);
    const totalPages = response.totalPages;
    const [currentPage,setCurrentPage] = useState(1);

    
    useEffect(() => {
        async function fetchData() {
            const url = "http://localhost:8080/api/product?pageNumber="+currentPage+"&pageSize=12";
            const data = await fetch(url, {method: 'GET',}).then(data => data.json());
            setProducts(data.content);
          }
          fetchData();
    },[currentPage]);


    const renderProducts = () => {
        return products?.map(product => <ProductItem product={product} key={product.id}/>)
    }


    console.log('ngoducthanh');
    return (
        <>
        <Header/>
            <div className='container mb-[20px] mt-[60px] max-w-[1240px] flex flex-col justify-center items-center xl:flex xl:justify-center xl:flex-row xl:items-start mx-auto transition-all flex-auto'>
               
                <div className='lg:w-3/5 xl:w-1/5 flex flex-col items-center mt-[10px]'>
                    <ProductFilters/>
                </div>

                <div className='w-4/5 flex flex-wrap justify-center md:w-full xl:justify-start xl:ml-[20px]'>
                    {renderProducts()}
                </div>
            </div>
            <div class="flex justify-center ...">
                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </>
    )
}

export default Home;


