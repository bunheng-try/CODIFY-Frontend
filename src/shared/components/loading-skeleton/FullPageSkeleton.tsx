import React from "react";
import SkeletonBox from "./SkeletonBox";

const FullPageSkeleton: React.FC = () => (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4 p-4">
        <SkeletonBox width="30%" height={40} borderRadius={8} />

        <SkeletonBox width="80%" height={16} borderRadius={6} />
        <SkeletonBox width="80%" height={16} borderRadius={6} />
        <SkeletonBox width="60%" height={16} borderRadius={6} />

        <SkeletonBox width="100%" height={256} borderRadius={12} />
    </div>
);

export default FullPageSkeleton;