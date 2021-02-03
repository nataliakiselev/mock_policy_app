import React, { useContext } from 'react';
import { AuthContext } from './context/auth-context';

import Authenticated from './authenticated';
import Unauthenticated from './unauthenticated';

function App() {
  const { token } = useContext(AuthContext);
  console.log(token, 'app-token');
  return token ? <Authenticated /> : <Unauthenticated />;
}

export default App;
