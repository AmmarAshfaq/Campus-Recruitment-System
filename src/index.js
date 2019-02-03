import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from './Routes'
import store from './store';
import App from './App'
import DrawerUndockedExample from './Component/Navbar/Navbar';
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <DrawerUndockedExample />
                <Routes />
            </div>
        </MuiThemeProvider>
    </Provider>
    // <App/>
    , document.getElementById('root'));
registerServiceWorker();
