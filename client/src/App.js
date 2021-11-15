import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import AddArtist from './pages/AddArtist';
import ArtistProfile from './pages/ArtistProfile';
import Map from './pages/Map';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/map" component={Map} />
          <Route exact path="/addArtist" component={AddArtist} />
          <Route exact path="/map/:id" render={props => <ArtistProfile {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
