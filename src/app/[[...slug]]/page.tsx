'use client';

import dynamic from 'next/dynamic';
import '../../index.scss';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const App = dynamic(() => import('../../App'), { ssr: false });

export default function Page() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
