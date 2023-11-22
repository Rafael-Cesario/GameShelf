import { CreateAccount } from "@/features/authentication/create-account";
import { Providers } from "@/lib/providers";

describe("create-account.cy.tsx", () => {
	beforeEach(() => {
		cy.mount(
			<Providers>
				<CreateAccount props={{ setCurrentForm: cy.stub().as("setCurrentForm") }} />
			</Providers>
		);
	});

	it("Validates an input on change", () => {
		cy.get(`[data-cy="input-email"]`).type("invalid");
		cy.get("[data-cy='error-email']").should("have.text", "Seu email não é valido");
	});

	it("Removes error when input is valid", () => {
		cy.get(`[data-cy="input-email"]`).type("valid@email.com");
		cy.get(`[data-cy="error-input"]`).should("not.exist");
	});

	it("Changes the current form", () => {
		cy.get('[data-cy="change-form"]').click();
		cy.get("@setCurrentForm").should("be.calledWith", "login");
	});

	it("Shows an error if user try to submit with empty fields", () => {
		cy.get(`[data-cy="submit"]`).click();

		cy.get('[data-cy^="error-"]')
			.should("have.length", 3)
			.each((element) => expect(element).to.have.text("Este campo não pode ficar vazio"));
	});
});
