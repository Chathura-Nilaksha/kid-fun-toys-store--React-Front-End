// import ButtonCartPayNow from "../components/ButtonCartPayNow";
// import axios from "axios";
// import { post } from "jquery";
import "../components/ButtonCartPayNow.css";
import "./Cart.css"
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/landingPageItems.json";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

// isSaveBillingDataInDB , isSaveShippingDataInDB
// USEFORM official doc has as type as below.
// type FormValues = {
//   firstName: string
//   lastName: string
//   email: string
// }
    // USEFORM official doc has as type as below.
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("firstName")} />
    //   <input {...register("lastName")} />
    //   <input type="email" {...register("email")} />

    //   <input type="submit" value="Send"/>    
    // </form>

interface FormInputCart {  
    firstName: string,   // need to change these variables--ship    
    lastName: string,
    phoneNumber: string,
    email: string,
    addressLine1: string,
    addressLine2: string,
    country: string,
    district: string,

    firstNameBill: string,   //From here billing address data
    lastNameBill: string,
    emailBill: string,
    addressLine1Bill: string,
    addressLine2Bill: string,
    countryBill: string,
    districtBill: string

    // isSaveBillingDataInDB: boolean,
    // isSaveShippingDataInDB: boolean,

    // debit: string,
    // credit: string,
    ccName:  string,
    ccNumber: number,
    ccExpiration: number,
    cccvv: number,
}

