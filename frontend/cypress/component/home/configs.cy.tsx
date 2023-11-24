import { Configs } from "@/features/home/components/header/configs/configs";
import { Providers } from "@/lib/providers";

const TestComponent = () => (
	<Providers>
		<Configs />
	</Providers>
);

describe("Configs component", () => {
	beforeEach(() => {
		cy.mount(<TestComponent />);
	});

	it("Opens configs component", () => {
		cy.get(`[data-cy="open-configs"]`).click();
		cy.get(`[data-cy="configs-title"]`).should("exist");
	});

	it("Blocks user from changing the 'all games' collection", () => {
		cy.get(`[data-cy="open-configs"]`).click();
		cy.get(`[data-cy="save"]`).click();
		cy.get(`[data-cy="error"]`).should("have.text", "Esta coleção não pode ser modificada.");
	});
});
