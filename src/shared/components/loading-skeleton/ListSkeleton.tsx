import React from "react";
import SkeletonBox from "./SkeletonBox";

interface ListSkeletonProps {
    count?: number;
    itemHeight?: number | string; 
    itemSpacing?: number;
    borderRadius?: number | string;
    className?: string;
}

const ListSkeleton: React.FC<ListSkeletonProps> = ({
    count = 5,
    itemHeight = 60,
    itemSpacing = 12,
    borderRadius = 6,
    className = "",
}) => {
    return (
        <div className={`flex flex-col ${className}`} style={{ gap: itemSpacing }}>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonBox
                    key={index}
                    height={itemHeight}
                    borderRadius={borderRadius}
                    width="100%"
                />
            ))}
        </div>
    );
};

export default ListSkeleton;