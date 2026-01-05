import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import Review from "../components/review/Review";
import RelatedProducts from "../components/relatedProducts/RelatedProducts";
import Loading from "../components/common/Loading";
import NotFound from "../pages/NotFound";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]); 

  if (!all_product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const product = all_product.find((e) => e.id === Number(productId));

  if (!product) {
    return <NotFound />;
  }

  return (
    <div>
      <ProductDisplay product={product} />
      <Review />
      <RelatedProducts />
    </div>
  );
};

export default Product;
