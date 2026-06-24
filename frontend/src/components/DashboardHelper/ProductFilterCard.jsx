function ProductFilterCard({
  selectedProduct,
  setSelectedProduct,
  productNames,
  selectedProductCount,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* existing code */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Product Filter</h3>

      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3"
      >
        <option value="">All Products</option>

        {productNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <div className="mt-8">
        <p className="text-gray-500 text-sm">Total Matching Assets</p>

        <h2 className="text-5xl font-bold text-green-600 mt-2">
          {selectedProductCount}
        </h2>
      </div>
    </div>
  );
}

export default ProductFilterCard;
