import React from 'react';
import './App.css';
import Main from './Main';
import { Container } from 'semantic-ui-react';

const App: React.FC = () => {

  return (
    <Container style={{backgroundColor: 'white', height: '100%',}}>
      <Main />
    </Container>
  );
}

export default App;