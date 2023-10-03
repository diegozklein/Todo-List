"use client";

import React, { useState, useEffect } from "react";
import {  app, db, collection } from "../../../firebase/Config"; 
import { addDoc, doc, setDoc, onSnapshot, setIndexConfiguration, getDocs, deleteDoc } from "firebase/firestore";
import Head from "next/head";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "../../../styles/Todo.module.css"

export default function TodoList() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [taskToRemove, setTaskToRemove] = useState(null);
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
              const unsubscribeSnapshot = onSnapshot(tasksCollectionRef, (snapshot) => {
                const updatedTasks: React.SetStateAction<any[]> = [];
                snapshot.forEach((doc) => {
                  updatedTasks.push({ id: doc.id, ...doc.data() });
                });
                setTasks(updatedTasks);
              });
        
              return () => unsubscribeSnapshot();
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

      // setTasks([...tasks, { id: '', task: input }]);
      setInput('')
      } catch (error) {
          console.error("Error adding task:", error);
      }
    }

    async function onRemoveTask(taskId: any) {
      const user = auth.currentUser;
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }
      const userId = user.uid;
      const userDocRef = doc(db, "users", userId);
      const docToDel = doc(collection(userDocRef, "tasks"), taskId);

      try {
        await deleteDoc(docToDel)
      } catch (error) {
        console.error("Error removing task:", error);
      }
    }

    return (
        <div>
            <Head>
                <title>Todo List</title>
            </Head>
            <div className={styles.todoListDiv}>
                <div className={styles.todoListDivBox}>
                    <div>
                        <input className={styles.inputDiv} placeholder='Task Description' value={input} onChange={(e) =>{setInput(e.target.value)}}/>
                        <button className={styles.addTaskBtn} onClick={(onAddTaskBtn)}>Add Task</button>
                    </div>
                    <ul className={styles.todoList}>
                        {tasks.map((task) =>(
                            <li key={task.id}>
                              {task.task}
                              <button onClick={() => onRemoveTask(task.id)}>Remove Task</button>
                            </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}