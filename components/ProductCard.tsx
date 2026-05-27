import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  imageUrl: string;
  category: string; // เพิ่มตัวแปรหมวดหมู่
}

export default function ProductCard({ id, title, price, originalPrice, tag, imageUrl, category }: ProductProps) {
  return (
    <Link href={`/product/${id}`} className="group block bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300">
      <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-[4/3] mb-4">
        {tag && (
          <span className="absolute top-3 left-3 z-10 bg-yellow-400 text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
            {tag}
          </span>
        )}
        <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      </div>
      
      <div className="flex flex-col gap-1 px-2 pb-2">
        {/* แสดงชื่อหมวดหมู่ตัวเล็กๆ เหนือชื่อสินค้า */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{category}</p>
        <h3 className="text-base font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {price === 0 ? "Free" : `฿${price}`}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">฿{originalPrice}</span>
            )}
          </div>
          
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}