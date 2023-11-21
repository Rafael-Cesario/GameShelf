export type CookiesName = "user";

export interface UserCookies {
	id: string;
	token: string;
	email: string;
}

export interface SetCookies {
	name: CookiesName;
	value: UserCookies;
}
