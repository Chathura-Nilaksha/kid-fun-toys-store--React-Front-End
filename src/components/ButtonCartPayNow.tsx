import "./ButtonCartPayNow.css"
import { Link} from "react-router-dom"


function ButtonCartPayNow(props: any) {

    return (
        <>
            <Link to={props.locationToRoute}>      {/*   "/login" */}
                <button className={props.classname}>{props.children}</button>
            </Link>
        </>
    )

}

export default ButtonCartPayNow