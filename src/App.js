import './App.css';
import Header from './Components/Header/Header';
import  {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faBookOpen} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faBookOpen)

function App() {
  return (
    <div className="App">
      <header className="App-header">
         <Header/>
      </header>
    </div>
  );
}

export default App;
