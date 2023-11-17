import { CyHttpMessages } from "cypress/types/net-stubbing";

const stubMutation = (req: CyHttpMessages.IncomingHttpRequest, operationName: string, data: object) => {
	if (req.body.operationName === operationName) {
		req.alias = operationName;
		req.reply({ body: data });
	}
};

describe("Authentication", () => {
	const { devURI } = Cypress.env();

	beforeEach(() => {
		cy.visit("/");
	});

	describe("Create account", () => {
		it("Creates a new user", () => {
			cy.intercept("POST", devURI, (req) => stubMutation(req, "CreateUser", { data: { createUser: "New user created" } }));
			cy.get('[data-cy="input-email"]').type("user01@email.com");
			cy.get('[data-cy="input-password"]').type("Mypassword123");
			cy.get('[data-cy="input-password-check"]').type("Mypassword123");
			cy.get('[data-cy="submit"]').click();
			cy.wait("@CreateUser");

			// Todo > should change current form to login
		});

		// it("Catch response errors")
	});
});
