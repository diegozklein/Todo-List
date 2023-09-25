"use client";

import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import {  app, db, createUserWithEmailAndPassword, collection } from "../../../firebase/Config";
import { addDoc } from "firebase/firestore";
import styles from "../../../styles/Signup.module.css";
import Head from "next/head";


export default function Signup() {
    const auth = getAuth(app);
    console.log(auth);
    const userRef = collection(db, "users");

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [passwordTwo, setPasswordTwo] = useState("");


    function Submit(){
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            alert('User created!!!')
            router.push("/")
        }).then((userCredential) => {
            addDoc(collection(userRef, "users", email), {
                email: email,
                password: password
            }
            );
        })
    }

    return(
        <div>
            <Head>
                <title>Todo - SignUp</title>
            </Head>
            <div className={styles.signupDiv}>
                <div className={styles.signupDivBox}>
                    <h1 className={styles.title}>Sign Up</h1>
                    <div className={styles.inputDiv}>
                        <input className={styles.input} placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className={styles.inputDiv}>
                        <input className={styles.input} type='password' placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value) }} />
                    </div>
                    <button className={styles.signUpBtn} onClick={Submit}>Sign Up</button>
                    <div className={styles.alreadyHaveAccDiv}>
                        <button className={styles.loginBtn} onClick={() => router.push("/signin")}>Already have an account</button>
                    </div>
                </div>
            </div>
        </div>
    );

}