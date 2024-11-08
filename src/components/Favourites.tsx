import { FC } from "react";
import { Product } from "../interfaces/Product";
import Card from "./Card";
import { TypeProduct } from "../interfaces/types";

interface Props {
    data: Product[],
    fetchData: () => void,
    setFavourites?: React.Dispatch<React.SetStateAction<Product[]>>,
}

const Favourites: FC<Props> = ({ data, fetchData, setFavourites }) => {

    return (
        <section>
            <h1 style={{ justifySelf: 'center' }}>Избранное</h1>
            <div className="cards">
                {data.length ? data.map((item, index) => <Card type={TypeProduct.CLIENT} data={item} key={index} fetchData={fetchData} setFavourites={setFavourites} />)
                    :
                    <p>Нет товаров</p>}
            </div>
        </section>
    )
}

export default Favourites;