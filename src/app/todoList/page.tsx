"use client";

import React, { useState } from "react";
import {  app, db, collection } from "../../../firebase/Config"; 
import { addDoc } from "firebase/firestore";
import Head from "next/head";

export default function TodoList() {
    const [task, setTask] = useState("");
    
    function onAddTaskBtn() {
        const taskRef = addDoc(collection(db, "tasks"), {
            task_name: task
        })
    }

    return (
        <div>
            <Head>
                <title>Todo List</title>
            </Head>
            <div>
                <input value={task} onChange={(e) =>{setTask(e.target.value)}}/>
                <button onClick={(onAddTaskBtn)}>Add Task</button>
            </div>
        </div>
    );
}