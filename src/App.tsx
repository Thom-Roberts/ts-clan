import React from 'react';
import './App.css';
import "./First";
import First from './First';
import { Container } from 'semantic-ui-react';

const App: React.FC = () => {

  return (
    <Container>
      This is working
      <First />
    </Container>
  );
}

export default App;
