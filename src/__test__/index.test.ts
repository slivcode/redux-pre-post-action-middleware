import { applyMiddleware, createStore } from 'redux';
import ReduxPrePostActionMiddleware from '../index';

describe('middleware test', () => {
  test('base test', () => {
    const m1 = jest.fn();
    const m2 = jest.fn();
    const middleware = ReduxPrePostActionMiddleware({
      pre: (...args) => {
        m1(...args);
        return { type: 'dec' };
      },
      post: (...args) => {
        m2(...args);
        expect(args[0].type === 'dec').toBeTruthy();
      },
    });
    const store = createStore((pr = 0, action) => {
      return pr;
    }, applyMiddleware(middleware));
    store.dispatch({
      type: 'inc',
    });

    expect(m1).toBeCalled();
    expect(m2).toBeCalled();
    middleware.replaceHandler({});
    store.dispatch({
      type: 'inc',
    });
    expect(m1).toHaveBeenCalledTimes(1);
    expect(m2).toHaveBeenCalledTimes(1);
  });
});