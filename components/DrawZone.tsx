"use client";
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import SceneCard from './SceneCard';
// 👇 1. 接入真实的星海法典 👇
import scenesData from '../public/data/scenes.json';

interface SceneData {
  id: string | number;
  name: string;
  world: string;
  description: string;
}

export default function DrawZone() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentScene, setCurrentScene] = useState<SceneData | null>(null);
  
  // 核心魔法：命运随机抽取函数
  const drawNewCard = () => {
    // 2. 从数万条数据中精准捕获一个随机位面
    const randomIndex = Math.floor(Math.random() * scenesData.length);
    const scene = scenesData[randomIndex];
    
    // 3. 执行时空重构
    setCurrentScene(scene);
    setIsRevealed(false);
    x.set(0); 
  };

  // 4. 首次降临时，自动抽取一张
  useEffect(() => {
    drawNewCard();
  }, []);

  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 150], [1, 0]); 
  const bgWidth = useTransform(x, [0, 200], ["0%", "100%"]); 

  if (!currentScene) return null; // 兜底防止渲染空洞

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-4">
      {!isRevealed ? (
        /* --- 封印态：深紫信封 (已绑定真实数据) --- */
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-sm aspect-[4/3] bg-[#4a3570] rounded-[20px] shadow-2xl flex flex-col items-center justify-center overflow-hidden"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]" preserveAspectRatio="none">
             <line x1="0" y1="0" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
             <line x1="100%" y1="0" x2="50%" y2="50%" stroke="white" strokeWidth="1" />
          </svg>
          
          <h2 className="text-white text-[20px] tracking-[0.5em] font-light mb-12 opacity-80 z-10">
            陌 生 来 信
          </h2>

          <div 
            className="relative w-[240px] h-[54px] bg-white/10 rounded-full border border-white/20 backdrop-blur-sm overflow-hidden z-20"
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
             <motion.div style={{ width: bgWidth }} className="absolute inset-0 bg-white/20" />
             <motion.p style={{ opacity }} className="absolute inset-0 flex items-center justify-center text-white/50 text-[13px] tracking-widest pl-8 pointer-events-none">
               滑动解封
             </motion.p>

             <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 180 }}
              dragElastic={0} 
              dragMomentum={false}
              style={{ x }}
              onDragEnd={() => {
                if (x.get() > 140) {
                  setIsRevealed(true);
                } else {
                  animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
                }
              }}
              className="absolute left-1 top-1 w-[46px] h-[46px] bg-white rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing z-30"
             >
               <div className="w-2 h-2 bg-[#4a3570] rounded-full" />
             </motion.div>
          </div>
        </motion.div>
      ) : (
        /* --- 觉醒态：真实卡片降临 --- */
        <motion.div 
          initial={{ y: 30, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full max-w-md px-1 pt-4">
            <SceneCard {...currentScene} />
          </div>

          <div className="flex space-x-6 mt-10 pb-10">
            {/* 点击“退还”：触发新的命运抽取 */}
            <button 
              onClick={drawNewCard}
              className="px-10 py-3.5 rounded-full border border-gray-200 bg-white text-gray-500 flex items-center space-x-2 active:scale-95 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:bg-gray-50/50"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              <span className="text-[15px] tracking-wide">退还</span>
            </button>

            {/* 收下按钮 (可后期绑定收藏逻辑) */}
            <button 
              className="px-10 py-3.5 rounded-full border border-[#4a3570] bg-[#f5f3f7] text-[#4a3570] flex items-center space-x-2 active:scale-95 transition-all shadow-[0_4px_12px_rgba(74,53,112,0.15)] hover:shadow-lg hover:border-[#4a3570]/80"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-82l8.5 8.5M12 21l-8.5-8.5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              <span className="text-[15px] font-medium tracking-wide">收下</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}