import React from 'react';
import './App.css';
import "./Main";
import Main from './Main';
import { Container } from 'semantic-ui-react';

const App: React.FC = () => {

  return (
    <Container>
      <Main />
    </Container>
  );
}

export default App;
