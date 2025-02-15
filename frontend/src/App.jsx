import React, { useState, memo, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Provider, Network } from "aptos";

const AccountDisplay = memo(({ account }) => (
  <div className="text-2xl text-white">Account: {account.address}</div>
));

function App() {
  const { account, signAndSubmitTransaction } = useWallet();
  const provider = new Provider(Network.TESTNET);
  const [count, setCount] = useState(0);
  const [transactionHash, setTransactionHash] = useState(null);


  const updateCount = async () => {
    const newCount = await fetchCount();
    if (newCount !== null) {
      setCount(newCount);
    }
  };

  const fetchCount = async () => {
    if (!account) return null;
    const counterModuleAddress = "0xce16b6df36c19fbb2c391c9d42431cd367fb78e7a94aa4aad3adf6523a1d7b1f";
    try {
      const resourcePath = `${counterModuleAddress}::Counter::CountHolder`;
      const countHolderResource = await provider.getAccountResource(account.address, resourcePath);
      return countHolderResource ? parseInt(countHolderResource.data.count, 10) : 0;
    } catch (e) {
      console.error("Error fetching count:", e);
      return null;
    }
  };

  const incrementCount = async () => {
    if (!account) {
      console.error("Account is undefined");
      return;
    }

    const counterModuleAddress = "0xce16b6df36c19fbb2c391c9d42431cd367fb78e7a94aa4aad3adf6523a1d7b1f";
    const payload = {
      type: "entry_function_payload",
      function: `${counterModuleAddress}::Counter::increment`,
      type_arguments: [],
      arguments: []
    };

    try {
      console.log("Submitting payload:", payload);
      const response = await window.aptos.signAndSubmitTransaction(payload);  // Changed to use signAndSubmitTransaction from useWallet

      await provider.waitForTransaction(response.hash);
      console.log(response.hash)
      alert("Count incremented successfully");
      setTransactionHash(response.hash);
      updateCount();  // Update the count after successful increment
    } catch (error) {
      console.error("Error incrementing count:", error);
    }
  };

  useEffect(() => {
    updateCount();
  }, [account]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4">
      <div className="flex justify-end p-4">
        <WalletSelector />
      </div>

      <div className="flex flex-col items-center flex-grow mt-10">
        <div>
          {account ? (
            <AccountDisplay account={account} />
          ) : (
            <div className="text-2xl text-white">No account connected</div>
          )}
        </div>
        <div className="mt-8">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-800 transition duration-300"
              onClick={incrementCount}
              disabled={!account}  // Disable the button if no account is connected
            >
              <div className="bg-white w-3/4 h-3/4 rounded-full"></div>
            </button>
            <div className="flex justify-center bg-black p-2 rounded-lg">
              {String(account ? count : 0)  // Display 0 if no account is connected
                .padStart(4, "0")
                .split("")
                .map((num, index) => (
                  <div key={index} className="text-6xl text-red-600 font-bold mr-2">
                    {num}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {transactionHash && account && (
        <div className="text-center mt-4">
          <a
            href={`https://explorer.aptoslabs.com/txn/${transactionHash}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            View Transaction
          </a>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
