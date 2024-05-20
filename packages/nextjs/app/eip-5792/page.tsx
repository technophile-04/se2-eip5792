"use client";

import { useState } from "react";
import { EIP5972TxNotification } from "./_components/EIP5972TxNotification";
import { NextPage } from "next";
import { useAccount, useConnect } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { InputBase } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { getParsedError, notification } from "~~/utils/scaffold-eth";

const EIP5792: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [newGreetings, setNewGreetings] = useState("");

  const { data: YourContract } = useDeployedContractInfo("YourContract");
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("YourContract");

  const { writeContractsAsync, data: lastStatusId } = useWriteContracts();

  const { isSuccess: isEIP5792Wallet } = useCapabilities({ account: address });
  const { connectAsync, connectors } = useConnect();
  console.log("The connectors are:", connectors);

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
      notification.success(
        <EIP5972TxNotification message="Transaction completed successfully!" statusId={lastStatusId} />,
        {
          duration: Infinity,
        },
      );
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
              <button
                className="btn btn-primary btn-sm self-end"
                onClick={async () => {
                  try {
                    await writeYourContractAsync({ functionName: "setGreeting", args: [newGreetings] });
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Set Greetings
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="m-0">Increment Counter</p>
              <button
                className="btn btn-primary btn-sm"
                onClick={async () => {
                  try {
                    await writeYourContractAsync({ functionName: "increaseCounter" });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                increment
              </button>
            </div>
          </div>
          <button className="btn btn-primary mt-2" disabled={!isEIP5792Wallet} onClick={handleBatchTransaction}>
            Batch (setGreetings + increment)
          </button>
          {!isEIP5792Wallet && isConnected && (
            <button
              className="btn btn-primary"
              onClick={async () => {
                try {
                  const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK");
                  if (!coinbaseConnector) {
                    throw new Error("Coinbase connector not found");
                  }

                  await connectAsync({ connector: coinbaseConnector });
                } catch (error) {
                  console.log("Error switching to coinbase wallet", error);
                  notification.error("Error switching to coinbase wallet");
                }
              }}
            >
              Switch to coinbase wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EIP5792;
