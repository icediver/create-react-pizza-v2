import React from 'react'
import { useState } from "react";
type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};
const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  const [activeIndex, setActivetIndex] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? "active" : ""}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
})
export default Categories;
