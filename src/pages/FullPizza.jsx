import { getByTitle } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } =
        await axios.get(`https://628bd696667aea3a3e371c78.mockapi.io/items/` + id);
        setPizza(data);
        
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate('/');
      }
    }
    
    fetchPizza();
    
  }, []);

  if (!pizza) {
    return 'Загрузка....';
  }
  
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
