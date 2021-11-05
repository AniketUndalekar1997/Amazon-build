import React from "react";
import Header from "../Components/Header";
import Image from "next/dist/client/image";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import ProductcheckOut from "../Components/ProductcheckOut";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { selectTotal } from "../slices/basketSlice";

function checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const total = useSelector(selectTotal);

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* left  */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Shopping Basket" : "Shopping Basket"}
            </h1>

            {Object.keys(items).map((key, i) => (
              <ProductcheckOut
                title={items[key].title}
                id={items[key].id}
                description={items[key].description}
                category={items[key].category}
                image={items[key].image}
                price={items[key].price}
                rating={items[key].rating}
                hasPrime={items[key].hasPrime}
                quantity={items[key].quantity}
              />
            ))}
          </div>
        </div>

        {/* right  */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {Object.keys(items).length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length}) items:{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="INR" />
                </span>
              </h2>

              <button
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed "
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
