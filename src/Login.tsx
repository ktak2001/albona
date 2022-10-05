import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { useNavigate } from 'react-router-dom';

const Login = ({ user }: { user: User } ) => {
	const [email, setEmail] = useState<string>("")
	const [pass, setPass] = useState<string>("")
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
				<input title="email" placeholder="" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} />
					<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			</div>
			<div className="mb-3">
				<label className="form-label">Password</label>
				<input title="pass" placeholder="" type="password" className="form-control" id="exampleInputPassword1" onChange={e => setPass(e.target.value)} />
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
		</form>
	)
}

export default Login;