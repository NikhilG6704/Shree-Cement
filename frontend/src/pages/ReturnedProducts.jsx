import { useEffect, useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { getReturnedAssets } from "../services/api";
import { exportToExcel } from "../utils/exportToExcel";

function ReturnedProducts() {
  const [returnedAssets, setReturnedAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReturnedAssets();
  }, []);

  const loadReturnedAssets = async () => {
    try {
      const data = await getReturnedAssets();
      setReturnedAssets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReturned = () => {
    const exportData = returnedAssets.map((asset) => ({
      Asset: asset.item_name,
      Item_Code: asset.item_code,
      Serial_Number: asset.serial_number,
      Issued_To: asset.issued_to,
      Department: asset.department,
      Issue_Date: asset.issue_date,
      Return_Date: asset.actual_return_date,
      Remark: asset.issue_remark || "-",
    }));

    exportToExcel(exportData, "Returned_Assets");
  };

  if (loading) {
    return (
      <div className="text-center text-xl mt-10">
        Loading Returned Assets...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Returned Assets History</h2>

            <p className="text-gray-500 mt-1">
              Total Returned Assets: {returnedAssets.length}
            </p>
          </div>

          <button
            onClick={handleExportReturned}
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

        {returnedAssets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No returned assets found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-4 text-left">Asset</th>
                  <th className="p-4 text-left">Item Code</th>
                  <th className="p-4 text-left">Serial Number</th>
                  <th className="p-4 text-left">Issued To</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Issue Date</th>
                  <th className="p-4 text-left">Return Date</th>
                  <th className="p-4 text-left">Remark</th>
                </tr>
              </thead>

              <tbody>
                {returnedAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{asset.item_name}</td>

                    <td className="p-4">{asset.item_code}</td>

                    <td className="p-4 font-mono">{asset.serial_number}</td>

                    <td className="p-4">{asset.issued_to}</td>

                    <td className="p-4">{asset.department}</td>

                    <td className="p-4">{asset.issue_date}</td>

                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {asset.actual_return_date}
                      </span>
                    </td>

                    <td className="p-4">{asset.issue_remark || "-"}</td>
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

export default ReturnedProducts;
