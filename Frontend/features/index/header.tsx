import { StyledHeader } from './styles/styledHeader';

export const Header = () => {
	return (
		<StyledHeader>
			<div>
				<span className="games-on-marker">Zerados: 20 Jogos</span>
				<button>Aleatório</button>
				<button>Filtros</button>
				<button>Adicionar novo jogo</button>
			</div>

			<input className='search' type="text" placeholder="Busque por um jogo, tag, gênero ou nota" />
		</StyledHeader>
	);
};
