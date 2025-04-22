import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsAPI";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import {
  selectAllProducts,
  selectProductStatus,
  selectProductError,
} from "../features/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);

  useEffect(() => {
    if (status === "idle") {
      console.log("Initiating product fetch...");
      dispatch(fetchProducts())
        .unwrap()
        .then((result) => console.log("Fetch succeeded:", result))
        .catch((err) => console.error("Fetch failed:", err));
    }
  }, [status, dispatch]);

  // Enhanced rendering logic
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>

      {status === "loading" && <LoadingSpinner />}

      {status === "failed" && (
        <div className="bg-red-50 p-4 rounded">
          <ErrorMessage message={error} />
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
            Retry
          </button>
        </div>
      )}

      {status === "succeeded" && (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No products available</p>
              <button
                onClick={() => dispatch(fetchProducts())}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Refresh
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
