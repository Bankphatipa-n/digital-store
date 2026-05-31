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
    paymentLink: "https://buy.stripe.com/bJe14pfDMaeS7tjdoqaEE00" // 👈 เปลี่ยนจาก stripeUrl เป็น paymentLink
  },
  { 
    id: "p2", 
    title: "คำศัพท์จีน HSK 1", 
    price: 59, 
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", 
    category: "Vocabulary PDF",
    paymentLink: "https://buy.stripe.com/bJe14pfDMaeS7tjdoqaEE00" // 👈 แก้ตรงนี้ด้วย
  },
  { 
    id: "p3", 
    title: "รวมคำศัพท์จีน HSK 1-6", 
    price: 599, 
    originalPrice: 924, 
    tag: "-35%", 
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop", 
    category: "Anki Templates",
    paymentLink: "https://buy.stripe.com/bJe14pfDMaeS7tjdoqaEE00" // 👈 แก้ตรงนี้ด้วย
  },
  { 
    id: "p4", 
    title: "ระบบทำ Auto Translate", 
    price: 338, 
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", 
    category: "Dev Tools",
    paymentLink: "https://buy.stripe.com/bJe14pfDMaeS7tjdoqaEE00" // 👈 แก้ตรงนี้ด้วย
  }
];

const bestSellers = products.slice(0, 4);
// ... (ส่วนต้นของไฟล์ยังเหมือนเดิม)

export default function Storefront() {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 1. เพิ่ม E-book เข้ามาในหมวดหมู่ตรงนี้
  const categories = ["All Products", "Vocabulary PDF", "Anki Templates", "Dev Tools", "E-book"];
  
  const filteredProducts = activeCategory === "All Products" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* โลโก้แบรนด์ */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
              <Image src="/icon.jpg" alt="หลักสูตรเร่งจำ Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              หลักสูตรเร่งจำ <span className="text-blue-600 font-black">Shop</span>
            </span>
          </Link>

          {/* 1. เมนู Desktop (ซ่อนในมือถือด้วย md:flex) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors">Home</Link>
            <a href="#catalog" className="text-gray-500 hover:text-blue-600 transition-colors">Shop</a>
            <a 
              href="https://bankphatipan.com/insurance" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              บริการประกัน
            </a>
          </nav>

          {/* 2. ปุ่ม Let's Talk แบบ Desktop (ซ่อนในมือถือด้วย md:flex) */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://bankphatipan.com/" 
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

          {/* 3. ปุ่ม Hamburger เมนู (โชว์เฉพาะมือถือด้วย md:hidden) */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                // ไอคอนกากบาท (เมื่อเมนูเปิด)
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // ไอคอน 3 ขีด (เมื่อเมนูปิด)
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 4. เมนู Dropdown สำหรับมือถือ (แสดงเมื่อ isMobileMenuOpen = true) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg top-16 left-0 z-40">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <Link 
                href="/" 
                className="block px-4 py-3 text-base font-bold text-gray-900 bg-gray-50 rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#catalog" 
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </a>
              <a 
                href="https://bankphatipan.com/insurance" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                บริการประกัน
              </a>
              <div className="pt-4">
                <a 
                  href="https://bankphatipan.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 text-white text-base font-bold px-6 py-3.5 rounded-xl hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)} // กดแล้วปิดเมนูให้ด้วย
                >
                  Let's Talk
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden bg-gray-900 flex items-center group">
          
          {/* แก้ไขตรงบรรทัดนี้: เปลี่ยน src เป็นรูปในโฟลเดอร์ public ของเรา */}
          <Image 
            src="/bannner.png" 
            alt="Promotion Banner" 
            fill 
            className="object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-700" 
          />
          
          <div className="relative z-10 px-8 md:px-16 w-full max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wider mb-4 border border-white/30">HOT DEALS 🔥</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">Summer Sale <br className="hidden md:block" /> Up To 70% Off</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-xl">ยกระดับทักษะของคุณด้วยคลังคำศัพท์และเครื่องมือสำหรับนักพัฒนา ในราคาที่ดีที่สุดของปี</p>
            
            <a href="#catalog" className="inline-block bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition transform hover:scale-105 shadow-xl">
              Shop Now
            </a>
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
          
          {/* 4. แก้ไขปุ่ม View All ให้เลื่อนลงไปที่ Shop */}
          <a href="#catalog" className="hidden sm:block text-sm font-bold text-blue-600 hover:text-blue-800 transition">
            View All →
          </a>
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