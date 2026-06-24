import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FileSpreadsheet } from "lucide-react";
import { getDamagedAssets } from "../services/api";
import { exportToExcel } from "../utils/exportToExcel";

function DamagedProducts() {
  const [damagedAssets, setDamagedAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDamagedAssets();
  }, []);

  const loadDamagedAssets = async () => {
    try {
      const data = await getDamagedAssets();
      setDamagedAssets(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load damaged assets");
    } finally {
      setLoading(false);
    }
  };

  const handleExportDamaged = () => {
    const exportData = damagedAssets.map((item) => ({
      Asset: item.item_name,
      Item_Code: item.item_code,
      Serial_Number: item.serial_number,
      Damaged_By: item.damaged_by,
      Department: item.department,
      Damage_Date: item.damaged_date,
      Remark: item.damage_remark,
    }));

    exportToExcel(exportData, "Damaged_Assets");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-xl text-gray-500">Loading damaged assets...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Damaged Assets History
            </h2>

            <p className="text-gray-500 mt-1">
              Total Damaged Assets: {damagedAssets.length}
            </p>
          </div>

          <button
            onClick={handleExportDamaged}
            className="
              flex items-center gap-2
              bg-green-600 hover:bg-green-700
              hover:scale-105
              text-white
              px-5 py-2.5
              rounded-xl
              shadow-md
              transition-all duration-200
            "
          >
            <FileSpreadsheet size={20} />
            Export Excel
          </button>
        </div>

        {damagedAssets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No damaged assets found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-4 text-left">Asset</th>
                  <th className="p-4 text-left">Item Code</th>
                  <th className="p-4 text-left">Serial Number</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Damaged By</th>
                  <th className="p-4 text-left">Damaged Date</th>
                  <th className="p-4 text-left">Remark</th>
                </tr>
              </thead>

              <tbody>
                {damagedAssets.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{item.item_name}</td>

                    <td className="p-4">{item.item_code}</td>

                    <td className="p-4 font-mono">{item.serial_number}</td>

                    <td className="p-4">{item.department}</td>

                    <td className="p-4">{item.damaged_by}</td>

                    <td className="p-4">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.damaged_date}
                      </span>
                    </td>

                    <td
                      className="p-4 max-w-[300px] truncate"
                      title={item.damage_remark}
                    >
                      {item.damage_remark || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DamagedProducts;
