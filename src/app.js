import React from 'react';
import { createApp, registerFocusManager, registerServiceWorker } from 'renative';
import { navStructure } from './nav';
import ScreenHome from './screenHome';
import ScreenMyPage from './screenMyPage';
import ScreenModal from './screenModal';
import Menu from './menu';

import '../platformAssets/runtime/fontManager';

// registerFocusManager({ focused: 'border: 5px solid #62DBFB; border-radius:5px;' });
// registerServiceWorker();

let AppContainer;

class App extends React.Component {
    constructor(props) {
        super(props);
        global.access_token = '';
        global.client = null;
        AppContainer = createApp(navStructure, { ScreenHome, ScreenMyPage, ScreenModal, Menu });
    }

    render() {
        return AppContainer;
    }
}

export default App;
