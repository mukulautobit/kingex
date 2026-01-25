import type { PlaceOrderPayload } from "../store/slices/ordersSlice";
import { HISTORY_ORDERS, TOKEN } from "../Utils/constants/app.constants";

const BASE_URL = "https://api-test.swtik.com/api";

export const placeOrderStock = async (payload: PlaceOrderPayload) => {
  try {
    const response = await fetch(`${BASE_URL}/account/order/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`, // ✅ JWT here
      },
      body: JSON.stringify(payload), // ✅ payload goes in body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to place order");
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Place order error:", error);
    throw error;
  }
};




export const fetchHistory = async()=>{

  console.log("call history")

  // const token = localStorage.getItem("AUTHENTICATION_TOKEN")
  const token = TOKEN

  if(!token){
    console.log("UNOUTHRIZE")
    return;
  }
  let query = HISTORY_ORDERS
  // switch(reqString){
  //   case 'order' : query = HISTORY_ORDERS
  //   break;
  //   case 'deal' : query = HISTORY_DEALS
  //   break;
  //   default : query = HISTORY_POSITIONS 
  // }

  // console.log(reqString)

  try{

    const response = await fetch(`${BASE_URL}/query`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
         Authorization: `Bearer ${token}`, 
      },
       body: JSON.stringify({
        query: query,
      })
    })

    const res = await response.json()
    console.log(res)
    return res

  }catch(err){
    console.log("ERROR", err)
  }


}

// <--------------------------------MOBILE---------------------------->

// export const verifyOtp = async (
//   country_code: string,
//   mobile_number: string,
//   otp: string
// ) => {
//   const res = await fetch(`${BASE_URL}/account/otp/verify`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       country_code,
//       mobile_number,
//       otp
//     })
//   });

//   return res.json();
// }


export const sendOtp = async (country_code: string, mobile_number: string) => {
  const res = await fetch(`${BASE_URL}/account/otp/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country_code, mobile_number })
  });

  return res.json();
};

export const verifyOtp = async (
  country_code: string,
  mobile_number: string,
  otp: string
) => {
  const res = await fetch(`${BASE_URL}/account/otp/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country_code, mobile_number, otp })
  });

  return res.json();
};




