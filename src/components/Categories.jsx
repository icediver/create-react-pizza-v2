import { useState } from "react";

function Categories ({ value, onChangeCategory }) {
  const [activeIndex, setActivetIndex] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  // const onClickCategory = (index) => {
  //   setActivetIndex(index);
  // }
  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, index) => {
            return (
              <li
                key={index}
                onClick={() => onChangeCategory( index )}
                className={value ===  index  ? 'active' : ''}>
                {categoryName}
              </li>
            );
          })
        }
        
      </ul>
    </div>
  )
}
export default Categories;