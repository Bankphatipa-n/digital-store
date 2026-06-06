"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  imageUrl: string;
  category: string;
  paymentLink: string;
  isPreOrder?: boolean; // 👈 เพิ่มมารองรับสถานะ Pre-order ในหน้าแรก
}

export default function ProductCard({ id, title, price, originalPrice, tag, imageUrl, category, paymentLink, isPreOrder }: ProductProps) {
  
  // ฟังก์ชันเลือกสีป้ายตามข้อความตัวหนังสือ
  const getTagStyle = (tagText: string) => {
    if (tagText.toUpperCase() === "NEW") return "bg-emerald-500 text-white"; // ป้าย New สีเขียวพรีเมียม
    if (tagText.toUpperCase() === "FREE") return "bg-yellow-400 text-gray-900"; // ป้าย Free สีเหลืองเด่น
    return "bg-red-500 text-white"; // ป้ายลดเปอร์เซ็นต์ % สีแดงกระตุ้นการซื้อ
  };

  return (
    <Link href={`/product/${id}`} className="group block bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300">
      
      <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-4/3 mb-4">
        {tag && (
          <span className={`absolute top-3 left-3 z-10 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm ${getTagStyle(tag)}`}>
            {tag}
          </span>
        )}
        <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      </div>
      
      <div className="flex flex-col gap-1 px-2 pb-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{category}</p>
        <h3 className="text-base font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {isPreOrder ? `฿${price}` : price === 0 ? "Free" : `฿${price}`}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">฿{originalPrice}</span>
            )}
          </div>
          
          <div 
            role="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (paymentLink.startsWith("mailto:")) {
                window.location.href = paymentLink;
              } else {
                window.open(paymentLink, '_blank');
              }
            }}
            /* 1. เช็คสถานะ: ถ้าเป็น Pre-order ให้ใช้ปุ่มทรงแคปซูลยาวพรีเมียม (px-3 py-1 text-xs) ถ้าไม่ใช่ให้ใช้ทรงกลม (w-8 h-8 rounded-full) */
            className={`flex items-center justify-center transition-colors shadow-sm cursor-pointer text-xs font-bold ${
              isPreOrder 
                ? "px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white" 
                : "w-8 h-8 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-900 hover:text-white"
            }`}
            title={isPreOrder ? "Pre-order ผ่าน Email" : "ซื้อทันที"}
          >
            {/* 2. เช็คสถานะข้อความภายใน: ถ้าเป็น Pre-order ให้ขึ้นคำตัวหนังสือ ถ้าไม่ใช่ให้โชว์ไอคอนลูกศร */}
            {isPreOrder ? (
              "Pre-order"
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}