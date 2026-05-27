import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const products = [
  { id: "p1", title: "Test 50Basic-Vocab", price: 0, tag: "Free", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", description: "เรียนรู้คำศัพท์พื้นฐาน 50 คำแรก", stripeUrl: "https://buy.stripe.com/mock_link_p1" },
  { id: "p2", title: "คำศัพท์จีน HSK 1", price: 59, imageUrl: "https://images.unsplash.com/photo-1546410531-bd4cb01bd002?q=80&w=800&auto=format&fit=crop", description: "เจาะลึกคำศัพท์ HSK 1", stripeUrl: "https://buy.stripe.com/mock_link_p2" },
  { id: "p3", title: "รวมคำศัพท์จีน HSK 1-6", price: 599, originalPrice: 924, tag: "-35%", imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop", description: "รวมคำศัพท์ระดับ 1-6", stripeUrl: "https://buy.stripe.com/mock_link_p3" },
  { id: "p4", title: "ระบบทำ Auto Translate", price: 338, imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", description: "ระบบแปลภาษาอัตโนมัติ", stripeUrl: "https://buy.stripe.com/mock_link_p4" }
];

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
            
            {/* เปลี่ยนเป็นปุ่มลิงก์ภายนอกเปิดไป Stripe */}
            <a 
              href={product.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-900 text-white font-medium py-4 rounded-full hover:bg-gray-800 transition transform hover:scale-[1.02] text-center shadow-lg"
            >
              ซื้อสินค้าชิ้นนี้ทันที
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}