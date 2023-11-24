import { Header } from "@/features/home/header";
import { Providers } from "@/lib/providers";

const TestComponent = () => (
	<Providers>
		<Header />
	</Providers>
);

describe("Header component", () => {
	it("Opens the add game container", () => {
		cy.mount(<TestComponent />);
		cy.get(`[data-cy="open-add-game-container"]`).click();
		cy.get(`[data-cy="search-game"]`).should("exist");
	});
});
