import { CookiesName } from "@/services/interfaces/cookies";
import cookie from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
				secure: process.env.NODE_ENV === "development" ? false : process.env.NODE_ENV === "test" ? false : true,
				path: "/",
			}),
		},
	});
}

export async function GET() {
	const store = cookies();
	const name: CookiesName = "user";
	const cookie = store.get(name);
	if (!cookie?.value) throw new Error("User cookies is undefined");
	return NextResponse.json({ userCookies: cookie.value });
}

export async function DELETE() {
	const name: CookiesName = "user";
	cookies().delete(name);
	return NextResponse.json({ message: "User Cookies deleted" });
}
