import React from 'react';
import { Provider } from 'react-redux';
import Home from './components/Home';
import makeStore from './redux/store';

const store = makeStore();
function App() {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
}

App.displayName = 'App';
export default App;
