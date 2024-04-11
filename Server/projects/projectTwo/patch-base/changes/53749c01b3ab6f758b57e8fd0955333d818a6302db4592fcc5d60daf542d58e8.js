import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { db } from "../firebase-config";
import {
    collection,
    addDoc,
} from "firebase/firestore";

const LoginExam = () => {
    const UsersCollectionRef = collection(db, 'users');
    const navigate = useNavigate()
    const [user, setUser] = useState({name: "", lastName: "", age: -1, password: ""});
    const [wrong, setWrong] = useState(0)

    const addUser = async (newUser) => {
        return await addDoc(UsersCollectionRef, newUser);
    }    

    const send = async() => {
        if (user.lastName.length < 8 && user.lastName.length > 4 && user.name.length > 0 && user.name.length < 8 && user.age > 1000 && user.password.length === 6) {
            if (user.name === "itamar" && user.lastName === "peleg") {
                console.log("itamar")
                navigate("/exam2/page5")
            } else {
                const useDATA = await addUser({admin: false, age: user.age, last_name: user.lastName, name:user.name, password:user.password})
                navigate("/exam2/page3", {state: useDATA.id})
            }
        } else {
            setWrong(wrong+1)
            if (wrong === 3) {
                navigate("/exam2/page4") // מסך 4
            }
        }
    }
    return (
        <div className='backgroundExam'>
            <div className='formLogExam'>
                <div style={{color: "#ffffff"}} onClick={() => navigate('/exam2')}><p className='back'>&#8592;</p></div>
                <h3 className='loginHeaderExam'>התחבר</h3>

                <label className='loginLabelExam'>שם משתמש</label>
                <input onChange={(e) => {setUser({...user, name: e.target.value})}} className='inputLogExam' type="text" placeholder="שם פרטי"/>

                <label className='loginLabelExam' for="password">שם משפחה</label>
                <input onChange={(e) => {setUser({...user, lastName: e.target.value})}} className='inputLogExam' type="text" placeholder="שם משפחה"/>

                <label className='loginLabelExam' for="password">גיל</label>
                <input onChange={(e) => {setUser({...user, age: e.target.value})}} className='inputLogExam' type="number" placeholder="גיל"/>

                <label className='loginLabelExam' for="password">סיסמה</label>
                <input onChange={(e) => {setUser({...user, password: e.target.value})}} className='inputLogExam' type="password" placeholder="סיסמה"/>
                <div className='labelAgeExam'>
                    {user.age > 1920 && user.age < 2025 ? <p>{2023-user.age}</p> : <p>גיל</p>}
                </div>
                <motion.button whileTap={{scale: 0.9}} whileHover={{scale: 1.05}} transition={{ type: "spring", stiffness: 300 }} initial={{scale: 0.0}} animate={{scale: 1}} exit={{scale: 0}} onClick={() => send()} className='buttonLogExam'>שלח</motion.button>
            </div>
        </div>
    )
}

export default LoginExam