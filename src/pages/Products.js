import React from "react";
import LanguageSelector from "../components/Products/LanguageSelector";
import TranslationArea from "../components/Products/TranslationArea";
import AdditionalFeatures from "../components/Products/AdditionalFeatures";

const Products = () => {
  return (
    <div className="products-page">
      <div className="products-content">
        <LanguageSelector />
        <TranslationArea />
        <AdditionalFeatures />
      </div>
    </div>
  );
};

export default Products;
