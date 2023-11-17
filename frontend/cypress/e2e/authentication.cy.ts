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
			cy.get(`[data-cy="notification"]`).should("exist");
			cy.get(`[data-cy="notification"] > .top > .title`).should("have.text", "Sucesso");
			// Todo > should change current form to login
		});

		it("Catch response errors", () => {
			cy.intercept("POST", devURI, (req) => stubMutation(req, "CreateUser", { errors: [{ message: "duplicated:" }] }));
			cy.get('[data-cy="input-email"]').type("user01@email.com");
			cy.get('[data-cy="input-password"]').type("Mypassword123");
			cy.get('[data-cy="input-password-check"]').type("Mypassword123");
			cy.get('[data-cy="submit"]').click();
			cy.wait("@CreateUser");
			cy.get(`[data-cy="notification"] > .message`).should("have.text", "Este email já está em uso.");
		});
	});
});
