import cookie from "cookie";

export interface SetCookies {
	name: "user";
	value: {
		token: string;
		id: string;
		email: string;
	};
}

export async function POST(request: Request) {
	const body = await request.json();
	const { name, value } = body;

	return new Response("Set Cookies", {
		status: 200,
		headers: {
			"Set-Cookie": cookie.serialize(name, JSON.stringify(value), {
				maxAge: 60 * 60 * 24 * 7, // 7 Days
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV !== "development",
			}),
		},
	});
}
