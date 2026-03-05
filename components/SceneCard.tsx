import React from 'react';

interface SceneCardProps {
  name: string;
  world: string;
  description: string;
}

export default function SceneCard({ name, world, description }: SceneCardProps) {
  return (
    /* 卡片外壳：极其克制的微阴影，底部留出 16px (mb-4) 的间距 */
    <div className="bg-white rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden mb-4">
      
      {/* 上半部：深紫叙事块 */}
      {/* 调整：加大了上下边距(py-6)，让文字大口呼吸 */}
      <div className="bg-[#4a3570] px-5 py-6">
        <p className="text-white/95 text-[15px] leading-[1.7] text-justify tracking-wide font-light break-all">
          「 {description} 」
        </p>
      </div>

      {/* 下半部：现世信息块 */}
      <div className="px-5 py-4">
        {/* 场景主标题 */}
        <h3 className="text-gray-900 font-medium text-[16px] mb-3">
          {name}
        </h3>
        
        {/* 底部 Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            {/* 极简灰底头像 */}
            <div className="w-[22px] h-[22px] rounded-full bg-gray-200"></div>
            {/* 世界归属 */}
            <span className="text-gray-500 text-[13px]">{world}</span>
          </div>
          
          {/* 收藏星标 */}
          <button className="text-gray-400 hover:text-[#4a3570] transition-colors focus:outline-none">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>
      </div>
      
    </div>
  );
}