import React from 'react'
import "./login.css"
import Logo from "../../logo-ST/logo.png"
import Ilustrasi1 from './login-1.png'
import BgIlustrasi from './bg-login.png'
import { useState, useRef } from 'react'


function Login() {

	// const inputs = document.querySelectorAll(".input");
	const inputs = useRef()


	function addcl() {
		// 	let parent = this.parentNode.parentNode;
		// 	parent.classList.add("focus");
		// inputs.current.classList.add('focus')
		// 	console.log(inputs)
	}

	function remcl() {
		// 	let parent = this.parentNode.parentNode;
		// 	if(this.value == ""){
		// 		parent.classList.remove("focus");
		// 	}
	}


	// inputs.forEach( (input) => {
	// 	input.addEventListener("focus", addcl);
	// 	input.addEventListener("blur", remcl);



	// inputs.forEach( (input) => {
	// 	input.addEventListener("focus", addcl);
	// 	input.addEventListener("blur", remcl);
	// });

	// selesai halaman login
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()

	let api = () => {
		const parameter = "?email=" + email;
		fetch("https://615eb2583d1491001755aa76.mockapi.io/users" + parameter)
			.then(respons => respons.json())
			.then((result) => {
				const user_data = result[0]
				if (user_data.email && user_data.password == password) {
					window.location.replace("/home");
					alert('Login Berhasil')
					return;
				} else {
					alert('Login Gagal, Username atau password salah')
				}

			})
	}

	return (
		<div>
			<div id="loginPage">
				<img class="wave-login" src={BgIlustrasi} />
				<div class="containerLogIn mt-5">
					<div class="img">
						<img src={Ilustrasi1} />
					</div>
					<div class="login-content">
						<form>
							<img src={Logo} />
							<h2 class="title">Masuk sebagai pengguna</h2>
							<div class="input-div one">
								<div class="i">
									<i class="fas fa-user"></i>
								</div>
								<div class="div">
									<input type="email" placeholder="Email" onFocus={addcl} onBlur={remcl}
										ref={inputs} className="input"
										onChange={(evnt) => setEmail(evnt.target.value)} value={email} />
								</div>
							</div>
							<div class="input-div pass">
								<div class="i">
									<i class="fas fa-lock"></i>
								</div>
								<div class="div">
									<input type="password" placeholder="Password" className="input" onChange={(evnt) => setPassword(evnt.target.value)} value={password} />
								</div>
							</div>
							<a href="#">Forgot Password?</a>
							<button type="button" class="btn" value="Login" onClick={api} >LogIn</button>
						</form>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Login