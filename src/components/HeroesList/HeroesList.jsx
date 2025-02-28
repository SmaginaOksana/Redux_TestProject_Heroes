import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createSelector } from "reselect";

import // fetchHeroes,
// heroesFetching,
// heroesFetched,
// heroesFetchingError,
// heroDeleted,
"../../actions";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleted,
  fetchHeroes,
  // selectAll,
} from "./HeroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

import "./heroesList.scss";
// import filters from "../../reducers/filters";
// import heroes from "../../reducers/heroes";
import { filteredHeroesSelector } from "./HeroesSlice";

const HeroesList = () => {
  // используем библиотеку createSelector для оптимизации, т.к. хук useSelector вызывает много рендеров
  // думает, что каждый раз в state что-то изменилось и выполняет рендер даже если ничего не менялось
  // поэтому с помощью библиотеки мемоизируем состояние
  // const filteredHeroesSelector = createSelector(
  //   (state) => state.filter.activeFilter,
  //   // (state) => state.heroes.heroes,
  //   selectAll,
  //   (filter, heroes) => {
  //     // heroes возьмутся из рез-та работы SelectAll
  //     if (filter === "all") {
  //       return heroes;
  //     } else {
  //       return heroes.filter((item) => item.element === filter);
  //     }
  //   }
  // );
  const filteredHeroes = useSelector(filteredHeroesSelector);

  const { heroesLoadingStatus } = useSelector((state) => state.heroes);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    // dispatch(heroesFetching());
    // request("http://localhost:3001/heroes")
    //   .then((data) => dispatch(heroesFetched(data)))
    //   .catch(() => dispatch(heroesFetchingError()));

    // dispatch(fetchHeroes(request)); // для thunk
    dispatch(fetchHeroes()); // для createAsyncThunk
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
      // eslint-disable-next-line
    },
    [request]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <div className="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </div>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <div key={id} className="hero">
          <HeroesListItem {...props} onDelete={() => onDelete(id)} />
        </div>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <ul>{elements}</ul>;
};

export default HeroesList;
