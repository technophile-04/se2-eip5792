"use client";

import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const TotalCounter = () => {
  const { data: totalCounter, isLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Total Counter</div>
        <div className="stat-value flex items-center justify-center">
          {isLoading ? (
            <span className="loading loading-spinner loading-md mt-2"></span>
          ) : (
            <p className="my-0 text-center">{totalCounter ? totalCounter?.toString() : 0}</p>
          )}
        </div>
      </div>
    </div>
  );
};
