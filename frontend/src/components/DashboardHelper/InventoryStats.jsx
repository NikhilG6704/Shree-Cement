function InventoryStats({
  totalProducts,
  totalIssuedProducts,
  totalDamagedProducts,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Inventory Statistics
      </h3>

      <div className="space-y-6">
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-600">Total Products</span>

          <span className="text-4xl font-bold text-blue-600">
            {totalProducts}
          </span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-600">Issued Products</span>

          <span className="text-4xl font-bold text-yellow-600">
            {totalIssuedProducts}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Damaged Products</span>

          <span className="text-4xl font-bold text-red-600">
            {totalDamagedProducts}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InventoryStats;
