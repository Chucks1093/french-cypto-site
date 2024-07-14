import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePost from "@/hooks/usePost";
import showToast from "@/utils/showToast";
import Loader from "@/components/loader/circle-loader/Loader";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const { postData, loading } = usePost();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const requestBody = JSON.stringify({
			username: name,
			password: password,
			email: email,
			phone_number: phoneNumber
		})
		try {
			const data = (await postData("/register", requestBody)) as {msg: string};
			console.log(data);
			showToast.success("User created");
			
			showToast.success(data.msg)
		} catch (error) {
			if (error instanceof Error) {
				showToast.error(error.message);
			}
			console.log(error);
		}
	};
	return (
		<div className=" max-w-[1114px] mx-auto flex flex-col items-center justify-center py-7 text-[#111827] p-5 mt-3">
			<div className=" grid grid-cols-1 md:grid-cols-2 gap-12 justify-between max-w-[1040px] place-content-center ">
				<form onSubmit={handleSubmit}>
					<Link to="/">
						<h1 className="text-[24px] text-[#111827] font-semibold">
							Welcome back 👋
						</h1>
					</Link>
					<p className="text-[#4C4C4C] text-[16px] mt-1 mb-3">
						Create an account to get started
					</p>
					<div className=" flex flex-col space-y-4 mt-8">
						<div>
							<label
								htmlFor="name"
								className="font-[500] text-[#111827]"
							>
								Full name
							</label>
							<input
								type="text"
								name="name"
								value={name}
								onChange={(e) => setName(e.currentTarget.value)}
								id="name"
								className=" block border border-gray-300 rounded-3xl py-2 indent-4 mt-3 w-full"
								placeholder="Madara Itachi"
							/>
						</div>
						<div>
							<label htmlFor="" className="font-[500] text-[#111827]">
								Email{" "}
							</label>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.currentTarget.value)}
								className=" block border border-gray-300 rounded-3xl py-2 indent-4 mt-3 w-full"
								placeholder="amitachi@gmail.com"
							/>
						</div>

						<div>
							<label htmlFor="" className="font-[500] text-[#111827]">
								Phone number
							</label>
							<input
								type="telephone"
								name="phoneNumber"
								id="phoneNumber"
								onChange={(e)=> setPhoneNumber(e.currentTarget.value)}
								value={phoneNumber}
								className=" block border border-gray-300 rounded-3xl py-2 indent-4 mt-3 w-full"
								placeholder="+234 123 456 7890"
							/>
						</div>
						<div>
							<label htmlFor="" className="font-[500] text-[#111827]">
								Password
							</label>
							<input
								type="password"
								onChange={(e)=> setPassword(e.currentTarget.value)}
								value={password}
								className=" block border border-gray-300 rounded-3xl py-2 indent-4 mt-3 w-full"
								placeholder="Madara Itachi"
							/>
						</div>
						<label
							htmlFor="policy"
							className="ml-2 text-[#4C4C4C] text-[16px] justify-end "
						>
							<input
								type="checkbox"
								name="policy"
								id="policy"
								className="mr-3"
							/>
							By signing up, you are consenting to receive products,
							service and events updates from us. You can unsubscribe at
							any time.
						</label>
					</div>

					<button disabled={loading} className="text-sm w-full  bg-app-primary font-semibold text-white text-center rounded-3xl mt-3 flex justify-center items-center h-12">
						{loading ? <Loader /> : "Get Started"}
					</button>
					<div className=" items-center mt-5 flex flex-row justify-center">
						<p>
							Already have an account?
							<Link to="/signin">
								<span className=" text-app-primary font-semibold underline"> Login</span>
							</Link>
						</p>
					</div>
				</form>

				<div className="">
					<img
						src="/icons/signup-bg.svg"
						alt="login background image"
						className=" rounded-[10px] "
					/>
				</div>
			</div>
		</div>
	);
}
