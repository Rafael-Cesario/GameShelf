import { Field } from "@/features/authentication/components/field";

describe("Field", () => {
	it("Show and hide password", () => {
		cy.mount(<Field props={{ error: "Some error here", fieldName: "password", label: "Password", onChange: cy.stub(), placeholder: "...", type: "password", value: "Empty" }} />);
		cy.get('[data-cy="input-password"]').should("have.attr", "type", "password");
		cy.get("button").click();
		cy.get('[data-cy="input-password"]').should("have.attr", "type", "text");
		cy.get("button").click();
		cy.get('[data-cy="input-password"]').should("have.attr", "type", "password");
	});
});
