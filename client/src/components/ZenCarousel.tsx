import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface ZenCarouselProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
}

export default function ZenCarousel({ products, onAddToCart }: ZenCarouselProps) {
  return (
    <div className="relative w-full py-8" dir="rtl">
      <style>{`
        .zen-carousel .swiper-slide {
          width: 300px !important;
          height: 420px !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 24px;
          border-radius: 20px;
          background: rgba(30, 20, 50, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 105, 180, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .zen-carousel .swiper-slide-active {
          background: rgba(50, 30, 70, 0.6);
          border-color: rgba(255, 105, 180, 0.5);
          box-shadow: 0 20px 60px rgba(255, 105, 180, 0.3);
        }

        .zen-carousel .swiper-slide img {
          width: 160px;
          height: 220px;
          object-fit: contain;
          margin-bottom: 16px;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
          transition: transform 0.3s ease;
        }

        .zen-carousel .swiper-slide-active img {
          transform: scale(1.05);
        }

        .zen-carousel .swiper-button-next,
        .zen-carousel .swiper-button-prev {
          color: #ff69b4;
          background: rgba(20, 10, 40, 0.6);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 105, 180, 0.3);
          backdrop-filter: blur(8px);
        }

        .zen-carousel .swiper-button-next:hover,
        .zen-carousel .swiper-button-prev:hover {
          background: rgba(255, 105, 180, 0.2);
          border-color: rgba(255, 105, 180, 0.6);
        }

        .zen-carousel .swiper-button-next::after,
        .zen-carousel .swiper-button-prev::after {
          font-size: 20px;
        }

        .zen-carousel .swiper-pagination-bullet {
          background: rgba(255, 105, 180, 0.4);
          width: 10px;
          height: 10px;
        }

        .zen-carousel .swiper-pagination-bullet-active {
          background: #ff69b4;
          width: 24px;
          border-radius: 5px;
        }
      `}</style>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="zen-carousel"
        dir="rtl"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} data-testid={`zen-slide-${product.id}`}>
            <img 
              src={product.image} 
              alt={product.name}
              data-testid={`zen-image-${product.id}`}
            />
            <h3 
              className="text-lg font-bold text-center mb-2 text-pink-200"
              data-testid={`zen-title-${product.id}`}
            >
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-3 line-clamp-2 px-2">
              {product.category}
            </p>
            <p 
              className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              data-testid={`zen-price-${product.id}`}
            >
              ₪{product.price}
            </p>
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0"
              onClick={() => onAddToCart?.(product.id)}
              data-testid={`zen-cart-btn-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4 ml-2" />
              הוסף לעגלה
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
