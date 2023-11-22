"use client";
import { useDispatch } from "react-redux";
import { setSearch } from "../context/collection-slice";

export const SearchCollection = () => {
	const dispatch = useDispatch();
	return <input onChange={(e) => dispatch(setSearch(e.target.value))} type="text" placeholder="Buscar coleção" className="search-collection" />;
};
