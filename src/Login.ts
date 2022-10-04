import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { useNavigate } from 'react-router-dom';

const Login = ({user}) => {
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await signInWithEmailAndPassword(
				auth,
				email,
				pass
			);
		} catch (error) {
			alert("正しく入力してください");
		}
	}

	useEffect(() => {
		if (user) navigate('/');
	}, [])

	return (
		<form onSubmit={handleSubmit} >
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

export default Login;