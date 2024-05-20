import { EIP5792 } from "./_components/EIP5792";
import { TotalCounter } from "./_components/TotalCounter";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center space-y-4 flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2 🤝 EIP-5792</span>
          </h1>
        </div>
        <TotalCounter />
        <EIP5792 />
      </div>
    </>
  );
};

export default Home;
