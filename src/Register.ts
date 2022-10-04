import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig.js";

const Register = ({ user }) => {
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const [name, setName] = useState("")
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				pass
			);
			const docRef = await addDoc(collection(db, "users"), {
				name,
				email
			});
			console.log("doc", docRef)
		} catch (error) {
			alert("正しく入力してください");
		}
	}

	useEffect(() => {
		if (user) navigate('/');
	}, [])

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-3'>
				<label className="form-label">Name</label>
				<input type="text" className="form-control" id="exampleInputName" aria-describedby="name" onChange={e => setName(e.target.value)} />
				<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div className="mb-3">
				<label className="form-label">Email address</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} />
				<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div className="mb-3">
				<label className="form-label">Password</label>
				<input type="password" className="form-control" id="exampleInputPassword1" onChange={e => setPass(e.target.value)} />
			</div>
			<div className="mb-3 form-check">
				<input type="checkbox" className="form-check-input" id="exampleCheck1" />
				<label className="form-check-label" >Check me out</label>
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
		</form>
	)
}

export default Register;