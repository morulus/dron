import isPlainObject from 'lodash.isPlainObject';
import assignState from './assignState';
import recycle from './recycle';

export default function cliapp(app) {
  if (!isPlainObject(app)) {
    throw new Error('cliapp requires configuration of plain object');
  }
  const { description, help, getInitialState, worker } = app;
  // Validate
  const typeOfDescription = typeof description;
  const typeOfHelp = typeof help;
  const typeOfGetInitialState = typeof getInitialState;
  const typeOfWorker = typeof worker;
  // Description
  if (typeOfDescription !== 'string' || description.length === 0) {
    throw new Error(`cliapp expects app.descripton to be a string and non-empty`);
  }
  // Description
  if (typeOfHelp !== 'string' || help.length === 0) {
    throw new Error(`cliapp expects app.descripton to be a string and non-empty`);
  }
  // getInitialState
  if (typeOfGetInitialState !== 'function') {
    throw new Error(`cliapp expects getInitialState to be a function, ${typeOfGetInitialState} given`);
  }
  // typeOfWorker
  if (typeOfWorker !== 'function') {
    throw new Error(`cliapp expects worker to be a function, ${typeOfWorker} given`);
  }
  const cliApplication = function* cliApplication(args) {
    const initialState = getInitialState(args);
    // Validate initial state
    if (!isPlainObject(initialState)) {
      throw new Error('getInitialState must return plain object, ${typeof initialState} given');
    }
    // Assign initial state
    yield assignState(initialState);
    // Run
    yield recycle(worker);
  }
  cliApplication.help = help;
  cliApplication.description = description;
  return cliApplication;
}
