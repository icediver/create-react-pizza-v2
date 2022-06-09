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
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const isSearch = useRef(false);

  const sortType = sort.sortProperty;

  const [isLoading, setIsLoading] = useState(true);
  const onChangeCategory = id => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };
  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        obj => obj.sortProperty === params.sortProperty,
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);
  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const getPizzas = async () => {
    setIsLoading(true);
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;

    try {
      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage,
        }),
      );
    } catch (error) {
      console.log("ERROR", error);
      alert("Ошибка при получении пицц");
    } finally {
      setIsLoading(false);
    }
  };

  const pizzas = items.map((el, index) => (
    <Link key={index} to={`/pizza/${el.id}`}>
      <PizzaBlock {...el} />
    </Link>
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
