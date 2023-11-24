import { useDispatch } from "react-redux";
import { setSearch } from "../../context/games-slice";

export const GameSearch = () => {
	const dispatch = useDispatch();
	return <input onChange={(e) => dispatch(setSearch(e.target.value))} type="text" placeholder="Procurar" className="search-games" />;
};
