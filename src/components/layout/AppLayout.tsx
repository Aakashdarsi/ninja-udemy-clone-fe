import React from "react";
import NavbarC from "./NavbarC";
import Footer from "./Footer";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="sticky-top">
        <NavbarC />
      </div>

      <main className="flex-grow-1 container-fluid">{children}</main>
      <div className="sticky-bottom mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
