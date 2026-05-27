"use client";

import ProductCard from "../components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ข้อมูลสินค้า (เพิ่ม stripeUrl สำหรับกดซื้อทันที)
const products = [
  { 
    id: "p1", 
    title: "Test 50Basic-Vocab", 
    price: 0, 
    tag: "Free", 
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", 
    category: "Vocabulary PDF",
    stripeUrl: "https://buy.stripe.com/mock_link_p1" // เอาลิงก์จาก Stripe มาใส่ตรงนี้
  },
  { 
    id: "p2", 
    title: "คำศัพท์จีน HSK 1", 
    price: 59, 
    imageUrl: "https://images.unsplash.com/photo-1546410531-bd4cb01bd002?q=80&w=800&auto=format&fit=crop", 
    category: "Vocabulary PDF",
    stripeUrl: "https://buy.stripe.com/mock_link_p2"
  },
  { 
    id: "p3", 
    title: "รวมคำศัพท์จีน HSK 1-6", 
    price: 599, 
    originalPrice: 924, 
    tag: "-35%", 
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop", 
    category: "Anki Templates",
    stripeUrl: "https://buy.stripe.com/mock_link_p3"
  },
  { 
    id: "p4", 
    title: "ระบบทำ Auto Translate", 
    price: 338, 
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", 
    category: "Dev Tools",
    stripeUrl: "https://buy.stripe.com/mock_link_p4"
  }
];

const bestSellers = products.slice(0, 4);

export default function Storefront() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const categories = ["All Products", "Vocabulary PDF", "Anki Templates", "Dev Tools"];
  
  const filteredProducts = activeCategory === "All Products" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* โลโก้แบรนด์ */}
          <Link href="/bear.jpg" className="flex items-center gap-3 group">
            {/* กล่องใส่โลโก้ (เดี๋ยวเราจะเอารูปน้องหมีมาใส่ตรงนี้) */}
           {/* กล่องใส่โลโก้ */}
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
              <Image src="/bear.jpg" alt="หลักสูตรเร่งจำ Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              หลักสูตรเร่งจำ <span className="text-pink-600 font-black">Shop</span>
            </span>
          </Link>

          {/* เมนูตรงกลาง */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link href="/" className="text-gray-900 font-bold">Home</Link>
            <Link href="#catalog" className="hover:text-gray-900 transition">Shop</Link>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">About</a>
          </nav>

          {/* ปุ่ม Let's Talk มุมขวาบน */}
          <div className="flex items-center">
            <a 
              href="https://bankphatipan.com/" // ใส่ลิงก์เว็บอื่น หรือลิงก์ Inbox Facebook ของคุณตรงนี้
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-blue-600 transition-colors shadow-md flex items-center gap-2"
            >
              Let's Talk
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>

        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden bg-gray-900 flex items-center group">
          <Image src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop" alt="Promotion Banner" fill className="object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-700" />
          <div className="relative z-10 px-8 md:px-16 w-full max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider mb-4 border border-white/30">HOT DEALS 🔥</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">Summer Sale <br className="hidden md:block" /> Up To 70% Off</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">ยกระดับทักษะของคุณด้วยคลังคำศัพท์และเครื่องมือสำหรับนักพัฒนา ในราคาที่ดีที่สุดของปี</p>
            <Link href="#catalog" className="inline-block bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition transform hover:scale-105 shadow-xl">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
            <p className="text-gray-500 text-sm mt-1">สินค้าขายดีที่ทุกคนต้องมี</p>
          </div>
          <Link href="#catalog" className="hidden sm:block text-sm font-bold text-blue-600 hover:text-blue-800 transition">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={`best-${p.id}`} {...p} />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-200" />
      </div>

      {/* Catalog & Filter */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 flex flex-col md:flex-row gap-12 scroll-mt-24">
        
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-bold text-xl text-gray-900 mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => {
                const count = category === "All Products" 
                  ? products.length 
                  : products.filter(p => p.category === category).length;
                
                const isActive = activeCategory === category;

                return (
                  <li key={category}>
                    <button 
                      onClick={() => setActiveCategory(category)}
                      className={`w-full flex items-center justify-between text-sm transition-colors py-2 ${
                        isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-gray-900 font-medium"
                      }`}
                    >
                      <span>{category}</span>
                      <span className={`py-0.5 px-2.5 rounded-full text-xs ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">{activeCategory}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}