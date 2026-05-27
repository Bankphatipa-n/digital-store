"use client"; // จำเป็นต้องใส่เพื่อให้หน้าเว็บตอบสนองการคลิกได้

import ProductCard from "../components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // นำเข้า useState

// ข้อมูลจำลอง (เพิ่ม category เข้าไปในสินค้าทุกชิ้น)
const products = [
  { id: "p1", title: "Test 50Basic-Vocab", price: 0, tag: "Free", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", category: "Vocabulary PDF" },
  { id: "p2", title: "คำศัพท์จีน HSK 1", price: 59, imageUrl: "https://images.unsplash.com/photo-1546410531-bd4cb01bd002?q=80&w=800&auto=format&fit=crop", category: "Vocabulary PDF" },
  { id: "p3", title: "รวมคำศัพท์จีน HSK 1-6", price: 599, originalPrice: 924, tag: "-35%", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop", category: "Anki Templates" },
  { id: "p4", title: "ระบบทำ Auto Translate", price: 338, imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", category: "Dev Tools" }
];

const bestSellers = products.slice(0, 4); // ตอนนี้ Best Seller ดึงจากสินค้าทั้งหมดมาโชว์ 4 อันดับแรก

export default function Storefront() {
  // สร้าง State สำหรับจดจำว่าตอนนี้เลือกหมวดหมู่ไหนอยู่ (ค่าเริ่มต้นคือ All Products)
  const [activeCategory, setActiveCategory] = useState("All Products");

  // รายชื่อหมวดหมู่ทางซ้ายมือ
  const categories = ["All Products", "Vocabulary PDF", "Anki Templates", "Dev Tools"];

  // กรองสินค้า: ถ้าเลือก All ให้โชว์หมด ถ้าเลือกหมวดอื่น ให้โชว์เฉพาะที่ตรงกัน
  const filteredProducts = activeCategory === "All Products" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <span className="text-white font-bold text-lg leading-none">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Bank<span className="text-gray-400">Store</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link href="#" className="hover:text-gray-900 transition">Home</Link>
            <Link href="#catalog" className="hover:text-gray-900 transition">Shop</Link>
            {/* แก้ไขบรรทัดนี้ */}
           <a href="ใส่ลิงก์ของคุณที่นี่" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
           About
           </a>
          </nav>
          <div className="flex items-center">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">0</span>
            </button>
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
            {/* ทำให้ปุ่ม Shop Now เลื่อนไปที่ Catalog ด้วย */}
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
          {/* ลิงก์ View All เลื่อนลงไปที่ #catalog */}
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
        
        {/* Sidebar กรองหมวดหมู่ */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="font-bold text-xl text-gray-900 mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => {
                // คำนวณจำนวนสินค้าในแต่ละหมวดหมู่
                const count = category === "All Products" 
                  ? products.length 
                  : products.filter(p => p.category === category).length;
                
                const isActive = activeCategory === category;

                return (
                  <li key={category}>
                    <button 
                      onClick={() => setActiveCategory(category)} // เปลี่ยนค่า State เมื่อถูกคลิก
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

        {/* ตะแกรงแสดงสินค้าที่ถูกกรอง */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">{activeCategory}</h3>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500 hidden sm:inline">Showing {filteredProducts.length} results</span>
            </div>
          </div>

          {/* โชว์สินค้าที่ผ่านการกรอง (filteredProducts) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-lg">ไม่มีสินค้าในหมวดหมู่นี้</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}