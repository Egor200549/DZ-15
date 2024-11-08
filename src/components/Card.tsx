import { FC, useState } from "react";
import { Product } from "../interfaces/Product";

interface Props {
    data: Product,
    fetchData: () => void,
}

const Card: FC<Props> = ({ data, fetchData }) => {

    const [menu, setMenu] = useState(false);
    const [name, setName] = useState(data.name);
    const [price, setPrice] = useState(data.price);
    const [year, setYear] = useState(data.year.toString());

    const deleteItem = async (id: number) => {
        try {
            const response = await fetch('https://a4a09c5ecb7ce7ac.mokky.dev/products/' + id,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify({ id: id })
                }
            );

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            fetchData();

        } catch (error) {
            console.error(error);
        }
    }

    const editItem = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();

        const newItem = {
            name: name,
            price: price,
            year: Number(year)
        }
        try {
            const response = await fetch('https://a4a09c5ecb7ce7ac.mokky.dev/products/' + id,
                {
                    method: "PATCH",
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

            fetchData();

        } catch (error) {
            console.error(error);
        }
    }

    const edit = () => {
        setMenu(prevState => !prevState);
    }

    return (
        <div className="card">
            <h2>{data.name}</h2>
            <div className="card__body">
                <h2>${data.price}</h2>
                <h4>{data.year} г.</h4>
            </div>
            <form className={`${menu ? 'form' : 'form none'}`} onSubmit={(e) => editItem(e, data.id)}>
                <input type="text" value={name} placeholder="Название" onChange={(e) => setName(e.target.value)} />
                <input type="text" value={price} placeholder="Цена" onChange={(e) => setPrice(e.target.value)} />
                <input type="text" value={year} placeholder="Год" onChange={(e) => setYear(e.target.value)} />
                <button type="submit">Редактировать продукт</button>
            </form>
            <div className="card__buttons">
                <button className="card__button delete" onClick={() => deleteItem(data.id)}>
                    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" fill="#fff" />
                    </svg>
                </button>
                <button className="card__button edit" onClick={edit}>
                    <svg width="30" height="40" enableBackground="new 0 0 40 40" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                        <path d="m51.9 8.4-4.3-4.3c-1.4-1.4-3.7-1.4-5.2 0l-34.5 34.5c-.3.3-4.7 12.7-4.8 13.1-.3.8.5 1.6 1.3 1.3.3-.1 12.8-4.6 13-4.9l34.5-34.5c1.5-1.5 1.5-3.8 0-5.2zm-41.9 30.9 27.4-27.4 2.6 2.6-27.3 27.4zm-1 1.8 5.9 5.9-3.9 1.4c-.7-1.5-1.9-2.6-3.4-3.4zm-2.1 5.8c.9.5 1.6 1.3 2.2 2.2l-3.4 1.2zm9.8-.9-2.6-2.6 27.3-27.4 2.6 2.6zm33.8-33.9-5 5-6.7-6.7 5-5c.6-.6 1.7-.6 2.3 0l4.3 4.3c.8.7.8 1.8.1 2.4z" fill="#fff" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Card;