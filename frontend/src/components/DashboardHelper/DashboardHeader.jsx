import { FileSpreadsheet } from "lucide-react";

function DashboardHeader({
  prSearch,
  setPrSearch,
  nameSearch,
  setNameSearch,
  itemCodeSearch,
  setItemCodeSearch,
  descriptionSearch,
  setDescriptionSearch,
  handleExportInventory,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Inventory Dashboard
        </h1>

        <button
          onClick={handleExportInventory}
          className="
    flex items-center gap-2
    bg-green-600 hover:bg-green-700
    hover:scale-105
    text-white px-5 py-3
    rounded-xl shadow-md
    transition-all duration-200
  "
        >
          <FileSpreadsheet size={20} />
          Export Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="PR Number"
          value={prSearch}
          onChange={(e) => setPrSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Product Name"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Item Code"
          value={itemCodeSearch}
          onChange={(e) => setItemCodeSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Description"
          value={descriptionSearch}
          onChange={(e) => setDescriptionSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
      </div>
    </div>
  );
}

export default DashboardHeader;
