import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://629f31168b939d3dc291db2d.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        console.log(error);
        alert('Ошибка при загрузке пиццы');
        navigate('/');
      }
    })();
  }, []);
  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Full Screen pizza" />
      <h2>{pizza.name}</h2>
      <p>
        Пицца — это блюдо, которое придумали в Италии. Его готовят, кладя «начинки» (например, сыр,
        колбасы, пепперони, овощи, помидоры, специи и травы) на кусок хлеба, покрытый соусом; чаще
        всего томатный, но иногда используются соусы на основе сливочного масла.
      </p>
      <h4>{pizza.price} рублей</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
