import { useEffect, useState } from "react";
import { getAssets } from "../services/api";
import ProductTable from "../components/ProductTable";
import { exportToExcel } from "../utils/exportToExcel";
import DashboardHeader from "../components/DashboardHelper/DashboardHeader";
import InventoryStats from "../components/DashboardHelper/InventoryStats";
import ProductFilterCard from "../components/DashboardHelper/ProductFilterCard";
function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [prSearch, setPrSearch] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [itemCodeSearch, setItemCodeSearch] = useState("");
  const [descriptionSearch, setDescriptionSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    loadAssets();
  }, []);
  const handleExportInventory = () => {
    const exportData = products.flatMap((product) =>
      product.items.map((item) => ({
        PR_Number: product.prNo,
        PO_Number: product.poNo,
        Name: item.name,
        Item_Code: item.itemCode,
        Description: item.description,
        Serial_Number: item.serialNumber,
        Date_Added: item.dateAdded,
        ILMS: item.isILMS,
        Status: item.status,
      })),
    );

    exportToExcel(exportData, "Inventory_Assets");
  };
  const loadAssets = async () => {
    try {
      const assets = await getAssets();

      const grouped = {};

      assets.forEach((asset) => {
        if (!grouped[asset.pr_no]) {
          grouped[asset.pr_no] = {
            prNo: asset.pr_no,
            poNo: asset.po_no,
            items: [],
          };
        }

        grouped[asset.pr_no].items.push({
          id: asset.id,
          name: asset.item_name,
          itemCode: asset.item_code,
          description: asset.description,
          serialNumber: asset.serial_number,
          dateAdded: asset.date_added,
          isILMS: asset.is_ilms ? "Yes" : "No",
          status: asset.status,
        });
      });

      setProducts(Object.values(grouped));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const productNames = [
    ...new Set(
      products.flatMap((product) => product.items.map((item) => item.name)),
    ),
  ];

  const filteredProducts = products
    .map((product) => ({
      ...product,
      items: product.items.filter((item) => {
        const matchesPR =
          prSearch === "" ||
          product.prNo
            .toString()
            .toLowerCase()
            .includes(prSearch.toLowerCase());

        const matchesName =
          nameSearch === "" ||
          item.name.toLowerCase().includes(nameSearch.toLowerCase());

        const matchesItemCode =
          itemCodeSearch === "" ||
          item.itemCode.toLowerCase().includes(itemCodeSearch.toLowerCase());

        const matchesDescription =
          descriptionSearch === "" ||
          item.description
            ?.toLowerCase()
            .includes(descriptionSearch.toLowerCase());

        const matchesProductType =
          selectedProduct === "" || item.name === selectedProduct;

        return (
          matchesPR &&
          matchesName &&
          matchesItemCode &&
          matchesDescription &&
          matchesProductType
        );
      }),
    }))
    .filter((product) => product.items.length > 0);

  const totalProducts = products.reduce(
    (count, product) => count + product.items.length,
    0,
  );

  const totalIssuedProducts = products.reduce(
    (count, product) =>
      count + product.items.filter((item) => item.status === "Issued").length,
    0,
  );

  const totalDamagedProducts = products.reduce(
    (count, product) =>
      count + product.items.filter((item) => item.status === "Damaged").length,
    0,
  );

  const selectedProductCount = filteredProducts.reduce(
    (count, product) => count + product.items.length,
    0,
  );

  if (loading) {
    return (
      <div className="text-center text-xl mt-10">Loading Dashboard...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <DashboardHeader
        prSearch={prSearch}
        setPrSearch={setPrSearch}
        nameSearch={nameSearch}
        setNameSearch={setNameSearch}
        itemCodeSearch={itemCodeSearch}
        setItemCodeSearch={setItemCodeSearch}
        descriptionSearch={descriptionSearch}
        setDescriptionSearch={setDescriptionSearch}
        handleExportInventory={handleExportInventory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <InventoryStats
          totalProducts={totalProducts}
          totalIssuedProducts={totalIssuedProducts}
          totalDamagedProducts={totalDamagedProducts}
        />

        <ProductFilterCard
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          productNames={productNames}
          selectedProductCount={selectedProductCount}
        />
      </div>

      <ProductTable
        products={filteredProducts}
        title="Inventory Assets"
        refreshProducts={loadAssets}
      />
    </div>
  );
}

export default Dashboard;
