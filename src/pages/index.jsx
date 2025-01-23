import { Link } from 'react-router-dom';
import '../index.css';
import FetchSuperheroes from "../hooks/FetchSuperheroes";


const Index = () => {

	const data = FetchSuperheroes();

	return (
		<div className='superheroes-wrapper'>
			<div className='superheroes'>
				{!data ? 'Data Loading...' : JSON.parse(data).map((item, index) => (
					<div className='superhero' key={index}>
						<Link to={`/comic/${item.id}`}>
							{
								item.images[0]
									?
									<img src={`${item.images[0].path}.${item.images[0].extension}`} className="img" alt="React logo" />
									:
									<div className="empty-img"></div>
							}
							<h2>{item.title}</h2>
						</Link>
					</div>

				))}
			</div>
		</div>
	);
}

export default Index;
