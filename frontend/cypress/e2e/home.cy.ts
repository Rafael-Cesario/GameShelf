import { CollectionModel, CreateCollectionResponse } from "@/services/interfaces/collection";
import { CookiesName, UserCookies } from "@/services/interfaces/cookies";
import { CyHttpMessages } from "cypress/types/net-stubbing";

const stubMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, data: object) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: data });
	}
};

const collections: CollectionModel[] = [
	{ id: "1", name: "Wishlist", userID: "1", games: [] },
	{ id: "2", name: "Completed", userID: "1", games: [] },
	{ id: "3", name: "Favorites", userID: "1", games: [] },
];

describe("Home e2e", () => {
	const { devURI } = Cypress.env();

	beforeEach(() => {
		const name: CookiesName = "user";
		const value: UserCookies = { email: "user@email.com", id: "1", token: "qweasdzxc123" };
		cy.setCookie(name, JSON.stringify(value));

		cy.intercept("POST", devURI, (req) => stubMutation(req, "GetGames", { data: { getGames: [] } }));
		cy.intercept("POST", devURI, (req) => stubMutation(req, "GetCollections", { data: { getCollections: collections } }));
		cy.visit("/");
		cy.wait("@GetGames");
		cy.wait("@GetCollections");
	});

	describe("Sidebar", () => {
		it("Search for collections", () => {
			cy.get(`[data-cy="search-collection"]`).type(collections[0].name);
			cy.get(`[data-cy="collection-container"] > div`).should("have.length", 2);
			cy.get(`[data-cy="search-collection"]`).clear();
			cy.get(`[data-cy="collection-container"] > div`).should("have.length", 4);
		});

		it("Set a collection as active", () => {
			cy.get('[data-cy="collection 1"] > button').click();
			cy.get('[data-cy="collection 1"] > button').should("have.class", "active");
			cy.get('[data-cy="collection-container"] > :nth-child(1) > button').should("not.have.class", "active");
		});

		it("Create a new collection", () => {
			const name = "mistery";
			const response: CreateCollectionResponse = { createCollection: { id: String(collections.length + 1), name, userID: "1", games: [] } };
			cy.intercept("POST", devURI, (req) => stubMutation(req, "CreateCollection", { data: response }));

			cy.get(`[data-cy="create-collection"]`).click();
			cy.get(`[data-cy="collection-name"]`).type(name);
			cy.get(`[data-cy="submit"]`).click();
			cy.wait("@CreateCollection");
			cy.get(`[data-cy="collection-container"] > div`).should("have.length", collections.length + 2);
			cy.get(`[data-cy="create-collection-container"]`).should("not.exist");
		});

		it("Catch an error: Duplicated name", () => {
			cy.intercept("POST", devURI, (req) => stubMutation(req, "CreateCollection", { errors: [{ message: "duplicated" }] }));
			cy.get(`[data-cy="create-collection"]`).click();
			cy.get(`[data-cy="collection-name"]`).type("Duplicated");
			cy.get(`[data-cy="submit"]`).click();
			cy.wait("@CreateCollection");
			cy.get(`[data-cy="notification"] > .message`).should("have.text", "Uma coleção com o mesmo nome já existe.");
		});

		it("logout", () => {
			cy.get(`[data-cy="logout"]`).click();
			cy.get('[data-cy="input-email"]').should("exist");
		});
	});

	describe("Header", () => {
		it("Add new game", () => {
			const gameName = "hollow knight";

			cy.intercept("POST", devURI, (req) => stubMutation(req, "AddGame", { data: { addGame: "New game added" } }));

			cy.get('[data-cy="open-add-game-container"]').click();
			cy.get(`[data-cy="search-game-input"]`).type(gameName);
			cy.get(`[data-cy="search-game-button"]`).click();
			cy.contains(gameName, { matchCase: false }).click();
			cy.get('[data-cy="current-game"]').should("exist");

			cy.contains(gameName, { matchCase: false }).click();
			cy.get(".collections-container > :nth-child(1)").click();
			cy.get(".save-game").click();
			cy.wait("@AddGame");

			cy.get(`[data-cy="game"]`).should("have.length", 1);
			cy.get(`[data-cy="all-games-amount"]`).should("have.text", "1");
			cy.get(`[data-cy="collection 1"] > .amount`).should("have.text", "1");
			cy.get(`[data-cy="current-games-amount"]`).should("include.text", "1");
		});
	});
});
