import React from "react";
import SkeletonBox from "./SkeletonBox";
import HeaderSkeleton from "./HeaderSkeleton";

const PanelSkeleton: React.FC = () => (
  <div className="flex flex-col gap-5 p-6">
    <HeaderSkeleton />

    {/* Section blocks */}
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex flex-col gap-2">
        <SkeletonBox width={140} height={14} borderRadius={4} />
        <SkeletonBox width="100%" height={12} borderRadius={4} />
        <SkeletonBox width="88%" height={12} borderRadius={4} />
        <SkeletonBox width="75%" height={12} borderRadius={4} />
      </div>
    ))}
  </div>
);

export default PanelSkeleton;