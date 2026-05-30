import { render } from 'preact';
import 'bootstrap/dist/css/bootstrap.min.css'; // Charge Bootstrap
import { App } from './app.jsx';
import './index.css';

// Initialisation de l'API native Neutralino
if (window.Neutralino) {
    window.Neutralino.init();
}

render(<App />, document.getElementById('app'));