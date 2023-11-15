interface Errors {
	user: {
		// Email is already in use
		duplicated: string;
		// Email/Password is wrong
		unauthorized: string;
	};
}
