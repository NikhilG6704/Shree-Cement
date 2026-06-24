import toast from "react-hot-toast";

export const validateProductForm = (prNo, itemCount, items) => {
  if (Number(itemCount) > 20) {
    toast.error("You can add a maximum of 20 products");
    return false;
  }

  if (!/^\d{10}$/.test(prNo)) {
    toast.error("PR Number must be exactly 10 digits");
    return false;
  }

  if (!itemCount || Number(itemCount) < 1) {
    toast.error("Please enter number of items");
    return false;
  }

  for (const item of items) {
    if (!item.name || !item.itemCode || !item.serialNumber || !item.dateAdded) {
      toast.error("Please fill all required item fields");
      return false;
    }
  }

  return true;
};
