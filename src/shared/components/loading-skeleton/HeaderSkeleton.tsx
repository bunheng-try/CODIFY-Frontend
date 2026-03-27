import React from "react";
import SkeletonBox from "./SkeletonBox";

const HeaderSkeleton: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-center sm:justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 gap-2 sm:gap-0">
    {/* Left: icon + title */}
    <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
      <SkeletonBox width={28} height={28} borderRadius={6} />
      <SkeletonBox width={180} height={18} borderRadius={5} />
    </div>

    {/* Right: action buttons */}
    <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
      <SkeletonBox width={90} height={32} borderRadius={6} />
      <SkeletonBox width={90} height={32} borderRadius={6} />
    </div>
  </div>
);

export default HeaderSkeleton;