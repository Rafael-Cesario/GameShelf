import { AddGameStyled } from "./styles/add-game-styled";

export const AddGame = () => {
	return (
		<AddGameStyled>
			<button className="close">x</button>
			<div className="field">
				<input className="name" type="text" placeholder="Digite um nome para procurar" />
				<button className="search">Buscar</button>
			</div>
			<div className="games-container"></div>
		</AddGameStyled>
	);
};
