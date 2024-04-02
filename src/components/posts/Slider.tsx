import { Slider as SliderProps } from "types/Slider";
import { Swiper, SwiperSlide } from "swiper/react";
import fingerprintIcon from "assets/images/posts/fingerprint.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";

export default function Slider({ files }: SliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [rotations, setRotations] = useState<Array<number>>([]);
  const [scales, setScales] = useState<Array<number>>([]);

  useEffect(() => {
    const calculatedRotations: Array<number> = [];
    const calculatedScales: Array<number> = [];
    for (const index in files) {
      calculatedRotations[index] = Math.random() * 360;
      calculatedScales[index] = Math.random() * (1 - 0.95 + 1) + 0.95;
    }
    setRotations(calculatedRotations);
    setScales(calculatedScales);
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full aspect-square relative">
        <div className="absolute z-10 w-full h-full pointer-events-none bg-media-mask bg-cover bg-center" />
        <Swiper
          className="h-full"
          resistanceRatio={0}
          onSlideChange={(swiper: any) => setActiveSlide(swiper.activeIndex)}
        >
          {files.map((file) => {
            return (
              <SwiperSlide className="h-full" key={`slide_${file.id}`}>
                <div className="w-full h-full relative">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover"
                    src={
                      file.provider === "cloudinary"
                        ? file.url
                        : `${process.env.REACT_APP_API_URL}${file.url}`
                    }
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex justify-center mb-[20px] mt-[10px]">
        {files.map((file, index) => {
          return (
            <img
              key={`${file.id}_dot`}
              src={fingerprintIcon}
              width={5}
              style={{
                opacity: activeSlide === index ? 1 : 0.5,
                transform: `rotate(${rotations[index]}deg) scale(${scales[index]})`,
              }}
              className="mx-[5px]"
            />
          );
        })}
      </div>
    </div>
  );
}
