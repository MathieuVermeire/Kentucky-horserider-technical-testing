import { Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Index from './pages/index';
import Comic from './pages/comic/Comic';
import { useEffect, useState } from 'react';

function App() {
	const [randomBackground, setRandomBackground] = useState('#8b0000');

	useEffect(() => {
    document.body.style.backgroundColor = randomBackground;
  }, [randomBackground]);

	return (
		<main style={{backgroundColor: randomBackground}}>
				<Routes>
					<Route path='/' index element={<Index />} />
					<Route path='/comic/:id' element={<Comic onRandomBackground={setRandomBackground} />} />
				</Routes>

		</main>
	)
}

export default App
