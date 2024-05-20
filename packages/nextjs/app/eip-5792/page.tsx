"use client";

import { useState } from "react";
import { NextPage } from "next";
import { useShowCallsStatus, useWriteContracts } from "wagmi/experimental";
import { InputBase } from "~~/components/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { getParsedError, notification } from "~~/utils/scaffold-eth";

const EIP5792: NextPage = () => {
  const [newGreetings, setNewGreetings] = useState("");

  const { data: YourContract } = useDeployedContractInfo("YourContract");

  const { writeContractsAsync, data: lastStatusId } = useWriteContracts();
  const { showCallsStatusAsync } = useShowCallsStatus();

  const handleBatchTransaction = async () => {
    try {
      if (!YourContract) return;

      if (newGreetings.length === 0) {
        notification.error("Please input new greetings");
        return;
      }

      await writeContractsAsync({
        contracts: [
          {
            address: YourContract.address,
            abi: YourContract.abi,
            functionName: "setGreeting",
            args: [newGreetings],
          },
          {
            address: YourContract.address,
            abi: YourContract.abi,
            functionName: "increaseCounter",
          },
        ],
      });
      notification.success("Batch transaction success");
    } catch (error) {
      const parsedError = getParsedError(error);
      notification.error(parsedError);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center m-8">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Interact with YourContract</h2>
          <div className="border-4 border-dashed border-secondary p-2">
            <div className="flex flex-col space-y-2">
              <p className="m-0">Set New Greetings</p>
              <InputBase value={newGreetings} onChange={setNewGreetings} placeholder="Hello EIP-5792..." />
              <button className="btn btn-primary btn-sm self-end">Set Greetings</button>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="m-0">Increment Counter</p>
              <button className="btn btn-primary btn-sm">increment</button>
            </div>
          </div>
          <button className="btn btn-primary mt-2" onClick={handleBatchTransaction}>
            Batch (setGreetings + increment)
          </button>
          <button
            className="btn btn-primary mt-2"
            onClick={async () => {
              if (!lastStatusId) {
                console.error("No lastStatusId");
                return;
              }
              await showCallsStatusAsync({ id: lastStatusId });
            }}
          >
            Show status
          </button>
        </div>
      </div>
    </div>
  );
};

export default EIP5792;
