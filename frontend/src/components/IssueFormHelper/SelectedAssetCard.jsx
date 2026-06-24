function SelectedAssetCard({ selectedAsset }) {
  if (!selectedAsset) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      {selectedAsset && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3">Selected Asset</h3>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <strong>Name:</strong> {selectedAsset.item_name}
            </div>

            <div>
              <strong>Item Code:</strong> {selectedAsset.item_code}
            </div>

            <div>
              <strong>Serial Number:</strong> {selectedAsset.serial_number}
            </div>

            <div>
              <strong>ILMS:</strong> {selectedAsset.is_ilms ? "Yes" : "No"}
            </div>

            <div className="md:col-span-2">
              <strong>Description:</strong> {selectedAsset.description || "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedAssetCard;
