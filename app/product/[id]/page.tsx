import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ข้อมูลสินค้า (อัปเดตลิงก์ Stripe ของจริงให้ตรงกับหน้าหลักเรียบร้อยแล้ว)
const products = [
  { 
    id: "p1", 
    title: "Test 50Basic-Vocab", 
    price: 0, 
    tag: "Free", 
    imageUrl: "/b1.png", 
    category: "Vocabulary",
    description: "Anki ดิจิทัลแฟลชการ์ด 50 คำพื้นฐาน และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki ", 
    paymentLink: "https://drive.google.com/drive/folders/1_XqLH3zpQkg0ssqVe-2CTRbjtsWI_-n-?usp=sharing" // 👈 เปลี่ยนจาก stripeUrl เป็น paymentLink
  },
  { 
    id: "p2", 
    title: "คำศัพท์จีน HSK 3.0 Lv.1", 
    price: 59, 
    imageUrl: "/b2.png", 
    category: "Vocabulary",
    description: "Anki ดิจิทัลแฟลชการ์ด HSK 3.0 Lv.1 และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki", 
    paymentLink: "https://buy.stripe.com/bJe14pfDMaeS7tjdoqaEE00" // 👈 แก้ตรงนี้ด้วย
  },
  { 
    id: "p3", 
    title: "รวมคำศัพท์จีน HSK 3.0 Lv.1-6", 
    price: 599, 
    originalPrice: 924, 
    tag: "-35%", 
    imageUrl: "/A1.png", 
    category: "Vocabulary",
    description: "Anki ดิจิทัลแฟลชการ์ด HSK 3.0 Lv.1-6 และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki", 
    paymentLink: "https://buy.stripe.com/3cI28tfDM9aO7tjckmaEE06" // 👈 แก้ตรงนี้ด้วย
  },
  { 
    id: "p4", 
    title: "คำศัพท์จีน HSK 3.0 Lv.2", 
    price: 79, 
    imageUrl: "/b3.png", 
    category: "Vocabulary",
    description: "Anki ดิจิทัลแฟลชการ์ด HSK 3.0 Lv.2 และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki", 
    paymentLink: "https://buy.stripe.com/7sY14pbnw9aOaFvesuaEE01" // 👈 แก้ตรงนี้ด้วย
  },
  { 
    id: "p5", 
    title: "คำศัพท์จีน HSK 3.0 Lv.3", 
    price: 99, 
    imageUrl: "/b4.png", // ลิงก์รูปภาพ หรือใส่เป็น "/ชื่อรูป.png" ถ้าเอารูปไปวางในโฟลเดอร์ public
    category: "Vocabulary", // 💡 ใส่ชื่อหมวดหมู่ให้ตรงกับปุ่มกรอกด้านล่าง
    description: "Anki ดิจิทัลแฟลชการ์ด HSK 3.0 Lv.3 และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki",  
    paymentLink: "https://buy.stripe.com/28EfZjbnw3Qu00R2JMaEE02"
  }
    ,
  { 
    id: "p6", // 💡 ตั้ง ID ห้ามซ้ำกับตัวเดิม เช่น p5, p6, p7 ไปเรื่อยๆ
    title: "คำศัพท์จีน HSK 3.0 Lv.4", 
    price: 129, 
    imageUrl: "/b5.png", // ลิงก์รูปภาพ หรือใส่เป็น "/ชื่อรูป.png" ถ้าเอารูปไปวางในโฟลเดอร์ public
    category: "Vocabulary", // 💡 ใส่ชื่อหมวดหมู่ให้ตรงกับปุ่มกรอกด้านล่าง
    description: "Anki ดิจิทัลแฟลชการ์ด HSK 3.0 Lv.4 และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki",  
    paymentLink: "https://buy.stripe.com/8x2cN73V4aeS8xn702aEE03"
  }
  ,
  { 
    id: "p7", // 💡 ตั้ง ID ห้ามซ้ำกับตัวเดิม เช่น p5, p6, p7 ไปเรื่อยๆ
    title: "คำศัพท์จีน HSK 3.0 Lv.5", 
    price: 229, 
    imageUrl: "/b6.png", // ลิงก์รูปภาพ หรือใส่เป็น "/ชื่อรูป.png" ถ้าเอารูปไปวางในโฟลเดอร์ public
    category: "Vocabulary", // 💡 ใส่ชื่อหมวดหมู่ให้ตรงกับปุ่มกรอกด้านล่าง
    description: "Anki ดิจิทัลแฟลชการ์ด HSK 3.0 Lv.5 และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki", 
    paymentLink: "https://buy.stripe.com/aFa14p0IS5YCcND846aEE04"
  }
  ,
  { 
    id: "p8", // 💡 ตั้ง ID ห้ามซ้ำกับตัวเดิม เช่น p5, p6, p7 ไปเรื่อยๆ
    title: "คำศัพท์จีน HSK 3.0 Lv.6", 
    price: 329, 
    imageUrl: "/b7.png", // ลิงก์รูปภาพ หรือใส่เป็น "/ชื่อรูป.png" ถ้าเอารูปไปวางในโฟลเดอร์ public
    category: "Vocabulary", // 💡 ใส่ชื่อหมวดหมู่ให้ตรงกับปุ่มกรอกด้านล่าง
    description: "Anki ดิจิทัลแฟลชการ์ด HSK 3.0 Lv.6 และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki", 
    paymentLink: "https://buy.stripe.com/3cI9AV0IS72G00R846aEE05"
  }
  ,
  { 
    id: "p9", // 💡 ตั้ง ID ห้ามซ้ำกับตัวเดิม เช่น p5, p6, p7 ไปเรื่อยๆ
    title: "รวมคำศัพท์จีน HSK 3.0 Lv.7-9", 
    price: 629, 
    imageUrl: "/A2.png", // ลิงก์รูปภาพ หรือใส่เป็น "/ชื่อรูป.png" ถ้าเอารูปไปวางในโฟลเดอร์ public
    category: "Vocabulary", // 💡 ใส่ชื่อหมวดหมู่ให้ตรงกับปุ่มกรอกด้านล่าง
    description: "Anki ดิจิทัลแฟลชการ์ด HSK 3.0 Lv.7-9 และไฟล์ google sheet แปลไทย และตัวอย่างประโยค (จีน&ไทย) พร้อมการออกเสียงด้วยระบบของ Anki", 
    isPreOrder: true, // 👈 1. เพิ่มสถานะว่าเป็นสินค้า Pre-order
    paymentLink: "mailto:theremembernow@hotmail.com?subject=สนใจ Pre-order สินค้า HSK 3.0 Lv.7-9&body=สวัสดีครับคุณ Bank phatipan ผมสนใจสั่งซื้อล่วงหน้าคลังคำศัพท์ HSK 7-9 ครับ ส่งรายละเอียดกลับมาที่เมลนี้ได้เลยครับ" // 👈 2. ใส่ลิงก์อีเมลของคุณตรงนี้
  }
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
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-50">
            <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <span className="text-3xl font-bold text-gray-900 mb-6">
              {product.isPreOrder ? `฿${product.price} (Pre-order)` : product.price === 0 ? "ฟรี" : `฿${product.price}`}
            </span>
            <p className="text-gray-600 mb-8 whitespace-pre-line">{product.description}</p>
            
            <a 
              href={product.paymentLink}
              className="w-full bg-gray-900 text-white font-medium py-4 rounded-full hover:bg-gray-800 transition transform hover:scale-[1.02] text-center shadow-lg"
            >
              {/* 3. เช็คเงื่อนไขข้อความบนปุ่ม */}
              {product.isPreOrder 
                ? "สั่งซื้อล่วงหน้าผ่าน Email (Pre-order)" 
                : product.price === 0 
                  ? "ทดลองใช้สินค้า" 
                  : "ซื้อสินค้าชิ้นนี้ทันที"}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}