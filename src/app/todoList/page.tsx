"use client";

import React, { useState, useEffect } from "react";
import {  app, db, collection } from "../../../firebase/Config"; 
import { addDoc, doc, setDoc, onSnapshot, setIndexConfiguration, getDocs } from "firebase/firestore";
import Head from "next/head";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userInfo } from "os";
import { useRouter } from "next/navigation";

export default function TodoList() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const auth = getAuth();
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
                const userId = user.uid;
                const userDocRef = doc(db, "users", userId);
                const tasksCollectionRef = collection(userDocRef, "tasks");

            try {
              const querySnapshot = await getDocs(tasksCollectionRef);
              const userTasks: any = [];

              querySnapshot.forEach((doc) => {
                userTasks.push({ id: doc.id, ...doc.data() });
              });

              // Update the component state with the user's tasks
              setTasks(userTasks);
            } catch (error) {
              console.error("Error fetching tasks:", error);
            }
          } else {

          }
        });
    
        return () => unsubscribe();
      }, [auth, router]);


      
    async function onAddTaskBtn() {
        const user = auth.currentUser;
        if (!user) {
          console.error("User is not authenticated.");
          return;
        }
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);

        const taskCollection = collection(userDocRef, 'tasks');

        try { 
            await addDoc(taskCollection, {
                task: input
            })

        setTasks([...tasks, { id: '', task: input }]);
        setInput('')
        } catch (error){
            console.error("Error adding task:", error);
        }
    }

    return (
        <div>
            <Head>
                <title>Todo List</title>
            </Head>
            <div>
                <input value={input} onChange={(e) =>{setInput(e.target.value)}}/>
                <button onClick={(onAddTaskBtn)}>Add Task</button>
            </div>
            <div>
                <ul>
                    {tasks.map((task, index) =>(
                        <li key={index}>{task.task}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}