export default function Cart() {
    const { cartQuantity, cartItems, removeFromCart } = useShoppingCart();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormInputCart>()

    const submitForm = async (customerAndOrderData: FormInputCart) => {
        
        let customerAndOrderDataWithDBSaves =  { customerAndOrderData,
                                                 isSaveShippingDataInDB, 
                                                 isSaveBillingDataInDB, 
                                                 cardType,
                                                 cartItems,
                                                 grandTotal }
                                               
        alert(JSON.stringify(customerAndOrderDataWithDBSaves))
        alert(" The form has been submitted successfully ")
        console.log(customerAndOrderDataWithDBSaves);
        console.log("sending or not to BE-ship data- " + isSaveShippingDataInDB);
        console.log("sending or not to BE-bill data- " + isSaveBillingDataInDB);
        const response = await fetch("http://localhost:8081/customer/save-details", 
            {   method : "POST",
                body: JSON.stringify(customerAndOrderDataWithDBSaves),
                headers: { "Content-Type": "application/json" }          }        
        )
        console.log(response.status);
        

        // axios.post('http://localhost:8081/customer/save-details', customerData) // change the http address correctly
        //     .then((response) => {
        //         console.log(response);
        //         console.log("response came");
        //         $("thank-you-message").prop("hidden", false);
        //         //Above (May be a JQUERY)for-show the "thank-you-message" tag when reponse ok
        //     });
    }

    // function calculatingSubTotal() {
    //     let rs: any = document.getElementById("unitPriceOfItem")?.nodeValue;
    //     let qty: any = (document.getElementById("qtyOfItem") as HTMLSpanElement | null)?.nodeValue;
    //     let subTotal: number = rs * qty;
    //     return subTotal;
    // }
    // function calculatingGrandTotal() {const grandTotal : number += subTotal;return grandTotal;}
    const grandTotal : number = cartItems.reduce((subTot, item) => 
                                                   (subTot + item.quantity*(storeItems.find(i => i.id === item.id )?.price || 0))
                                                    ,0) ;
    // eachCartItem.quantity * (storeItems.find(i => i.id === eachCartItem.id )?.price || 0). // const cartQuantity = 1;
    
    // const saveShippingAddressDataTesting = (event : any) => {
    //     const FormDataTesting = new FormData(event.currentTarget);
    //     const firstNameShiptesting = FormDataTesting.get("firstName");
    //     console.log({firstNameShiptesting}); 
    //     if(FormDataTesting.get("firstName") ) {
    //         setValBillFirstName(FormDataTesting.get("firstName")) 
    //     }       
    // }    
    // const[saveShippingAddress, setSaveShippingAddress] = useState(false);

// RELATED to- Save Shipping Data InDB  
    const [isSaveShippingDataInDB, setIsSaveShippingDataInDB] = useState(false); 
    // isSaveShippingDataInDB --> need to send this value to DB too to save shipping data as an object
    const handleSaveShipping = (e : any) => { //this is to --> save Ship addr.details
        console.log(e.target.checked, isSaveShippingDataInDB);
        console.log("status of isSaveShippingDataInDB" + isSaveShippingDataInDB);
        setIsSaveShippingDataInDB(e.target.checked);

        // if(e.target.checked){ // here put a function when tick to add shipaddress data to save in BE
        //     console.log("save Shipping data in the database");
        //     setIsSaveShippingDataInDB(true);
        //     console.log(isSaveShippingDataInDB);
        // }else{
        //     setIsSaveShippingDataInDB(false);
        //     console.log(isSaveShippingDataInDB);
        // }// setSaveShippingAddress(e.target.checked);
    }  
    useEffect(() => {
        if (isSaveShippingDataInDB) {
        console.log("Save shipping data in the database");
        console.log(isSaveShippingDataInDB);
        // Call your function to save shipping data to backend here
        }
        console.log(isSaveShippingDataInDB);
    }, [isSaveShippingDataInDB]);

//RELATED to- Save Billing Data InDB
    const [isSaveBillingDataInDB, setIsSaveBillingDataInDB] = useState(false); 
        // isSaveBillingDataInDB --> need to send this value to DB too to save billing data as an object

    const handleSaveBilling = (e : any) => { //this is to --> save Billing addr.details
        console.log(e.target.checked, isSaveBillingDataInDB);
        console.log("status of isSaveBillingDataInDB" + isSaveBillingDataInDB);
        setIsSaveBillingDataInDB(e.target.checked);
    }
    useEffect(() => {
        if (isSaveBillingDataInDB) {
        console.log("Save billing data in the database");
        console.log(isSaveBillingDataInDB);
        // Call your function to save billing data to BE here
        }
        console.log(isSaveBillingDataInDB);
    }, [isSaveBillingDataInDB]);


    // const [assignShippingAddressData, setAssignShippingAddressData ] = 
    //     useState({ 
    //         // Document.getElementById("firstNameBill")?.value = "",
    //         firstName : ""
    //     })
    // const shippingAddressDataArray : string [] = [
    //     shipingFirshName,
    //     ar
    // ]
    //let shipFirstName :string=""//let billFirstName :string=""//let shipEmail :string//let billEmail:string;
    //const [shipEmail, setShipEmail] = useState();
    // const shipFirstName : any ;
    // document.getElementById("firstName").addEventListener("change", updateValue);
    // function updateValue(e: Event) {
        // shipFirstName ;
    // }
    // const [valFirstName, setValFirstName] = useState("")
    // const [valBillFirstName, setValBillFirstName] = useState("")

    const [isSameAsShippingAddress, setIsSameAsShippingAddress] = useState(false);   
    
    const valFirstName = watch("firstName");
    const valLastName = watch("lastName");    
    const valEmail = watch("email");
    const valAddressLine1 = watch("addressLine1");
    const valAddressLine2 = watch("addressLine2");
    const valCountry = watch("country");
    const valDistrict = watch("district");

    const handleBillingEqualsShippingAddress = (e : any) => { //this is to --> make Billing addr = to Ship addr
        console.log(e.target.checked);
        if(e.target.checked){
            setValue("firstNameBill", valFirstName);
            setValue("lastNameBill", valLastName);
            setValue("emailBill", valEmail);
            setValue("addressLine1Bill", valAddressLine1);
            setValue("addressLine2Bill", valAddressLine2);
            setValue("countryBill", valCountry);
            setValue("districtBill", valDistrict);
            setIsSameAsShippingAddress(true)
            console.log(valLastName)
            // setValFirstName(document.getElementById("firstName")?.nodeValue || "")
            console.log("command to fill Billing data as Shipping addr data");// here put a function when tick to add shipaddress data to save in BE
            // setValBillFirstName(valFirstName)
            //setAssignShippingAddressData({
                //firstNameBill: firstName,
            //})
            // type here relevent com            
            // document.getElementById("firstNameBill")?.nodeValue =
            // billEmail = shipEmail;
            //console.log(shipFirstName)
            
            //console.log(register.firstName)
            // document.getElementById("firstNameBill")?.setAttribute("value", shipFirstName);
            //register.firstNameBill = firstNameShiptesting;
        }else{
            setIsSameAsShippingAddress(false)
        }
    }

    const [ countriesArray, setCountriesArray ] = useState([]);

    useEffect (() => {fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then(
            (res) => {setCountriesArray(res); 
                        //  console.log(...res)
                    }
        )}, []
    );                                               

// Payment-cardType --USESTATE()
    const[cardType, setCardType] = useState<string>();


    return (
        <form className="container" method="post" onSubmit={handleSubmit(submitForm)} > 
                                                {/* onSubmit={handleSubmit(onSubmit) */}
            <div className="bg-body-tertiary">
                <div className="container">
                    <main>
                        <div className="py-5 text-center">
                            <h2><strong> Cart to Payment for Your Items </strong></h2>
                        </div>

                        <div className="row g-5">
                            {/* div-START of cart box */}
                            <div className="col-md-6 col-lg-5 order-md-last bg-danger ">
                                <h4 className="d-flex justify-content-between align-items-center mb-3 mt-2">
                                    <span className="text-primary ms-1">Your cart</span>
                                </h4>

                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="align-text-top">Item Code</th>
                                            <th scope="col" className="align-text-top">Description</th>
                                            <th scope="col">
                                                <div>
                                                    <div><span>Unit Price </span></div>
                                                    <div className="text-body-secondary text-end">Rs.</div>
                                                </div>
                                            </th>
                                            <th scope="col" className="align-text-top">Quantity</th>
                                            <th scope="col">
                                                <div>
                                                    <div><span>Sub Total </span></div>
                                                    <div className="text-body-secondary text-end">Rs.</div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    
                                        <tbody> 
                                            {cartQuantity > 0 
                                                && 
                                                    cartItems.map(eachCartItem =>{                                                                            
                                                        return (
                                                            <tr key={eachCartItem.id}>
                                                                {/* <th scope="row">2</th> */}                                                                       
                                                                <td>{ eachCartItem.id} </td>
                                                                <td>{storeItems.find(i => i.id === eachCartItem.id )?.name}</td> 
                                                                <td className="text-end">{storeItems.find(i => i.id === eachCartItem.id )?.price}</td>
                                                                <td className="text-end">{ eachCartItem.quantity}</td>
                                                                <td className="text-end">
                                                                    { eachCartItem.quantity * (storeItems.find(i => i.id === eachCartItem.id )?.price || 0) }
                                                                </td>
                                                                <td className="text-end">
                                                                    <Button variant="outline-danger" size="sm" onClick={()=>{removeFromCart(eachCartItem.id)}}>&times;</Button>
                                                                </td>
                                                                {/* <td className="text-end">{calculatingSubTotal()}</td> */}
                                                            </tr>
                                                        )
                                                    })                                            
                                            }
                                            <tr>                                                
                                                <td colSpan={4} ><strong>Total </strong></td>
                                                {cartQuantity > 0 ? (
                                                    <td className="text-end"><strong>{grandTotal}</strong></td>
                                                // {/* {<td>{calculatingGrandTotal()}</td>} */}
                                                    ):(
                                                    <td className="text-end"><div><strong>0.00</strong></div></td>
                                                    )
                                                }                                                
                                            </tr>                
                                        </tbody>                                    
                                </table>

                                {/* <ul className="list-group mb-3"> */}

                                    {/* <li className="list-group-item d-flex justify-content-between lh-sm">
                                        <div >
                                            <h6 className="my-0">Item Code</h6>
                                            <small className="text-body-secondary">Description</small>
                                        </div>
                                        <div>
                                            <h6 className="my-0">Unit Price</h6>
                                            <small className="text-body-secondary">Rs.</small>
                                        </div>
                                        <span className="my-0">Quantity</span>
                                        <span className="my-0">Quantity</span>
                                        <div>
                                            <h6 className="my-0">Sub Total</h6>
                                            <small className="text-body-secondary">Rs.</small>
                                        </div>
                                    </li> */}
                                    {/* <li className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">..item code..</h6>
                                            <small className="text-body-secondary">..description...</small>
                                        </div>
                                        <span className="text-body-secondary" id="unitPriceOfItem">11</span>
                                        <span className="text-body-secondary" id="qtyOfItem">22</span>
                                        <span className="my-0 align-text-center" id="subTotalOfItem">{calculatingSubTotal()}</span>
                                    </li> */}
                                    {/* <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                                        <div className="text-success">
                                            <h6 className="my-0">Promo code</h6>
                                            <small>EXAMPLECODE</small>
                                        </div>
                                        <span className="text-success">5</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <strong>Total </strong>
                                        <strong>20</strong>
                                    </li> */}
                                {/* </ul> */}

                                {/* <form className="card p-2 mb-3 m-3">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Promo code" />
                                        <button type="submit" className="btn btn-secondary">Redeem</button>
                                    </div>
                                </form> */}
                            </div>

                            {/* div-end of cart box */}


                            {/* START of SHIPPING */}

                            <div className="col-md-6 col-lg-7">
                                <h4 className="mb-3"><strong>Shipping Address</strong></h4>

                                <div>   {/*  <form className="needs-validation"> */}
                                    <div className="row g-3">
                                        <div className="col-sm-6 ">
                                            <label htmlFor="firstName" className="form-label">First name </label>
                                            <input type="text" className="form-control" id="firstName"   /* required */
                                                //value={ }  //onChange={ }                                                                                 
                                                
                                                {...register("firstName", { required: {value : true, message : "First name is requred"} })} 
                                                // aria-invalid={errors.firstName ? "true" : "false"}
                                                />
                                            <p>{errors.firstName?.message}</p>

                                            {/* Below validating lines were there in all input areas at the initial stage.
                                            <div className="invalid-feedback"> Valid first name is required.</div> */}                                             
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="lastName" className="form-label">Last name </label>
                                            <input type="text" className="form-control" id="lastName" placeholder=""
                                                {...register("lastName", { required: {value : true, message : "Last name is requred"} })} />
                                            <p>{errors.lastName?.message}</p>
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="phone-number" className="form-label">Phone Number</label>
                                            <input type="text" className="form-control" id="phoneNumber" placeholder="Ex: 0771234567" 
                                                {...register("phoneNumber", 
                                                                { required: {value : true, message : "Phone number is requred" } 
                                                                    //  valueAsNumber: true  <---this is only to type="number" 
                                                                }
                                                                )}/>
                                            <p>{errors.phoneNumber?.message}</p>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                                            <input type="email" className="form-control" id="email" placeholder="you@example.com" 
                                                //value={shipEmail}
                                                {...register("email", { required: {value : true, message : "Email is requred"}, 
                                                                        validate : (fieldValue) => {
                                                                            return (
                                                                                fieldValue !== "admin@example.com" ||
                                                                                "Enter a different email address"
                                                                            )
                                                                        }}
                                                                        )
                                                                        }/>
                                            <p>{errors.email?.message}</p>                                            
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="addressLine1" placeholder="1234 Main St"
                                                {...register("addressLine1", { required: {value : true, message : "Address is requred"} })}/>
                                            <p>{errors.addressLine1?.message}</p>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address2" className="form-label">Address 2 <span className="text-body-secondary">(Optional)</span></label>
                                            <input type="text" className="form-control" id="addressLine2" placeholder="Apartment or suite" 
                                                {...register("addressLine2")}/>
                                        </div>

                                        <div className="col-md-5">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <select className="form-select" id="country"
                                                {...register("country", { required: {value : true, message : "Country is requred"} })} >
                                                <option value="">Choose...</option>
                                                {countriesArray && countriesArray.map((country) => 
                                                    <option key={country.name.common}>{country.name.common}</option>)}
                                            </select>
                                            <p>{errors.country?.message}</p>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="state" className="form-label">Distric</label>
                                            <select className="form-select" id="state" 
                                                {...register("district", { required: {value : true, message : "District is requred"} })} >
                                                <option value="">Choose...</option>
                                                <option>Colombo</option>
                                                <option>Gampaha</option>
                                                <option>Kalutara</option>
                                                <option>Kandy</option>
                                                <option>Matale</option>
                                                <option>Nuwara Eliya</option>
                                                <option>Galle</option>
                                                <option>Matara</option>
                                                <option>Hambantota</option>
                                                <option>Jaffna</option>
                                                <option>Kilinochchi</option>
                                                <option>Vavuniya</option>
                                                <option>Mullaitivu</option>
                                                <option>Batticaloa</option>
                                                <option>Ampara</option>
                                                <option>Trincomalee</option>
                                                <option>Kurunegala</option>
                                                <option>Puttalam</option>
                                                <option>Anuradhapura</option>
                                                <option>Polonnaruwa</option>
                                                <option>Badulla</option>
                                                <option>Moneragala</option>
                                                <option>Ratnapura</option>
                                                <option>Kegalle</option>
                                            </select>
                                            <p>{errors.district?.message}</p>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="saveInfo"
                                            // checked={saveShippingAddress}
                                            onChange={handleSaveShipping}/>                                            
                                        <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                                    </div>

                                    <hr className="my-4" />

                                    {/* END -> SHIP Address details */}




                                    {/* START -> BILL Address details */}
                                                    {/* BOX  TICK--START-- for equal address data */}

                                    <h4 className="mb-3"><strong>Billing Address</strong></h4>
                                    <div className="form-check mb-4">
                                        <input type="checkbox" className="form-check-input" id="same-address" 
                                            onChange={handleBillingEqualsShippingAddress}/>
                                        <label className="form-check-label" htmlFor="same-address">Tick this Box if Billing address is the same as your Shipping address</label>
                                    </div>
                                                    {/* BOX  TICK--END-- for equal address data */}

                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label htmlFor="firstNameBill" className="form-label">First name</label>
                                            <input type="text" className="form-control" id="firstNameBill" placeholder=""  
                                                disabled={isSameAsShippingAddress}
                                                {...register("firstNameBill", { required: {value : true, message : "First name is requred"} })} />
                                            <p>{errors.firstNameBill?.message}</p>
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="lastName" className="form-label">Last name</label>
                                            <input type="text" className="form-control" id="lastNameBill" placeholder=""
                                                disabled={isSameAsShippingAddress}
                                                {...register("lastNameBill", { required: {value : true, message : "Last name is requred"} })} />
                                            <p>{errors.lastNameBill?.message}</p>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                                            <input type="email" className="form-control" id="emailBill" placeholder="you@example.com" 
                                                // value={billEmail}
                                                disabled={isSameAsShippingAddress}
                                                {...register("emailBill", { required: {value : true, message : "Email is requred"} })} />
                                            <p>{errors.emailBill?.message}</p>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="addressLine1Bill" placeholder="1234 Main St"
                                                disabled={isSameAsShippingAddress} 
                                                {...register("addressLine1Bill", { required: {value : true, message : "Address is requred"} })} />
                                            <p>{errors.addressLine1Bill?.message}</p>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address2" className="form-label">Address 2 <span className="text-body-secondary">(Optional)</span></label>
                                            <input type="text" className="form-control" id="addressLine2Bill" placeholder="Apartment or suite" 
                                                disabled={isSameAsShippingAddress}
                                                {...register("addressLine2Bill")} />
                                        </div>

                                        <div className="col-md-5">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <select className="form-select" id="countryBill" 
                                                    disabled={isSameAsShippingAddress}
                                                    {...register("countryBill", { required: {value : true, message : "country is requred"} } )} >
                                                <option value="">Choose...</option>
                                                {countriesArray && countriesArray.map((country) => 
                                                    <option key={country.name.common}>{country.name.common}</option>)}
                                            </select>
                                            <p>{errors.countryBill?.message}</p>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="state" className="form-label">District</label>
                                            <select className="form-select" id="districtBill"
                                                    disabled={isSameAsShippingAddress}
                                                    {...register("districtBill", { required: {value : true, message : "district is requred"}  })} >                                          
                                                <option value="">Choose...</option>
                                                <option>Colombo</option>
                                                <option>Gampaha</option>
                                                <option>Kalutara</option>
                                                <option>Kandy</option>
                                                <option>Matale</option>
                                                <option>Nuwara Eliya</option>
                                                <option>Galle</option>
                                                <option>Matara</option>
                                                <option>Hambantota</option>
                                                <option>Jaffna</option>
                                                <option>Kilinochchi</option>
                                                <option>Vavuniya</option>
                                                <option>Mullaitivu</option>
                                                <option>Batticaloa</option>
                                                <option>Ampara</option>
                                                <option>Trincomalee</option>
                                                <option>Kurunegala</option>
                                                <option>Puttalam</option>
                                                <option>Anuradhapura</option>
                                                <option>Polonnaruwa</option>
                                                <option>Badulla</option>
                                                <option>Moneragala</option>
                                                <option>Ratnapura</option>
                                                <option>Kegalle</option>
                                            </select>
                                            <p>{errors.districtBill?.message}</p>
                                        </div>
                                    </div>
                                    <hr className="my-4" />

                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="save-info" 
                                            disabled={isSameAsShippingAddress} 
                                            onChange={handleSaveBilling}/>
                                        <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                                    </div>

                                    <hr className="my-4" />

                                    {/* END -> Billing Address details */}


                                    {/* START -> Payments */}

                                    <h4 className="mb-3"><strong> Payment </strong></h4>

                                    <div className="my-3" >
                                        <div className="form-check">
                                            <input id="credit" type="radio" className="form-check-input"  
                                                // {...register("credit", { required: true })} 
                                                name="cardType" value="Credit card" 
                                                onChange={(e) => setCardType(e.target.value)}
                                                required
                                                />
                                            <label className="form-check-label" htmlFor="credit">Credit card</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="debit" type="radio" className="form-check-input"  
                                                // {...register("debit", { required: true })} 
                                                name="cardType" value="Debit card"
                                                onChange={(e) => setCardType(e.target.value)}
                                                />
                                            <label className="form-check-label" htmlFor="debit">Debit card</label>
                                        </div>
                                    </div>

                                    <div className="row gy-3">
                                        <div className="col-md-6">
                                            <label htmlFor="cc-name" className="form-label">Name on card</label>
                                            <input type="text" className="form-control" id="ccName" placeholder="" required 
                                                {...register("ccName", { required: true })} />
                                            <small className="text-body-secondary">Full name as displayed on card</small>
                                            <div className="invalid-feedback">
                                                Name on card is required
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="cc-number" className="form-label">Card number</label>
                                            <input type="text" className="form-control" id="ccNumber" placeholder="" required 
                                                {...register("ccNumber", { required: true })} />
                                            <div className="invalid-feedback">
                                                Credit card number is required
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="cc-expiration" className="form-label">Year of Expiration</label>
                                            <input type="text" className="form-control" id="ccExpiration" placeholder="Example: 2024" required 
                                                {...register("ccExpiration", { required: true })} />
                                            <div className="invalid-feedback">
                                                Expiration date required
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                            <input type="text" className="form-control" id="cccvv" placeholder="" required 
                                                {...register("cccvv", { required: true })} />
                                            <div className="invalid-feedback">
                                                Security code required
                                            </div>
                                        </div>
                                    </div>
                                    {/* END -> Payments */}
                                    
                                    {/* <ButtonCartPayNow/> */}
                                    
                                    {/* <ButtonCartPayNow locationToRoute="/login" classname="btnCartPayNow" >Pay Now</ButtonCartPayNow> */}
                                        {/* below we can use input tag with below same attributes too */}
                                    <button type="submit" value="Submit above Data">Submit form</button>
                                                    {/* below with "onClick" attribute -- not working the submitform if it is in the button tag */}
                                    {/* <button onClick={handleSubmit(submitForm)} className="btn btn-primary w-30 py-2 m-1 mb-3" type="submit"  > Pay Now </button> */}
                                    
                                    {/* <button className=" btn btn-primary btn-lg mb-5 mt-4" type="submit">Pay Now</button> */}

                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>


        </form>
    );
}

/////////////////////////////////////////////
