// @internal
export interface IStore<R> {
  getState: () => R;
  dispatch: (msg) => void;
  subscribe: () => void;
}

export interface IPrePostTask<R> {
  pre?: (action, store: IStore<R>, ...args) => any;
  post?: (action, store: IStore<R>, ...args) => void;
}

function identity (i) {
  return i;
}

function ReduxPrePostActionMiddleware<R = any> (tasks: IPrePostTask<R>, extraArg?) {
  let pre, post, arg;

  function init (nextTasks, extraArg) {
    pre = nextTasks.pre || identity;
    post = nextTasks.post || identity;
    arg = extraArg;
  }

  init(tasks, extraArg);
  const middleware = (store) => (next) => (action) => {
    const modifiedAction = pre(action, store, arg);
    next(modifiedAction);
    post(modifiedAction, store, arg);
  };
  return Object.assign(middleware, {
    replaceHandler: function (nextTasks, ...extraArgs) {
      init(nextTasks, arg);
    },
  });
}

export default ReduxPrePostActionMiddleware;