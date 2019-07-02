import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";
import fetcher from "./middlewares/fetcher";
import normalizer from "./middlewares/normalizer";

const middlewares = applyMiddleware(
  thunk,
  fetcher({
    host: process.env.API_HOST,
    headers: {
      "Content-Type": "application/json"
    }
  }),
  normalizer
);

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middlewares
);
