import ReactGA from 'react-ga';
ReactGA.initialize('UA-168134813-1');
ReactGA.pageview(window.location.pathname + window.location.search);
export default ReactGA