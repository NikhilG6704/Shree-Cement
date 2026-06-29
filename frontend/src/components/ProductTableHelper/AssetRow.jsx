function AssetRow({
  item,
  index,
  isAdminUser,
  activeMenu,
  setActiveMenu,
  onEdit,
  onDamage,
  onDelete,
}) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-4 font-medium">{item.prNo}</td>

      <td className="p-4">{item.poNo || "-"}</td>

      <td className="p-4">{item.name}</td>

      <td className="p-4">{item.itemCode}</td>

      <td className="p-4 max-w-[250px] truncate" title={item.description}>
        {item.description || "-"}
      </td>

      <td className="p-4 font-mono">{item.serialNumber || "N/A"}</td>

      <td className="p-4 whitespace-nowrap">{item.dateAdded}</td>

      <td className="p-4">
        {item.isILMS === "Yes" ? (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Yes
          </span>
        ) : (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            No
          </span>
        )}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "Available"
              ? "bg-green-100 text-green-700"
              : item.status === "Issued"
                ? "bg-yellow-100 text-yellow-700"
                : item.status === "Damaged"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
          }`}
        >
          {item.status}
        </span>
      </td>

      <td className="p-4 relative">
        {isAdminUser ? (
          <div className="relative">
            <button
              onClick={() =>
                setActiveMenu(activeMenu === item.id ? null : item.id)
              }
              className="
                bg-slate-800
                hover:bg-slate-900
                text-white
                px-3
                py-2
                rounded-lg
                text-sm
                shadow-md
                transition-all
              "
            >
              Actions ▼
            </button>

            {activeMenu === item.id && (
              <div
                className="
                  absolute
                  right-0
                  top-12
                  w-48
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  shadow-2xl
                  overflow-hidden
                  z-[9999]
                "
              >
                <button
                  onClick={() => {
                    setActiveMenu(null);
                    onEdit();
                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    text-blue-600
                    hover:bg-blue-50
                    transition-all
                  "
                >
                  Edit Asset
                </button>

                {item.status === "Available" && (
                  <button
                    onClick={() => {
                      setActiveMenu(null);
                      onDamage();
                    }}
                    className="
                      w-full
                      text-left
                      px-4
                      py-3
                      text-red-600
                      hover:bg-red-50
                      transition-all
                    "
                  >
                    Mark Damaged
                  </button>
                )}

                <button
                  onClick={() => {
                    setActiveMenu(null);
                    onDelete();
                  }}
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    text-gray-700
                    hover:bg-gray-100
                    transition-all
                  "
                >
                  Delete Asset
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="text-gray-400">View Only</span>
        )}
      </td>
    </tr>
  );
}

export default AssetRow;
