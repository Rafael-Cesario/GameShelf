# GameShelf Backend


# User



##### Create User

- Password should have at least 10 characters.

```graphql
mutation CreateUser ( $createUserData: CreateUserInput! ) {
	createUser ( createUserData: $createUserData )
}
```

```ts
interface CreateUserInput {
	createUserData: { 
		email: string;
		password: string;
	}
}

interface CreateUserResponse {
	createUser: string;
}
```


##### Login

```graphql
mutation Login ( $loginData: LoginInput! ) {
	login ( loginData: $loginData ) {
		id
		email
		token
	}
}
```

```ts
interface LoginInput {
	loginData: {
		email: string;
		password: string;
	}
}

interface LoginResponse {
	login: {
		id: string;
		email: string;
		token: string;
	}
}
```



##### Errors

```ts
interface Errors {
	user: {
		// Email is already in use
		duplicated: string;
		// Email/Password is wrong
		unauthorized: string;
	};
};
```
