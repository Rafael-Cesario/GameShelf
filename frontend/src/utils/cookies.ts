import { UserCookies } from "@/services/interfaces/cookies";

export const getCookiesUser = async () => {
	const response = await fetch("/api/cookies", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	const cookies = await response.json();
	const userCookies: UserCookies = JSON.parse(cookies.userCookies);
	return userCookies;
};
