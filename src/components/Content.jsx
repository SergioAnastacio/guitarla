import Guitarr from "./Guitarr";
import { useEffect, useState } from "react";
import { db } from "../db/db";

export default function Content({ cart, addCart }) {
  //state
  const [data] = useState(db);

  //
  return (
    <>
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitarr key={guitar.id} guitar={guitar} addCart={addCart} />
          ))}
        </div>
      </main>
    </>
  );
}
