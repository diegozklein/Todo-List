"use client";

import React, {useState} from 'react';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app, signInWithEmailAndPassword } from '../../../firebase/Config';
import styles from "../../../styles/Signin.module.css";
import Head from 'next/head';

export default function SignIn() {
    const auth = getAuth(app);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function Submit(){
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("User Connected");
                router.push("/todoList");
            })
    }

    return (
        <div>
            <Head>
                <title>Todo - Login</title>
            </Head>
            <div className={styles.loginDiv}>
                <div className={styles.loginDivBox}>
                    <h1 className={styles.title}>Login</h1>
                    <div className={styles.inputDiv}>
                        <input className={styles.input} placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className={styles.inputDiv}>
                        <input className={styles.input} type='password' placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value) }} />
                    </div>
                    <button className={styles.loginBtn} onClick={Submit}>Login</button>
                    <div className={styles.createAccDiv}>
                        <button className={styles.signupBtn} onClick={() => router.push("/signup")}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}