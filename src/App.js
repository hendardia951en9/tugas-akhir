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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

//components
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//pages
import AdminDashboard from "./components/Pages/AdminDashboard";
import CreateTheme from "./components/Pages/CreateTheme";
import Dashboard from "./components/Pages/Dashboard";
import GettingStarted from "./components/Pages/GettingStarted";
import Home from "./components/Pages/Home";
import Pricing from "./components/Pages/Pricing";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import ThemeList from "./components/Pages/ThemeList";
import ThemePreview from "./components/Pages/ThemePreview";
import UserWebsite from "./components/Pages/UserWebsite";
import WebGenerator from "./components/Pages/WebGenerator";

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
          <Switch>
            <Route exact path="/">
              <Navbar />
              <Home />
              <Footer />
            </Route>
            <Route exact path="/admindashboard">
              <Navbar />
              <AdminDashboard />
              <Footer />
            </Route>
            <Route exact path="/createtheme">
              <Navbar />
              <CreateTheme />
              <Footer />
            </Route>
            <Route exact path="/dashboard">
              <Navbar />
              <Dashboard />
              <Footer />
            </Route>
            <Route exact path="/gettingstarted">
              <Navbar />
              <GettingStarted />
              <Footer />
            </Route>
            <Route exact path="/home">
              <Redirect to="/" />
            </Route>
            <Route exact path="/logout">
              <Redirect to="/" />
            </Route>
            <Route exact path="/pricing">
              <Navbar />
              <Pricing />
              <Footer />
            </Route>
            <Route exact path="/signin">
              <Navbar />
              <SignIn />
              <Footer />
            </Route>
            <Route exact path="/signup">
              <Navbar />
              <SignUp />
              <Footer />
            </Route>
            <Route exact path="/themelist">
              <Navbar />
              <ThemeList />
              <Footer />
            </Route>
            <Route exact path="/theme/:themeID/:themePage">
              <ThemePreview />
            </Route>
            <Route exact path="/website/:userEmail/:websiteName/:websitePage">
              <UserWebsite />
            </Route>
            <Route exact path="/webgenerator">
              <Navbar />
              <DndProvider backend={HTML5Backend}>
                <WebGenerator />
              </DndProvider>
            </Route>
            <Route path="*">
              <h1>404 - Not Found</h1>
            </Route>
          </Switch>
        </AppContext.Provider>
      </Router>
    </>
  );
};

export default App;
