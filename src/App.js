import React from 'react';
import './App.scss';

import LoginPanel from './Routes/LoginPanel';
import HomePanel from './Routes/HomePanel';
import UserSettingsPanel from './Routes/UserSettingsPanel';

function App() {
  return (
    <div className="stuff-app">
      <LoginPanel></LoginPanel>
      <HomePanel></HomePanel>
      <UserSettingsPanel></UserSettingsPanel>
    </div>
  );
}

export default App;
