import { ThemeProvider } from '@material-ui/core/styles';
import TaskList from 'components/TaskList';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TaskList />
    </ThemeProvider>
  );
}

export default App;
