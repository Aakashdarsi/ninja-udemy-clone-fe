import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="fixed-top">
        <Navbar />
      </div>

      <main className="flex-grow-1 container-fluid">{children}</main>
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
