import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../Pagination';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  
  const sortType = sort.sortProperty;
  
  
  const {searchValue} = useContext(SearchContext); 
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };
  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  }
  useEffect(() => {
    setIsLoading(true);
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue  ? `&search=${searchValue}` : ``;

    // fetch(
    //   `https://628bd696667aea3a3e371c78.mockapi.io/items?page=${currentPage}&limit=4&${
    //     category}&sortBy=${sortBy}&order=${order}${search}`,
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });
    
    axios.get(
      `https://628bd696667aea3a3e371c78.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
    .then(res => {
      // console.log(res);
      setItems(res.data);
      setIsLoading(false);
    });

      window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items
  .map((el, index) => <PizzaBlock key={index} {...el}  />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton  key={index}/>);
  return (
    <>
    <div className="container">
      <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory}
            />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading ? skeletons : pizzas

            }
            
          </div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>     
    </>
  )
}

export default Home;