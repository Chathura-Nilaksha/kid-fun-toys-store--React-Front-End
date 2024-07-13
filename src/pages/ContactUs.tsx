import ClothifyHeader from "./clothifyHeader.1";
import HeaderCompo from "./HeaderCompo";

export default function ContactUs() {

    return (
        <div>
            <div className="conrainer">
                <div className="raw text-center">
                    <HeaderCompo />
                </div>
            </div>
            <div className="conrainer">
                <div className="raw text-center" >
                    <ClothifyHeader />
                </div>
            </div>
            
            <div className="container">
                <div className="raw">


                    <div className="my-3 p-3 bg-body rounded shadow-sm">
                        <h6 className="border-bottom pb-2 mb-0"><strong>Do not Hesitate to Contact Us</strong></h6>
                        <div className="d-flex text-body-secondary pt-3">
                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                <div className="d-flex justify-content-between">
                                    <strong className="text-gray-dark">Address</strong>
                                    <a href="#">Location in the Google Map</a>
                                </div>
                                <span className="d-block">Kids FUN Toys Store (PVT) Ltd, No.100, Walana, Panadura.</span>
                            </div>
                        </div>
                        <div className="d-flex text-body-secondary pt-3">
                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                <div className="d-flex justify-content-between">
                                    <strong className="text-gray-dark">Contact Number</strong>
                                    <span><a href="#">Whatsapp</a><span>&nbsp;( Same Number )</span></span>
                                </div>
                                <span className="d-block">+94 123 456 789</span>
                            </div>
                        </div>
                        <div className="d-flex text-body-secondary pt-3">
                            <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                <div className="d-flex justify-content-between">
                                    <strong className="text-gray-dark">E-mail</strong>                                   
                                </div>
                                <span className="d-block">kidsfuntoys@gmail.com</span>
                            </div>
                        </div>

                        <small className="d-block text-end mt-3">
                            <a href="#">Follow us on Facebook</a>
                        </small>
                    </div>

                </div>
            </div>


        </div>
    );
}