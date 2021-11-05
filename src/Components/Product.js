import Image from "next/dist/client/image";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";

const MIN_RATING = 1;
const MAX_RATING = 5;

function Product({ id, title, description, category, image, price }) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  const dispacth = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      description,
      category,
      image,
      price,
      hasPrime,
      rating,
    };

    const productData = { data: product, quantity: 1 };

    // Push product to redux store as action ...backetSlice
    dispacth(addToBasket(productData));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price * 76} currency="INR" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-1">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">
        Add To Basket
      </button>
    </div>
  );
}

export default Product;
