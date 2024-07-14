import { useState } from "react";
import Buttons from "@/lib/util/Button";
import { Link, useNavigate } from "react-router-dom";
import usePost from "@/hooks/usePost";
import Loader from "@/components/loader/circle-loader/Loader";
import showToast from "@/utils/showToast";
import Cookies from "js-cookie";


export default function LogIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {postData, loading} = usePost();
	const navigate = useNavigate();

	const handleSubmit = async(e: React.FormEvent)=> {
		e.preventDefault();
		const requestBody = JSON.stringify({
			password: password,
			email: email,
		})
		try {
			const data = (await postData("/login", requestBody)) as {token: string};
			console.log(data);
			Cookies.set("user-token", data.token);
			showToast.success("Welcome back")
			navigate("/dashboard")
		} catch (error) {
			if (error instanceof Error) {
				showToast.error(error.message);
			}
			console.log(error);
		}
	}
	return (
		<div className=" max-w-[1114px] mx-auto flex flex-col items-center justify-center py-7 text-[#111827] p-5 mt-7">
			<div className=" grid grid-cols-1 md:grid-cols-2 gap-9 justify-between max-w-[1040px] place-content-center">
				<div>
					<Link to="/">
						<h1 className="text-[24px] text-[#111827]">
							Welcome back 👋
						</h1>
					</Link>
					<p className="text-[#4C4C4C] text-[16px] mt-3 mb-3">
						Login to continue from where you left off
					</p>
					<form onSubmit={handleSubmit} className=" flex flex-col space-y-4">
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

						<div className=" flex flex-row gap-3 justify-between">
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
							Remember Me.
						</label>
							<div>
								<p className=" text-[#111827] font-[600] text-[16px]">
									Forgot Password?
								</p>
							</div>
						</div>

						<button disabled={loading} className="text-sm w-full  bg-app-primary font-semibold text-white text-center rounded-3xl mt-3 flex justify-center items-center h-12">
						{loading ? <Loader /> : "Login"}
					</button>

						<div className="flex items-center">
							<div className="grow border-b border-[#11182780]"></div>
							<span className="shrink px-1 pb-1 border-[#11182780]">
								or
							</span>
							<div className="grow border-b border-[#11182780]"></div>
						</div>
					</form>

					<div className=" flex flex-row items-center gap-3 justify-center mt-4">
						<img src="/icons/google.svg" alt="Google img" />
						<span>Login with google</span>
					</div>

					<div>
						<Buttons
							label="Login with apple "
							className=" bg-[#1E1E1E] py-2 text-white rounded-full w-full mt-5 transition"
						/>
					</div>

					<div className=" items-center mt-5 flex flex-row justify-center">
						<p>
							Don’t have an account?{" "}
							<Link to="/signup">
								<span className=" text-app-primary font-semibold underline"> Sign up</span>
							</Link>
						</p>	
					</div>
				</div>

				<div className="">
					<img
						src="/icons/login-bg.svg"
						alt="login background image"
						className=" rounded-[10px] "
					/>
				</div>
			</div>
		</div>
	);
}
