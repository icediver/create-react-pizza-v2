// import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { sortList } from "../components/Sort";
import Pagination from "../Pagination";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  // const isSearch = useRef(false);

  // const sortType = sort.sortProperty;

  // const [isLoading, setIsLoading] = useState(true);
  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };


  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    getPizzas();
    // if (window.location.search) {
    //   const params = qs.parse(window.location.search.substring(1));
    //   const sort = sortList.find(
    //     obj => obj.sortProperty === params.sortProperty,
    //   );

    //   dispatch(
    //     setFilters({
    //       ...params,
    //       sort,
    //     }),
    //   );
    //   isSearch.current = true;
    // }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);
    // Парсим параметры при первом рендере
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);


  // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortType,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);
  // // Если был первый рендер, то запрашиваем пиццы
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   if (!isSearch.current) {
  //     getPizzas();
  //   }
  //   isSearch.current = false;
  // }, [categoryId, sortType, searchValue, currentPage]);

 

  const pizzas = items.map((el: any) => (
   
      <PizzaBlock {...el} />
   
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>
              К сожалению не удалось получить пиццы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
