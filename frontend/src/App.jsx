import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import IssuedProducts from "./pages/IssuedProducts";
import DamagedProducts from "./pages/DamagedProducts";
import ReturnedProducts from "./pages/ReturnedProducts";

function App() {
  const [issuedProducts, setIssuedProducts] = useState([]);
  const [returnedProducts, setReturnedProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const issueProduct = (issue) => {
    setIssuedProducts((prev) => [...prev, issue]);
  };

  const returnProduct = (item) => {
    setReturnedProducts((prev) => [...prev, item]);

    setIssuedProducts((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <HashRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#16a34a",
              color: "#fff",
              borderRadius: "10px",
            },
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
              borderRadius: "10px",
            },
          },
        }}
      />

      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="min-h-screen bg-gray-100">
          <Navbar />

          <main className="ml-64 p-8">
            <Routes>
              {/* Redirect login to dashboard if already logged in */}
              <Route path="/login" element={<Navigate to="/" replace />} />

              <Route path="/" element={<Dashboard />} />

              <Route
                path="/products"
                element={
                  user.role === "admin" ? (
                    <Products />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              <Route
                path="/issued"
                element={
                  <IssuedProducts
                    issuedProducts={issuedProducts}
                    issueProduct={issueProduct}
                    returnProduct={returnProduct}
                  />
                }
              />

              <Route path="/returned" element={<ReturnedProducts />} />

              <Route path="/damaged" element={<DamagedProducts />} />

              {/* Any unknown route goes to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      )}
    </HashRouter>
  );
}

export default App;
