import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../Pagination';

const Home = () => {
  const {searchValue} = useContext(SearchContext); 
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating'
  });

  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue  ? `&search=${searchValue}` : ``;

    fetch(
      `https://628bd696667aea3a3e371c78.mockapi.io/items?page=${currentPage}&limit=4&${
        category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
      window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items
  // .filter(obj => {
  //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //     return true;
  //   } 
  //   return false;
  // })
  .map((el, index) => <PizzaBlock key={index} {...el}  />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton  key={index}/>);
  return (
    <>
    <div className="container">
      <div className="content__top">
            <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}
            />
            <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading ? skeletons : pizzas

            }
            
          </div>
          <Pagination onChangePage={(number) => setCurrentPage(number)}/>
      </div>     
    </>
  )
}

export default Home;