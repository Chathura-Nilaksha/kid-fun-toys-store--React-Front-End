import '../App.css'
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
//import {getDistrictList} from "get-srilanka-districts-cities";
//{cityList, provinceList,getJsonofCityAndDistrict,getDistrictList}
//const {cityList, provinceList,getJsonofCityAndDistrict,getDistrictList} = require('get-srilanka-districts-cities')

enum GenderEnum {
    female = "female",
    male = "male",
}
interface IFormInput {
    firstName: string,
    lastName: string,
    phoneNumber1: string,
    phoneNumber2: string,
    whatsappNumber: string,
    email: string,
    password: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    district: string,
    yearOfBirth: number,
    gender: GenderEnum
}

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const submitForm: SubmitHandler<IFormInput> = (customerData) => {
        alert(JSON.stringify(customerData))
        console.log(customerData);
        axios.post('http://localhost:8081/customer/save-details', customerData)
            .then((response) => {
                console.log(response);
                console.log("response came");
                $("thank-you-message").prop("hidden", false);
                //Above (May be a JQUERY)for-show the "thank-you-message" tag when reponse ok
            });
        // .catch((error) => {
        //     if (error.response) {
        //         console.log(error.response);
        //         console.log("server responded");
        //     } else if (error.request) {
        //         console.log("network error");
        //     } else {
        //         console.log(error);
        //     }
        // });
    }

    //const getDistrictList : string = (district) => {};
    // const districtList : string [] = ['Colombo', 'Kalutara', 'Gampaha'];

    // function dropdownDistrictList(): void {
    //     document.getElementById("chooseDistrict");
    // }

    const [value, setValue] = useState(" ");
    const options = [
        { label: "Colombo", value: "Colombo" },
        { label: "Kalutara", value: "Kalutara" },
        { label: "Gampaha", value: "Gampaha" },
        { label: "Galle", value: "Galle" },
        { label: "Matara", value: "Matara" },
        { label: "Hambantota", value: "Hambantota" }
    ]

    function handleSelect2(event: ChangeEvent<HTMLSelectElement>): void {
        setValue(event.target.value);
    }

    // const yearArry: number[] = [1, 2, 3, 4, 5];
    // let year : number;

    //CORRECT SAMPLE // const arrayOfYears = Array.from({0:11, 1:12, 2:13, length:3});

    //const arrayRange = (1970, 1950, 1) ;
    //=> Array.from({ length: (stop - start) / step + 1  }, (value, index) => start + index * step );

    const [val, setVal] = useState(" ");
    function arrayRange(initalYear: number, lastYear: number, step: number) {
        let r = lastYear - initalYear;
        let x1 = r / step;
        let len = x1 + 1;
        return Array.from(
            { length: len },
            (_value: number, index: number) => initalYear + index * step  
        );
    };
        
    const newAgeArray : number[]= arrayRange(1940, 2020, 1);
    function handleSelect3(event: ChangeEvent<HTMLSelectElement>): void {
        setVal(event.target.value);
    }

    // let yr: Number;
    // const intStream: IntStream = IntStream.range(20, 30);

    //const arrayRange = (1950, 2024, 1);
    // function year(): Number {
    //     // yr < 2024 ; yr > 1900 ;
    //     return yr;
    // };
    return (
        <div>
            {/* <div className="container">
                <div className="raw text-center" >
                    <ClothifyHeader />
                </div>
            </div>

            <div className="container">
                <div className="raw text-center text-capitalize">
                    <HeaderCompo />
                </div>
            </div> */}


            <div className="container">
                <div className="raw">
                    <body className="bg-body-tertiary">

                        <form className="container" method="post">
                            <main>
                                <div className="py-5 text-center">
                                    <h2><strong>User Registeration Form</strong></h2>
                                </div>

                                <div className="row g-5">

                                    <div className="col-md-7 col-lg-8">
                                        <form className="needs-validation" noValidate>
                                            <div className="row g-3">
                                    
                                                <div className="col-sm-6 form-floating">
                                                    <input type="text"
                                                        {...register("firstName", { required: true })}
                                                        aria-invalid={errors.firstName ? "true" : "false"}
                                                        
                                                        className="form-control" id="firstName" />

                                                    {errors.firstName?.type === "required" && (
                                                        <p role="alert">First name is required</p>
                                                    )}

                                                    <label htmlFor="firstName" className="form-label">First name &nbsp; (Required)</label>

                                                    {/* <input         // This unit taken from FORMHOOK site.
                                                        {...register("firstName", { required: true })}
                                                        aria-invalid={errors.firstName ? "true" : "false"}
                                                    />
                                                    {errors.firstName?.type === "required" && (
                                                        <p role="alert">First name is required</p>
                                                    )} */}

                                                </div>

                                                <div className="col-sm-6 form-floating">
                                                    <input type="text"
                                                        {...register("lastName", { required: true })}
                                                        aria-invalid={errors.lastName ? "true" : "false"}
                                                        className="form-control" id="lastName" />

                                                    {errors.lastName?.type === "required" && (
                                                        <p role="alert">Last name is required</p>
                                                    )}

                                                    <label htmlFor="lastName" className="form-label">Last name &nbsp; (Required)</label>
                                                </div>

                                                <div className="col-sm-4">
                                                    <label htmlFor="phone-number-1" className="form-label">Phone Number 1 </label>
                                                    <input type="text"
                                                        {...register("phoneNumber1", { required: true })}
                                                        aria-invalid={errors.phoneNumber1 ? "true" : "false"}
                                                        className="form-control" id="phone-number-1" placeholder="Example: 0771234567" />

                                                    {errors.phoneNumber1?.type === "required" && (
                                                        <p role="alert">Phone Number1 is required</p>
                                                    )}

                                                </div>

                                                <div className="col-sm-4">
                                                    <label htmlFor="phone-number-2" className="form-label">Phone Number 2 <span className="text-body-secondary">(Optional)</span></label>
                                                    <input type="text"
                                                        {...register("phoneNumber2")}
                                                        className="form-control" id="phone-number-2" placeholder="Example: 0771234567" />
                                                </div>

                                                <div className="col-sm-4">
                                                    <label htmlFor="whatsapp-number" className="form-label">Whatsapp Number <span className="text-body-secondary">(Optional)</span></label>
                                                    <input type="text"
                                                        {...register("whatsappNumber", { required: true })}
                                                        className="form-control" id="whatsapp-number" placeholder="Example: 0771234567" />
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="email" className="form-label">Email </label>
                                                    <input type="email"
                                                        {...register("email", { required: true })}
                                                        aria-invalid={errors.email ? "true" : "false"}
                                                        className="form-control" id="email" placeholder="you@example.com" required />

                                                    {errors.email?.type === "required" && (
                                                        <p role="alert">Email is required</p>
                                                    )}

                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="createPassword" className="form-label">Create Password </label>
                                                    <input type="password"
                                                        {...register("password", { required: true })}
                                                        aria-invalid={errors.password ? "true" : "false"}
                                                        className="form-control" id="createPassword" placeholder="Create Password" required />

                                                    {errors.password?.type === "required" && (
                                                        <p role="alert">Please Create a Password.</p>
                                                    )}

                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="address1" className="form-label">Address Line1</label>
                                                    <input type="text"
                                                        {...register("addressLine1", { required: true })}
                                                        aria-invalid={errors.addressLine1 ? "true" : "false"}
                                                        className="form-control" id="address1" placeholder="1234 Main St" />

                                                    {errors.addressLine1?.type === "required" && (
                                                        <p role="alert">Please enter your Address.</p>
                                                    )}

                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="address2" className="form-label">Address Line2 <span className="text-body-secondary">(Optional)</span></label>
                                                    <input type="text"
                                                        {...register("addressLine2")}
                                                        className="form-control" id="address2" placeholder="Colombo road" />

                                                </div>

                                                <div className="col-md-6">
                                                    <label htmlFor="city" className="form-label">City</label>
                                                    <input type="text"
                                                        {...register("city", { required: true })}
                                                        aria-invalid={errors.city ? "true" : "false"}
                                                        className="form-control" id="city" placeholder="Moratuwa" />

                                                    {errors.city?.type === "required" && (
                                                        <p role="alert">Please enter your City.</p>
                                                    )}

                                                </div>

                                                {/* check below with web */}
                                                {/* https://www.npmjs.com/package/get-srilanka-districts-cities?activeTab=code */}
                                                <div className="col-md-6">
                                                    <label htmlFor="district" className="form-label">District</label>
                                                    <select
                                                        {...register("district", { required: true })}
                                                        aria-invalid={errors.district ? "true" : "false"}
                                                        className="form-select" id="district" onChange={handleSelect2}
                                                    >
                                                        <option value="Select.." selected> Please Select.. </option>
                                                        <option value="Select.." > Select.. </option>
                                                        {options.map(option => (
                                                            <option value={option.value}> {option.label} </option>
                                                        ))}

                                                        {/* <option value="Select District" selected>Select District</option>
                                                        <option id="chooseDistrict" value="dropdownDistrictList();">Select District</option>                                                        
                                                        <option value={districtList}>districtList</option> */}
                                                    </select>

                                                    {errors.district?.type === "required" && (
                                                        <p role="alert">Please Select your District.</p>
                                                    )}

                                                    <p>{value}</p>

                                                </div>

                                                <div className="col-md-3">
                                                    <label htmlFor="birth" className="form-label">Year Of Birth</label>
                                                    <select {...register("yearOfBirth", { required: true })}
                                                        aria-invalid={errors.yearOfBirth ? "true" : "false"}
                                                        className="form-select" id="birth" 
                                                        onChange={handleSelect3}
                                                        >

                                                        <option value=""> Select.. </option>
                                                        <option> 1939 </option>

                                                        {newAgeArray.map((opt : number) =>  <option>{opt}</option> )}
                                                        
                                                    </select>
                                                    <p>{val}</p>

                                                    {errors.yearOfBirth?.type === "required" && (
                                                        <p role="alert">Please Select your Birth Year.</p>
                                                    )}

                                                </div>

                                                <div className="col-md-3">
                                                    <label htmlFor="gender" className="form-label">Gender</label>

                                                    <select {...register("gender", { required: true })}
                                                        aria-invalid={errors.gender ? "true" : "false"}
                                                        className="form-select" id="gender">
                                                        <option>Select..</option>
                                                        <option value="female">Female</option>
                                                        <option value="male">Male</option>
                                                    </select>

                                                    {/* {selected ? {selected} : "not done yet"} */}

                                                    {errors.gender?.type === "required" && (
                                                        <p role="alert">Please Select your Gender.</p>
                                                    )}

                                                </div>
                                            </div>




                                            <button onClick={handleSubmit(submitForm)} id="submitDetailsbtn" className="btn btn-primary btn-lg mb-5 mt-4 py-1" type="submit"> <small>Submit the Registration Form</small></button>

                                            <div id="thank-you-message" hidden>
                                                Your details is being submitted. Thank you.
                                            </div>

                                            {/* example taken from net
                                            <button popovertarget="my-popover">Open Popover</button>

                                            <div popover id="my-popover">Greetings, one and all!</div> */}

                                        </form>
                                    </div>
                                </div>
                            </main>
                        </form>

                        <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
                        <script src="checkout.js"></script>

                    </body>

                </div>
            </div>
        </div>
    );
}
