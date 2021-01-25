import { FormattedMessage } from 'react-intl';
import './App.css';
import ContextLocalizer from './i18n/ContextLocalizer';

function App() {
  return <ContextLocalizer handle_url_param={true}>
    <div className="app">
      <FormattedMessage id="test" />
    </div>
  </ContextLocalizer>
}

export default App;
