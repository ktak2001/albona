import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./Game";
import Login from "./Login";
import Register from "./Register";
import NavBar from './NavBar'
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import Home from "./Home";

const App = () => {
	const [user, setUser] = useState<any>("")

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
	}, [])

	return (
		<div className="container">
			<BrowserRouter>
				<NavBar user={user} />
				<Routes>
					<Route path={`/register`} element={<Register user={user} />} />
					<Route path={`/login`} element={<Login user={user} />} />
					<Route path={`/`} element={<Home user={user} />} />
					<Route path={`/game`} element={<Game user={user} />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;