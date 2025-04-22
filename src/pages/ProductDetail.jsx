import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAllProducts,
  selectSelectedProduct,
  setSelectedProduct,
} from "../features/products/productsSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const product = useSelector(selectSelectedProduct);

  useEffect(() => {
    if (products.length > 0) {
      const selected = products.find((p) => p.id.toString() === productId);
      dispatch(setSelectedProduct(selected));
    }
  }, [productId, products, dispatch]);

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={`https://admin.refabry.com/storage/product/${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-blue-600 text-xl font-medium mb-4">
              ${product.price}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
