import { useNavigate } from "react-router-dom";


export default function HeaderCompo() {

    const nav = useNavigate();

    //const navLoginBtn = nav("/login");
    //const navSigninBtn = nav("/register"); 

    return (
        <div>
           
            <div className='container'>
                <div className="raw">
                    <header>
                        <div className="px-3 py-2 text-bg-dark border-bottom">
                            <div className="container">
                                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                                    
                                    {/* <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap" /></svg>
                                    </a> */}

                                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                                        <li>
                                            <a href="/" className="nav-link text-secondary">
                                                {/* <svg className="bi d-block mx-auto mb-1" width="2" height="2"><use xlinkHref="#home" /></svg> */}
                                                Home
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link text-white">
                                                {/* <svg className="bi d-block mx-auto mb-1" width="2" height="2"><use xlinkHref="#speedometer2" /></svg> */}
                                                Toy Catagories
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/contact-us" className="nav-link text-white">
                                                {/* <svg className="bi d-block mx-auto mb-1" width="2" height="2"><use xlinkHref="/contact-us" /></svg> */}
                                                Contact Us                                                
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/my-account" className="nav-link text-white">
                                                {/* <svg className="bi d-block mx-auto mb-1" width="2" height="2"><use xlinkHref="#grid" /></svg> */}
                                                My Account
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/cart" className="nav-link text-white">
                                                {/* <svg className="bi d-block mx-auto mb-1" width="2" height="2"><use xlinkHref="#people-circle" /></svg> */}
                                            {/* <svg className="bi d-block mx-auto mb-1" width="2" height="2"><use  /// xlink:href /// ="#people-circle" /></svg> */}
                                                Cart                                                
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-2 border-bottom mb-3">
                            <div className="container d-flex flex-wrap justify-content-center">

                                <form className="col-12 col-lg-8 mb-2 mb-lg-0 me-lg-auto" role="search">
                                    <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                                </form>

                                <div className="text-end">
                                    <button onClick={() => nav("/login")} type="button" className="btn btn-light text-dark me-2">Login</button>
                                    <button onClick={() => nav("/register")} type="button" className="btn btn-primary">Sign-up</button>
                                </div>

                            </div>
                        </div>
                    </header>

                </div>
            </div>





            <p>header page is rendering on web - end </p>

        </div>
    );


}