import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  calculatePrice,
  removeFromBasket,
  updateQuantity,
} from "../slices/basketSlice";
import { useSelector } from "react-redux";

function ProductcheckOut({
  id,
  title,
  description,
  category,
  image,
  price,
  rating,
  hasPrime,
  quantity,
}) {
  const dispacth = useDispatch();

  const calcPrice = useSelector((state) => calculatePrice(state, { id }));

  // const addItemTobasket = () => {
  //   const product = {
  //     id,
  //     title,
  //     description,
  //     category,
  //     image,
  //     price,
  //     rating,
  //     hasPrime,
  //     quantity,
  //   };
  //   dispacth(addToBasket(product));
  // };

  const removeItemFromBasket = () => {
    dispacth(removeFromBasket({ id }));
  };

  // const [quantity, setQuantity] = useState(1);

  const handleSelect = (e) => {
    const value = e.target.value;
    // setQuantity(value);
    dispacth(updateQuantity({ id: id, quantity: value, price: price }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs mt-2 mb-2 line-clamp-3">{description}</p>
        <Currency quantity={calcPrice * 76} currency="INR" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day delivery</p>
          </div>
        )}
      </div>

      {/* Right add & Remove buttons  */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex-row block p-2 bg-white bg-gray-100 rounded-md">
          <label className="block text-left">
            <span className="text-black-700 font-medium">Qty:</span>
            <select
              value={quantity}
              onChange={handleSelect}
              className="form-select block w-full mt-1"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
        </div>

        {/* <Select options={selectQuantity} />

        <button onClick={addItemTobasket} className="button">
          Add to basket
        </button> */}
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default ProductcheckOut;
