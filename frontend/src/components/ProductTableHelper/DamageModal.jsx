import { useState } from "react";
import toast from "react-hot-toast";
import { markAssetDamaged } from "../../services/api";
import { isAdmin } from "../../utils/auth";

function DamageModal({
  showDamageModal,
  setShowDamageModal,
  selectedItem,
  refreshProducts,
}) {
  const [damagedBy, setDamagedBy] = useState("");
  const [department, setDepartment] = useState("");
  const [damageRemark, setDamageRemark] = useState("");

  if (!showDamageModal) return null;

  const handleDamageSubmit = async () => {
    if (!damagedBy.trim()) {
      toast.error("Please enter Damaged By");
      return;
    }

    if (!isAdmin()) {
      toast.error("Access denied");
      return;
    }

    if (!department.trim()) {
      toast.error("Please enter Department");
      return;
    }

    try {
      await markAssetDamaged({
        assetId: selectedItem.id,
        damagedBy,
        department,
        damageRemark,
      });

      toast.success("Asset marked as damaged");

      if (refreshProducts) {
        await refreshProducts();
      }

      setShowDamageModal(false);

      setDamagedBy("");
      setDepartment("");
      setDamageRemark("");
    } catch (error) {
      toast.error(error.message || "Failed to mark asset as damaged");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Mark Asset Damaged
        </h2>

        <div className="mb-6 p-3 bg-gray-50 rounded-lg border">
          <p className="font-semibold text-lg">{selectedItem?.name}</p>

          <p className="text-sm text-gray-600">
            {selectedItem?.itemCode} • {selectedItem?.serialNumber}
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Damaged By <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={damagedBy}
            onChange={(e) => setDamagedBy(e.target.value)}
            placeholder="Enter employee name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Department <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Damage Remark</label>

          <textarea
            value={damageRemark}
            onChange={(e) => setDamageRemark(e.target.value)}
            rows="4"
            placeholder="Describe the damage"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setShowDamageModal(false);
              setDamagedBy("");
              setDepartment("");
              setDamageRemark("");
            }}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDamageSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Mark Damaged
          </button>
        </div>
      </div>
    </div>
  );
}

export default DamageModal;
