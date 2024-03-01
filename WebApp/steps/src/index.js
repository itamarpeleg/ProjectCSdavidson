import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import CreateNewProject from './pages/CreateNewProject';
import './css/App.css';
import './css/Modal.css';
import { WalletProvider } from './utils/WalletContext';
import ProjectPage from './pages/ProjectPage';
import ProjectDevelopment from './pages/ProjectDevelopment';
import NewHome from './pages/NewHome';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// webapp's routing
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WalletProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/new" element={<NewHome />}/>
        
        <Route path="/createNewProject" element={<CreateNewProject />}/>
        <Route path="/project/:projectName" element={<ProjectPage />}/>
        <Route path="/project/:projectName/:changeProposalOrGoBack/:value" element={<ProjectPage />}/>
        <Route path="/project/:projectName/development" element={<ProjectDevelopment />}/>
      </Routes>
    </BrowserRouter>
  </WalletProvider>
);