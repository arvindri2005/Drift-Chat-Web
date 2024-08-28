
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route path = "/" component={HomePage} exact></Route>
        <Route path = "/chats" component={ChatPage}></Route>
      </header>
    </div>
  );
}

export default App;
