import { Col, Row } from "react-bootstrap";
import StoreItemNew from "../components/StoreItemNew.tsx";
import storeItems from "../data/landingPageItems.json";

export default function MyAccount() {

    return (
        <>
            <Row className="g-3 mt-4" lg={3} md={2} xs={1} >
                {storeItems.map(item => (
                    <Col key={item.id}>
                        <StoreItemNew id={100} name={"test"} price={100} />
                    </Col>
                ))
                }
            </Row>

            {/* 
                    <Col key={item.id}>
                        <StoreItemNew {...item} />
                    </Col>
               
             */}
        </>
    );
}
