function AssetSearchFilters({
  nameFilter,
  setNameFilter,
  itemCodeFilter,
  setItemCodeFilter,
  serialFilter,
  setSerialFilter,
  descriptionFilter,
  setDescriptionFilter,
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Search Name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Search Item Code"
        value={itemCodeFilter}
        onChange={(e) => setItemCodeFilter(e.target.value)}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Search Serial Number"
        value={serialFilter}
        onChange={(e) => setSerialFilter(e.target.value)}
        className="border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Search Description"
        value={descriptionFilter}
        onChange={(e) => setDescriptionFilter(e.target.value)}
        className="border rounded-lg p-3"
      />
    </div>
  );
}

export default AssetSearchFilters;
