import toast from "react-hot-toast";
import { deleteAsset } from "../../services/api";
import { isAdmin } from "../../utils/auth";

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  assetToDelete,
  setAssetToDelete,
  refreshProducts,
}) {
  if (!showDeleteModal) return null;

  const handleDeleteAsset = async () => {
    try {
      if (!isAdmin()) {
        toast.error("Access denied");
        return;
      }

      await deleteAsset(assetToDelete.id);

      toast.success("Asset deleted successfully");

      if (refreshProducts) {
        await refreshProducts();
      }

      setShowDeleteModal(false);
      setAssetToDelete(null);
    } catch (error) {
      toast.error(error.message || "Failed to delete asset");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Asset</h2>

        <p className="mb-4 text-gray-700">
          Are you sure you want to delete this asset?
        </p>

        <div className="bg-gray-50 p-4 rounded-lg border mb-4">
          <p className="font-semibold">{assetToDelete?.name}</p>

          <p className="text-sm text-gray-600">{assetToDelete?.itemCode}</p>

          <p className="text-sm text-gray-600">{assetToDelete?.serialNumber}</p>
        </div>

        <p className="text-red-500 text-sm mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setShowDeleteModal(false);
              setAssetToDelete(null);
            }}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDeleteAsset}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Delete Asset
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
