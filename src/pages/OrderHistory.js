import Header from "../components/Header";

const OrderHistory = () => {
    return (
        <>
            <Header/>
            <div className="container mx-auto mb-[20px] mt-[60px]">
                {/* <div>
                    <h1>Order History</h1>
                    <p>Here is your order history, purchases</p>
                </div> */}
                
                <div>
                    <div className="flex flex-row">
                        <div className="basis-1/3">
                            <h2>Date placed</h2>
                            <p>January 22, 2021</p>
                        </div>

                        <div className="basis-1/3">
                            <h2>Date placed</h2>
                            <p>January 22, 2021</p>
                        </div>

                        <div className="basis-1/3">
                            <h2>Date placed</h2>
                            <p>January 22, 2021</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderHistory;