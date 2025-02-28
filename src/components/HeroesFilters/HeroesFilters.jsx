import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import store from "../../store";

import { filtersChanged, fetchFilters, selectAll } from "./FiltersSlice";

// import {
//   fetchFilters,
//   filtersFetching,
//   filtersFetched,
//   filtersFetchingError,
//   activeFilterChanged,
// } from "../../actions";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  // const { filters, filtersLoadingStatus, activeFilter } = useSelector(
  //   (state) => state.filter
  // );
  const { filtersLoadingStatus, activeFilter } = useSelector(
    (state) => state.filters
  );
  const filters = selectAll(store.getState()); // не можем создать эту переменную в слайсе и
  // вытащить фильтры, так как нам для этого необходим стор, а в слайс он формируется,
  // и нельзя вытащить то, чего еще не существует на стадии формир-я

  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    // dispatch(filtersFetching());
    // request("http://localhost:3001/filters")
    //   .then((data) => dispatch(filtersFetched(data)))
    //   .catch(() => dispatch(filtersFetchingError()));

    dispatch(fetchFilters(request)); // для thunk
    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    return arr.map(({ name, className, label }) => {
      // Используем библиотеку classnames и формируем классы динамически
      const btnClass = classNames("btn", className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          className={btnClass}
          // onClick={() => dispatch(activeFilterChanged(name))}
          onClick={() => dispatch(filtersChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
