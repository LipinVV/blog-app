import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {store} from "./store";
import {LoadingPage} from "./veiws/LoadingPage";
import './index.scss';

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
           <Provider store={store}>
               <Suspense fallback={<LoadingPage/>}>
                   <App/>
               </Suspense>
           </Provider>
        </BrowserRouter>
    </React.StrictMode>
);