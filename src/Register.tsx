import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./FirebaseConfig";

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
				<input title="name" placeholder="" type="text" className="form-control" id="exampleInputName" aria-describedby="name" onChange={e => setName(e.target.value)} />
			</div>
			<div className="mb-3">
				<label className="form-label">Email address</label>
				<input title="email" placeholder="" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} />
				<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div className="mb-3">
				<label className="form-label">Password</label>
				<input title="password" placeholder="" type="password" className="form-control" id="exampleInputPassword1" onChange={e => setPass(e.target.value)} />
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
		</form>
	)
}

export default Register;