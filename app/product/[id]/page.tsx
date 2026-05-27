import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const products = [
  { id: "p1", title: "Test 50Basic-Vocab", price: 0, tag: "Free", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", description: "เรียนรู้คำศัพท์พื้นฐาน 50 คำแรก" },
  { id: "p2", title: "คำศัพท์จีน HSK 1", price: 59, imageUrl: "https://images.unsplash.com/photo-1546410531-bd4cb01bd002?q=80&w=800&auto=format&fit=crop", description: "เจาะลึกคำศัพท์ HSK 1" }
];

// แก้ไขตรงนี้: เพิ่ม async และเปลี่ยน params เป็น Promise
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // ต้องใส่ await เพื่อแกะกล่อง params ก่อนใช้งานตามกฎใหม่ของ Next.js 15
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-gray-500 hover:text-gray-900 mb-8 inline-block">← กลับไปหน้าแรก</Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50">
            <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <span className="text-3xl font-bold text-gray-900 mb-6">{product.price === 0 ? "ฟรี" : `฿${product.price}`}</span>
            <p className="text-gray-600 mb-8">{product.description}</p>
            <button className="w-full bg-gray-900 text-white font-medium py-4 rounded-full hover:bg-gray-800 transition transform hover:scale-[1.02]">
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}