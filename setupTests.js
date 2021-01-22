import '@testing-library/jest-dom/extend-expect';
// import { queryCache } from 'react-query';
import { act } from '@testing-library/react';
// import { server } from 'test/server';

// set the location to the /list route as we auto-redirect users to that route
window.history.pushState({}, 'Login page', '/login');

// speeds up *ByRole queries a bit
//configure({ defaultHidden: true });

// general cleanup
// afterEach(async () => {
//   queryCache.clear();
//   await Promise(logout());
// });

afterEach(() => {
  if (jest.isMockFunction(setTimeout)) {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  }
});
