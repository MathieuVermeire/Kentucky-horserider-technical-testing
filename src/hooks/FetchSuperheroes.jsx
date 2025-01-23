import axios from "axios";
import { useEffect } from "react";

const FetchSuperheroes = () => {
	// https://developer.marvel.com

	const protocol = window.location.protocol === 'https:' ? 'https' : 'http';


	const url = `https://gateway.marvel.com/v1/public/comics?ts=1&apikey=793a5ff5d432192491413b839b1b125a&hash=61ef4a6558c995a73586253e8e9a83c4`;

	const data = localStorage.getItem('comics');

	useEffect(() => {
		const fetch = async () => {
			const res = await axios.get(url);
			localStorage.setItem('comics', JSON.stringify(res.data.data.results));
		}
		fetch();
	}, [url]);
	return data;
}

export default FetchSuperheroes;
