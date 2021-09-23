import ReactDOM from 'react-dom';
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import { Provider } from 'react-redux';

import LinkerPage from './components/LinkerPage'
import { init as initConfig } from './config';

import 'decentraland-ui/lib/styles.css'
import 'decentraland-ui/lib/dark-theme.css'

;(async () => {
  await initConfig();
  const { store } = await import('./store')
  ReactDOM.render(
    <Provider store={store}>
      <WalletProvider>
        <LinkerPage />
      </WalletProvider>
    </Provider>,
    document.getElementById('root')
  )
})()



