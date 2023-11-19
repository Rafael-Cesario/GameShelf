import { CookiesName } from "@/app/api/cookies/route";
import { LoginResponse } from "@/services/interfaces/user";
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
		beforeEach(() => {
			cy.get(`[data-cy="change-form"]`).click();
		});

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

	describe("Login", () => {
		const user = { email: "user01@hotmail.com", id: "1" };

		it("Login and saves user's data on cookies", () => {
			const cookieName: CookiesName = "user";
			const loginResponse: LoginResponse = { login: { email: user.email, id: user.id, token: "123qwe456rty789uio" } };

			cy.intercept("POST", devURI, (req) => stubMutation(req, "Login", { data: loginResponse }));
			cy.get(`[data-cy="input-email"]`).type(user.email);
			cy.get(`[data-cy="input-password"]`).type("MyPassword123");
			cy.get(`[data-cy="submit"]`).click();
			cy.wait("@Login");
			cy.get('[data-cy="login-title"]').should("not.exist");
			cy.getCookie(cookieName).then((cookie) => void expect(cookie).to.exist);
		});

		it("Catch response errors", () => {
			cy.intercept("POST", devURI, (req) => {
				stubMutation(req, "Login", { errors: [{ message: "unauthorized:" }] });
			});

			cy.get(`[data-cy="input-email"]`).type(user.email);
			cy.get(`[data-cy="input-password"]`).type("MyPassword123");
			cy.get(`[data-cy="submit"]`).click();
			cy.wait("@Login");
			cy.get(`[data-cy="notification"] > .message`).should("have.text", "Email ou senha incorretos.");
		});
	});
});
