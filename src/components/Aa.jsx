import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase/config";
import { message } from "antd";

export default function Aa() {
  const [ph, setPh] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState("");
  
  const getOtp = async (e) => {
    e.preventDefault();

    try {
      const recaptchaVerifier = await new RecaptchaVerifier(
        auth,
        "recaptcha",
        {}
      );
      console.log(recaptchaVerifier);

      const confirm = await signInWithPhoneNumber(
        auth,
        `+91${ph}`,
        recaptchaVerifier
      );
      // console.log(confirm, "confirm")
      setUser(confirm);
      // setIsGotOtp(true);
    } catch (error) {
      console.log(error, "errrr");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "") {
      message.warning("Enter OTP");
    } else {
      const hello = await user.confirm(otp);
    }
  };

  return (
    <div>
      <form action="" onSubmit={getOtp}>
        <input type="number" onChange={(e) => setPh({ ph: e.target.value })} />
        <button>getOtp</button>
      </form>
      <form action="" onSubmit={verifyOtp}>
        <input
          type="number"
          onChange={(e) => setOtp({ otp: e.target.value })}
        />
        <button>submit</button>
      </form>
    </div>
  );
}
