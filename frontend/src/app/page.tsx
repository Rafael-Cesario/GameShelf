import { StyledHeader, StyledMain } from "@/styles/styled-home";

const Home = () => {
	return (
		<>
			<StyledHeader>
				<button>Entrar</button>
				<button>Criar sua conta</button>
			</StyledHeader>

			<StyledMain>
				<h1 className="name">GameShelf</h1>
				<h2 className="title">Procurando um lugar para organizar seus jogos?</h2>
				<p className="text">GameShelf é uma estante virtual para você salvar seus jogo s favoritos, ficar por dentro de lançamentos e manter uma listinha de jogos que você quer jogar ou já zerou.</p>
				<button className="games">Ver jogos</button>
			</StyledMain>
		</>
	);
};

export default Home;
