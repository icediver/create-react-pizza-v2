import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectSort, setSort, Sort, SortPropertyEnum } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortList: SortItem[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

function SortPop() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    // onChangeSort(index);
    dispatch(setSort(obj));
    setOpen(false);
  };
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // const _event = event as MouseEvent & {
      //   path: Node[];
      // };
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <SortElement ref={sortRef}>
      <SortLabel>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </SortLabel>
      {open && (
        <SortPopup>
          <ul>
            {sortList.map((obj, index) => {
              return (
                <SortListItem
                  key={index}
                  onClick={() => onClickListItem(obj)}
                  className={
                    sort.sortProperty === obj.sortProperty ? "active" : ""
                  }>
                  {obj.name}
                </SortListItem>
              );
            })}
          </ul>
        </SortPopup>
      )} 
    </SortElement>
  );
}
export default SortPop;

const SortElement = styled.div`
  position: relative;
  width: 260px;
  .sort__label {
  }

  .sort__popup {
  }
`;
const SortLabel = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  b {
    margin-right: 8px;
  }

  span {
    color: #fe5f1e;
    border-bottom: 1px dashed #fe5f1e;
    cursor: pointer;
  }
  @media (max-width: 820px) {
    justify-content: center;
  }
  @media (max-width: 1260px) {
    b {
      display: none;
    }
  }
`;
const SortPopup = styled.div`
  position: absolute;
  right: 0;
  margin-top: 15px;
  background: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  overflow: hidden;
  padding: 10px 0;
  width: 220px;

  ul {
    overflow: hidden;
    li {
    }
  }
`;
const SortListItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;

  &.active,
  &:hover {
    background: rgba(254, 95, 30, 0.05);
  }

  &.active {
    font-weight: bold;
    color: #fe5f1e;
  }
`;
