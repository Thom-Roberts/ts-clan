import React from 'react';
import './App.css';
import Main from './Main';
import { Container } from 'semantic-ui-react';

const App: React.FC = () => {

	return (
		<Container className='background'>
			<div className='background-gradient'>
				<Main />
			</div>
		</Container>
	);
}

export default App;