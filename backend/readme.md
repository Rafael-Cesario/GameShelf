## Resolvers

### User

#### Create User

```graphql
mutation CreateUser($createUserData: CreateUserInput!) {
	createUser(createUserData: $createUserData) {
		id
		name
		email
	}
}
```

```ts
interface createUserData {
	email: string;
	name: string;
	password: string;
}
```

#### Login

```graphql
mutation Login($loginData: LoginInput!) {
	login(loginData: $loginData) {
		id
		email
		name
		token
	}
}
```

```ts
interface loginData {
	email: string;
	password: string;
}
```
