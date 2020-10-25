import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/home';
import Detail from './Components/detail';

class App extends Component{

  render(){
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/:title_text' component={Detail}/>
        </Switch> 
      </div>
      </BrowserRouter>
    );
  };
}

export default App;
