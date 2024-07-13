import ButtonCartPayNow from "../components/ButtonCartPayNow";
import "../components/ButtonCartPayNow.css";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "./Cart.css"
import storeItems from "../data/landingPageItems.json";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

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

    debit: string,
    credit: string,
    ccName:  string,
    ccNumber: number,
    ccExpiration: number,
    cccvv: number

    orderItemDetailArray : orderItemDetails []
}
interface orderItemDetails {
    itemCode: number,
    description: string,
    unitPrice: number,
    quantity: number,
    subTotal: number
}

export default function Cart() {
    const { cartQuantity, cartItems, removeFromCart } = useShoppingCart();
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
    
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormInputCart>()

    const submitForm = (customerData: any) => {
        alert(JSON.stringify(customerData))
        console.log(customerData);
        axios.post('http://localhost:8081/customer/save-details', customerData) // change the http address correctly
            .then((response) => {
                console.log(response);
                console.log("response came");
                $("thank-you-message").prop("hidden", false);
                //Above (May be a JQUERY)for-show the "thank-you-message" tag when reponse ok
            });
    }

    // const saveShippingAddressDataTesting = (event : any) => {
    //     const FormDataTesting = new FormData(event.currentTarget);
    //     const firstNameShiptesting = FormDataTesting.get("firstName");
    //     console.log({firstNameShiptesting}); 
    //     if(FormDataTesting.get("firstName") ) {
    //         setValBillFirstName(FormDataTesting.get("firstName")) 
    //     }       
    // }    
    // const[saveShippingAddress, setSaveShippingAddress] = useState(false);
    
    const handleSaveShipping = (e : any) => { //this is to --> save Ship addr.details
        console.log(e.target.checked);
        if(e.target.checked){
            console.log("save data");// here put a function when tick to add shipaddress data to save in BE
        }
        // setSaveShippingAddress(e.target.checked);
    }
    const [assignShippingAddressData, setAssignShippingAddressData ] = 
        useState({ 
            // Document.getElementById("firstNameBill")?.value = "",
            firstName : ""
        })
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

    const [isSameAsShippingAddress, setIsSameAsShippingAddress] = useState(false);
    
    const [valBillFirstName, setValBillFirstName] = useState("")
    
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
        }
        // }else{
        //     setIsSameAsShippingAddress(false)
        // }
    }

    const handleSaveBilling = (e : any) => { //this is to --> save Billing addr.details
        console.log(e.target.checked);
        if(e.target.checked){
            console.log("save Billing addr data");// here put a function when tick, to add billing address data to save in BE
        } 
    }
       
    




    return (
        <form className="container" method="post" onSubmit={handleSubmit(submitForm)} >
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
                                            <label htmlFor="firstName" className="form-label">First name <span className="text-muted"><small>(Required)</small></span> </label>
                                            <input type="text" className="form-control" id="firstName"                                               
                                                //value={ }  //onChange={ }                                                                                 
                                                
                                                {...register("firstName", { required: {value : true, message : "First name is requred"} })} 
                                                // aria-invalid={errors.firstName ? "true" : "false"}
                                                />
                                            <p>{errors.firstName?.message}</p>

                                            {/* Below validating lines were there in all input areas at the initial stage.
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div> */}
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="lastName" className="form-label">Last name <span className="text-muted"><small>(Required)</small></span> </label>
                                            <input type="text" className="form-control" id="lastName" placeholder=""  required 
                                                {...register("lastName", { required: {value : true, message : "Last name is requred"} })} />
                                            <p>{errors.lastName?.message}</p>
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="phone-number" className="form-label">Phone Number</label>
                                            <input type="text" className="form-control" id="phoneNumber" placeholder="Example: 0771234567"  required 
                                                {...register("phoneNumber", { required: {value : true, message : "Phone number is requred"} })}/>
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
                                            <input type="text" className="form-control" id="addressLine1" placeholder="1234 Main St" required 
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
                                            <select className="form-select" id="country" required
                                                {...register("country", { required: {value : true, message : "Country is requred"} })} >
                                                <option value="">Choose...</option>
                                                <option>United States</option>
                                            </select>
                                            <p>{errors.country?.message}</p>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="state" className="form-label">Distric</label>
                                            <select className="form-select" id="state" required
                                                {...register("district", { required: {value : true, message : "District is requred"} })} >
                                                <option value="">Choose...</option>
                                                <option>California</option>
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
                                            <input type="text" className="form-control" id="firstNameBill" placeholder=""  required 
                                                disabled={isSameAsShippingAddress}
                                                {...register("firstNameBill", { required: {value : true, message : "First name is requred"} })} />
                                            <p>{errors.firstNameBill?.message}</p>

                                            {/* <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div> */}
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="lastName" className="form-label">Last name</label>
                                            <input type="text" className="form-control" id="lastNameBill" placeholder="" required
                                                disabled={isSameAsShippingAddress}
                                                {...register("lastNameBill", { required: {value : true, message : "Last name is requred"} })} />
                                            <p>{errors.lastNameBill?.message}</p>
                                            {/* <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div> */}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                                            <input type="email" className="form-control" id="emailBill" placeholder="you@example.com" 
                                                // value={billEmail}
                                                {...register("emailBill", { required: {value : true, message : "Email is requred"} })} />
                                            <p>{errors.emailBill?.message}</p>
                                            {/* <div className="invalid-feedback">
                                                Please enter a valid email address for shipping updates.
                                            </div> */}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="addressLine1Bill" placeholder="1234 Main St" required 
                                                {...register("addressLine1Bill", { required: {value : true, message : "Address is requred"} })} />
                                            <p>{errors.addressLine1Bill?.message}</p>
                                            {/* <div className="invalid-feedback">
                                                Please enter your shipping address.
                                            </div> */}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address2" className="form-label">Address 2 <span className="text-body-secondary">(Optional)</span></label>
                                            <input type="text" className="form-control" id="addressLine2Bill" placeholder="Apartment or suite" 
                                                {...register("addressLine2Bill")} />
                                        </div>

                                        <div className="col-md-5">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <select className="form-select" id="countryBill" 
                                                    {...register("countryBill", { required: {value : true, message : "country is requred"} } )} >
                                                <option value="">Choose...</option>
                                                <option>United States</option>
                                            </select>
                                            <p>{errors.countryBill?.message}</p>
                                            {/* <div className="invalid-feedback">
                                                Please select a valid country.
                                            </div> */}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="state" className="form-label">District</label>
                                            <select className="form-select" id="districtBill" required
                                                    {...register("districtBill", { required: {value : true, message : "district is requred"}  })} >
                                                <option value="">Choose...</option>
                                                <option>California</option>
                                            </select>
                                            <p>{errors.districtBill?.message}</p>
                                            {/* <div className="invalid-feedback">
                                                Please provide a valid state.
                                            </div> */}
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

                                    <div className="my-3">
                                        <div className="form-check">
                                            <input id="credit" type="radio" className="form-check-input" checked required 
                                                {...register("credit", { required: true })} />
                                            <label className="form-check-label" htmlFor="credit">Credit card</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="debit" type="radio" className="form-check-input" required 
                                                {...register("debit", { required: true })} />
                                            <label className="form-check-label" htmlFor="debit">Debit card</label>
                                        </div>
                                        {/* <div className="form-check">
                                            <input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                        </div> */}
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
                                            <input type="text" className="form-control" id="ccExpiration" placeholder="" required 
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
                                    <ButtonCartPayNow locationToRoute="/login" classname="btnCartPayNow" >Pay Now</ButtonCartPayNow>

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