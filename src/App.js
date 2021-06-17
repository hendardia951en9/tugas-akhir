// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//components
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//pages
import Dashboard from "./components/Pages/Dashboard";
import GettingStarted from "./components/Pages/GettingStarted";
import Home from "./components/Pages/Home";
import WebGenerator from "./components/Pages/WebGenerator";
import Pricing from "./components/Pages/Pricing";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";

//css
import "./App.css";

export const AppContext = React.createContext();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <LoadingScreen />}

      <Router>
        <AppContext.Provider value={{ isLoading, setIsLoading }}>
          <Navbar />
          <Route exact path="/">
            <Home />
            <Footer />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
            <Footer />
          </Route>
          <Route exact path="/gettingstarted">
            <GettingStarted />
            <Footer />
          </Route>
          <Route exact path="/logout">
            <Redirect to="/" />
          </Route>
          <Route exact path="/webgenerator">
            <DndProvider backend={HTML5Backend}>
              <WebGenerator />
            </DndProvider>
          </Route>
          <Route exact path="/pricing">
            <DndProvider backend={HTML5Backend}>
              <Pricing />
            </DndProvider>
          </Route>
          <Route exact path="/signin">
            <SignIn />
            <Footer />
          </Route>
          <Route exact path="/signup">
            <SignUp />
            <Footer />
          </Route>
        </AppContext.Provider>
      </Router>
    </>
  );
};

export default App;
