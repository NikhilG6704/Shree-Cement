import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateAsset } from "../../services/api";

function EditModal({
  showEditModal,
  setShowEditModal,
  selectedItem,
  refreshProducts,
}) {
  const [form, setForm] = useState({
    prNo: "",
    poNo: "",
    item_name: "",
    item_code: "",
    quantity: 1,
    description: "",
    serial_number: "",
    is_ilms: true,
  });

  useEffect(() => {
    if (selectedItem) {
      setForm({
        prNo: selectedItem.prNo || "",
        poNo: selectedItem.poNo || "",
        item_name: selectedItem.name || "",
        item_code: selectedItem.itemCode || "",

        quantity: selectedItem.quantity || 1,

        description: selectedItem.description || "",
        serial_number: selectedItem.serialNumber || "",
        is_ilms: selectedItem.isILMS === "Yes",
      });
    }
  }, [selectedItem]);

  if (!showEditModal) return null;

  const handleSave = async () => {
    if (!/^\d{10}$/.test(form.prNo)) {
      toast.error("PR Number must be exactly 10 digits");
      return;
    }

    if (!form.item_name.trim()) {
      toast.error("Item Name is required");
      return;
    }

    if (!form.item_code.trim()) {
      toast.error("Item Code is required");
      return;
    }
    if (!form.quantity || Number(form.quantity) < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    let finalSerial = form.serial_number.trim();

    if (!finalSerial) {
      finalSerial = "N/A";
    }

    try {
      await updateAsset(selectedItem.id, {
        ...form,
        quantity: Number(form.quantity),
        serial_number: finalSerial,
      });

      toast.success("Asset updated successfully");

      await refreshProducts();

      setShowEditModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to update asset");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-y-auto
          p-8
        "
      >
        <h2 className="text-3xl font-bold mb-2">Edit Asset</h2>

        <p className="text-sm text-gray-500 mb-6">
          Fields marked with <span className="text-red-500 font-bold">*</span>{" "}
          are required.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {/* PR Number */}
          <div>
            <label className="block mb-2 font-medium">
              PR Number <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              maxLength={10}
              value={form.prNo}
              onChange={(e) =>
                setForm({
                  ...form,
                  prNo: e.target.value.replace(/\D/g, ""),
                })
              }
              placeholder="10 Digit PR Number"
              className="
                w-full
                border
                rounded-lg
                p-3
                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>

          {/* PO Number */}
          <div>
            <label className="block mb-2 font-medium">PO Number</label>

            <input
              value={form.poNo}
              onChange={(e) =>
                setForm({
                  ...form,
                  poNo: e.target.value,
                })
              }
              placeholder="PO Number"
              className="
                w-full
                border
                rounded-lg
                p-3
                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>

          {/* Item Name */}
          <div>
            <label className="block mb-2 font-medium">
              Item Name <span className="text-red-500">*</span>
            </label>

            <input
              value={form.item_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  item_name: e.target.value,
                })
              }
              placeholder="Item Name"
              className="
                w-full
                border
                rounded-lg
                p-3
                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>

          {/* Item Code */}
          <div>
            <label className="block mb-2 font-medium">
              Item Code <span className="text-red-500">*</span>
            </label>

            <input
              value={form.item_code}
              onChange={(e) =>
                setForm({
                  ...form,
                  item_code: e.target.value,
                })
              }
              placeholder="Item Code"
              className="
                w-full
                border
                rounded-lg
                p-3
                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>
          {/* Quantity */}
          <div>
            <label className="block mb-2 font-medium">
              Quantity <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              min="1"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: Number(e.target.value),
                })
              }
              className="
      w-full
      border
      rounded-lg
      p-3
      focus:ring-2
      focus:ring-blue-500
      focus:outline-none
    "
            />
          </div>

          {/* Serial Number */}
          <div>
            <label className="block mb-2 font-medium">Serial Number</label>

            <input
              value={form.serial_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  serial_number: e.target.value,
                })
              }
              placeholder="Enter Serial Number or leave blank for N/A"
              className="
      w-full
      border
      rounded-lg
      p-3
      focus:ring-2
      focus:ring-blue-500
      focus:outline-none
    "
            />

            <p className="text-xs text-gray-500 mt-1">
              Leave blank if the asset does not have a serial number.
            </p>
          </div>
          {/* ILMS */}
          <div>
            <label className="block mb-2 font-medium">ILMS Product</label>

            <select
              value={form.is_ilms ? "Yes" : "No"}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_ilms: e.target.value === "Yes",
                })
              }
              className="
                w-full
                border
                rounded-lg
                p-3
                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              rows="5"
              placeholder="Description"
              className="
                w-full
                border
                rounded-lg
                p-3
                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 border-t pt-6">
          <button
            onClick={() => setShowEditModal(false)}
            className="
              px-5
              py-2
              border
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              px-5
              py-2
              rounded-lg
              font-medium
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
