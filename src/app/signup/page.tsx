"use client";

import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import {  app, auth, db,createUserWithEmailAndPassword,doc ,setDoc,uploadBytes,ref } from "../../../firebase/Config";


export default function Signup() {
    const auth = getAuth(app);
    console.log(auth);

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");


    function Submit(){
        createUserWithEmailAndPassword(auth, email, passwordOne).then((userCredential) => {
            const user = userCredential.user;
            alert('User created!!!')
            router.push("/")
        })
    }

    return(
        <div>
            <input placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <input type='password' placeholder="Password" value={passwordOne} onChange={(e) => {setPasswordOne(e.target.value) }} />
            <button onClick={Submit}>Submit</button>
        </div>
    );

}