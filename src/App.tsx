import './App.css'
import Login from './screens/Login'
import useIsAuthenticated from './useIsAuthenticated';
import D3vNotes from './screens/D3vNotes';
import Loading from './screens/Loading';
import { MarkdownManagerProvider, useMarkdownManagerContext } from './context/provider';

function App() {
  const { isAuthenticated, isInitializing } = useIsAuthenticated();

  if (isInitializing) {
    return <Loading />;
  } else if (isAuthenticated) {
    return <MarkdownManagerProvider><D3vNotes /></MarkdownManagerProvider>;
  } else {
    return <Login />;
  }
}

export default App
