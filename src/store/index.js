import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
// import heroes from "../reducers/heroes"; // создан с пом. createReducer
import heroes from "../components/HeroesList/HeroesSlice"; // создан с пом. createSlice
// import filter from "../reducers/filters";
import filters from "../components/HeroesFilters/FiltersSlice"; // создан с пом. createSlice

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = createStore(
  combineReducers({ heroes, filters }),

  compose(
    applyMiddleware(thunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
