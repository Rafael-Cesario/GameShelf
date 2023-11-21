# Backend

# User

##### Create User

- Password should have at least 10 characters.

```graphql
mutation CreateUser($createUserData: CreateUserInput!) {
	createUser(createUserData: $createUserData)
}
```

```ts
interface CreateUserInput {
	createUserData: {
		email: string;
		password: string;
	};
}

interface CreateUserResponse {
	createUser: string;
}
```

##### Login

```graphql
mutation Login($loginData: LoginInput!) {
	login(loginData: $loginData) {
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
	};
}

interface LoginResponse {
	login: {
		id: string;
		email: string;
		token: string;
	};
}
```

# Collections

##### Create collection

```gql
mutation CreateCollection($createCollectionData: CreateCollectionInput!) {
	createCollection(createCollectionData: $createCollectionData) {
		userID
		id
		name
	}
}
```

```ts
interface CreateCollectionInput {
	createCollectionData: {
		userID: string;
		name: string;
	};
}

interface CreateCollectionResponse {
	createCollection: {
		userID: string;
		id: string;
		name: string;
		games: GameModel[];
	};
}
```

##### Get collections

```gql
query GetCollections($userId: String!) {
  getCollections(userID: $userId) {
    id
    name
    userID
    games {
      id
      userID
      collections {
        id
        name
        userID
      }
    }
  }
}
```

```ts
interface GetCollectionsInput {
	userId: string;
}

interface GetCollectionsResponse {
	getCollections: {
		id: string;
		name: string;
		userID: string;
		games: GameModel[];
	};
}
```

##### Update Collection

```gql
mutation UpdateCollection($updateCollectionData: UpdateCollectionInput!) {
	updateCollection(updateCollectionData: $updateCollectionData) {
		id
		name
		userID
		games {
			id
			userID
			collections {
				id
				name
				userID
			}
		}
	}
}
```

```ts
interface UpdateCollectionInput {
	updateCollectionData: {
		id: string;
		name: string;
	};
}

interface UpdateCollectionResponse {
	updateCollection: {
		id: string;
		name: string;
		userID: string;
		games: GameModel[];
	};
}
```

##### Delete Collection

```gql
mutation DeleteCollection($collectionId: String!) {
  deleteCollection(collectionID: $collectionId)
}
```

```ts
interface DeleteCollectionInput {
	collectionId: string;
}

interface DeleteCollectionResponse {
	deleteCollection: string;
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

	collection: {
		// A collection with the same name already exist.
		duplicated: string;
	};
}
```
