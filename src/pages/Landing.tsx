import {Col, Row } from "react-bootstrap";
import ClothifyHeader from "./clothifyHeader.1";
import HeaderCompo from "./HeaderCompo";
import StoreItemNew from "../components/StoreItemNew";
import storeItems from "../data/landingPageItems.json"

export default function Landing() {
    return (
        <div>
            <div className="conrainer"><div className="raw text-center"><HeaderCompo /></div></div>               
            <div className="conrainer"><div className="raw text-center"><ClothifyHeader /></div></div>                    
            =============== BELLOW IS THE LANDING PAGE ======
            landing page - HAVE TO ADD THINGS IN THIS LANDING PAGE
            =================================================

            {/* <StoreItemNew id={0} name={"check"} price={0} /> */}
            <Row className="g-3 mt-4" lg={3} md={2} xs={1} >
                {storeItems.map(item => (
                    <Col key={item.id}>
                        <StoreItemNew {...item} />
                    </Col>
                ))
                }
            </Row> 

        </div>
    );
}