import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import '../../index.css';
import '../../App.css';
import Superheroapi from "../../hooks/Superheroapi";

const Comic = ({ onRandomBackground }) => {
	const id = useParams();
	const data = Superheroapi();

	const navigate = useNavigate();

	const [item, setItem] = useState(null);
	const [comicEdition, setComicEdition] = useState('');
	const [randomShadow, setRandomShadow] = useState('10px 5px 5px');
	const [randomMessage, setRandomMessage] = useState('This is random message nr1');

	const randomMessages = ['This is random message nr1', 'This is random message nr2', 'This is random message nr3', 'This is random message nr4']

	const handleSelectChange = (e) => {
		setComicEdition(e.currentTarget.value);
	};

	const getRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const getRandomBoxShadow = () => {
    const offsetX = Math.floor(Math.random() * 20) - 10; // Random offsetX (-10 to 10)
    const offsetY = Math.floor(Math.random() * 20) - 10; // Random offsetY (-10 to 10)
    const blurRadius = Math.floor(Math.random() * 30); // Random blur radius (0 to 30)
    const spreadRadius = Math.floor(Math.random() * 10); // Random spread radius (0 to 10)
    const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.random().toFixed(2)})`; // Random RGBA color

    return `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
  };

	const handleRandomBackground = (e) => {
		e.preventDefault();
		onRandomBackground(getRandomColor());
	};

	const handleRandomShadow = (e) => {
		e.preventDefault();

		setRandomShadow(getRandomBoxShadow());
	};

	const handleMessage = (e) => {
		e.preventDefault();
		const random = Math.floor(Math.random() * 4);
		console.log(random);
		setRandomMessage(randomMessages[random])
	}

	useEffect(() => {
		const mapped = JSON.parse(data).find(item => {
			if (item.id == id.id) {
				return item
			} else {
				return
			}
		});
		setItem(mapped);
		if (mapped.collectedIssues.length > 0) setComicEdition(mapped.collectedIssues[0].name);
	}, [data]);


	if (item)
		return (
			<>
				<div className="comic-wrapper">
					<Link className="back-button" to='/'>go back</Link>
					{item.images.length > 0
					?
					<img style={{ boxShadow: randomShadow}} className="comic-img" src={`${item.images[0].path}.${item.images[0].extension}`} alt="" />
					:
					''
					}
					<h2 className="comic-title">{item.title}</h2>
					<p className="comic-description">
						{
							comicEdition
						}
					</p>
					<p className="comic-description">
						{
							randomMessage
						}
					</p>
				</div>
				<div>
					<form className="comic-form" action="">
						<label className="comic-label">Choose comic edition</label>
						<select className="comic-input" name="edition" id="edition" onChange={e => handleSelectChange(e)}>
							{
								item.collectedIssues.length > 0
									?
									item.collectedIssues.map((i, index) => (
										<option key={index} value={i.name}>{i.name}</option>
									))
									:
									''
							}
						</select>
						<label className="comic-label">Change backgroundcolor</label>
						<button onClick={e => handleRandomBackground(e)} className="comic-input">Randomize background-color</button>
						<label className="comic-label">Change drop shadow color and position</label>
						<button onClick={e => handleRandomShadow(e)} className="comic-input">Randomize shadow</button>
						<label className="comic-label">Change Message</label>
						<button onClick={e => handleMessage(e)} className="comic-input">Random message</button>
					</form>
				</div>
			</>
		);

	if (item === null)
		return (
			<div>Loading...</div>
		);
}

export default Comic;
