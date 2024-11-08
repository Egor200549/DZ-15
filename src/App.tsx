/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { Product } from './interfaces/Product';

function App() {
  const [menu, setMenu] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');

  const changeMenu = () => {
    setMenu(prevState => !prevState);
  }

  const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: Product = {
      id: Number(Date.now().toString()),
      name: name,
      price: price,
      year: Number(year)
    }
    try {
      const response = await fetch('https://a4a09c5ecb7ce7ac.mokky.dev/products',
        {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify(newItem)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setProducts(prevData => [...prevData, data]);
      setName('');
      setPrice('');
      setYear('');

    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('https://a4a09c5ecb7ce7ac.mokky.dev/products');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setProducts(data);

    } catch (error: any) {
      console.error('Error fetching:', error.message);
    }
  }

  useEffect(() => { fetchData() }, []);

  return (
    <>
      <header>
        <button className="card__button edit" onClick={changeMenu} style={{padding: '10px 30px', width: 'fit-content', borderRadius: 0}}>Добавить продукт</button>
        <form className={`${menu ? "form" : 'none'}`} onSubmit={(e) => addItem(e)}>
          <input type="text" value={name} placeholder="Название" onChange={(e) => setName(e.target.value)} />
          <input type="text" value={price} placeholder="Цена" onChange={(e) => setPrice(e.target.value)} />
          <input type="text" value={year} placeholder="Год" onChange={(e) => setYear(e.target.value)} />
          <button type="submit">Добавить продукт</button>
        </form>
      </header>

      <div className="cards">
        {products.map((item, index) => <Card data={item} key={index} fetchData={fetchData} />)}
      </div>
    </>
  )
}

export default App;
