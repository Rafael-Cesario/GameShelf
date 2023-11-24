import { Header } from "@/features/home/header";
import { Providers } from "@/lib/providers";

const TestComponent = () => (
	<Providers>
		<Header />
	</Providers>
);

describe("Header component", () => {
	beforeEach(() => {
		cy.mount(<TestComponent />);
	});

	it("Opens the add game container", () => {
		cy.get(`[data-cy="open-add-game-container"]`).click();
		cy.get(`[data-cy="search-game"]`).should("exist");
	});

	it("Shows an error message for no game found", () => {
		cy.get(`[data-cy="open-add-game-container"]`).click();
		cy.get(`[data-cy="search-game-input"]`).type("qwelkj");
		cy.get(`[data-cy="search-game-button"]`).click();
		cy.get(`[data-cy="search-error"]`).should("exist");
	});
});
