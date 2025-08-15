import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcumb5 from "@/components/shop/Breadcumb5";
import Checkout from "@/components/shop/Checkout";
import Features from "@/components/shop/Features";

export const metadata = {
  title: "Checkout || Heritage Farms - Ontario's Premier Heritage Crop Farm",
  description: "Complete your purchase of fresh heritage greens from Heritage Farms. Secure checkout with multiple payment options.",
};

export default function CheckoutPage() {
  return (
    <>
      <div className="grow shrink-0">
        <Header />
        <Breadcumb5 />
        <Checkout />
        <Features />
      </div>
      <Footer />
    </>
  );
}
