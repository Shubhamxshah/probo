"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from "recharts";
import { Info } from "lucide-react";

type Option = "yes" | "no";

type Stock = {
  price: number;
  total: number;
};

export default function Page() {
  const params = useParams();
  const decodedSlug = decodeURIComponent(params.slug as string);
  const [yesStocks, setYesStocks] = useState<Stock[]>([]);
  const [noStocks, setNoStocks] = useState<Stock[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [price, setPrice] = useState(5.5);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("yes");

  const YES_PRICE = 5.9;
  const NO_PRICE = 4.1;

  const incrementPrice = () => {
    setPrice((prev) => Math.round((prev + 0.5) * 10) / 10);
  };

  const decrementPrice = () => {
    if (price > 0.5) {
      setPrice((prev) => Math.round((prev - 0.5) * 10) / 10);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const calculatePut = () => {
    return (price * quantity).toFixed(1);
  };

  const calculateGet = () => {
    return (quantity * 10).toFixed(1);
  };

  // Handle option selection with price update
  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    // Update the price based on the selected option
    if (option === "yes") {
      setPrice(YES_PRICE);
    } else {
      setPrice(NO_PRICE);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username") || "anonymous";

    // Create a new WebSocket connection
    wsRef.current = new WebSocket("ws://localhost:3002");

    // When the connection is opened
    wsRef.current.onopen = () => {
      console.log("WebSocket connected");
      if (wsRef.current) {
        const payload = {
          type: "subscribe",
          params: {
            userId: username,
            eventId: decodedSlug,
          },
        };
        wsRef.current.send(JSON.stringify(payload));
      }
    };

    // Handle incoming messages
    wsRef.current.onmessage = (message) => {
      try {
        const parsedData = JSON.parse(message.data);
        console.log("Received data:", parsedData);

        const eventData = parsedData?.EventData;
        if (eventData) {
          // Convert and sort yes stocks
          const updatedYesTokens: Stock[] = Object.keys(eventData.yes || {})
            .map((key) => ({
              price: Number(key),
              total: eventData.yes[key].total,
            }))
            .sort((a, b) => a.price - b.price);

          // Convert and sort no stocks
          const updatedNoTokens: Stock[] = Object.keys(eventData.no || {})
            .map((key) => ({
              price: Number(key),
              total: eventData.no[key].total,
            }))
            .sort((a, b) => a.price - b.price);

          console.log("Setting yes stocks:", updatedYesTokens);
          console.log("Setting no stocks:", updatedNoTokens);

          setYesStocks(updatedYesTokens);
          setNoStocks(updatedNoTokens);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    // Handle connection closure
    wsRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Handle errors
    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup function
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        const returnPayload = {
          type: "leave",
        };
        wsRef.current.send(JSON.stringify(returnPayload));
        wsRef.current.close();
      }
    };
  }, [decodedSlug]);

  return (
    <>
      <div className="flex items-center justify-center mt-16">
        <Image src="/indvsnz.avif" alt="logo" height={100} width={100} />
        <h1 className="text-bold text-4xl font-serif ml-8">{decodedSlug}?</h1>
      </div>
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center mt-24">
        <div className="w-full md:w-1/3 h-72 p-2">
          <h2 className="text-center font-bold">
            Yes Stocks ({yesStocks.length})
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={yesStocks}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis type="number" />
              <YAxis
                dataKey="price"
                type="category"
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="total" fill="#4CAF50" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/3 h-72 p-2">
          <h2 className="text-center font-bold">
            No Stocks ({noStocks.length})
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={noStocks}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis type="number" />
              <YAxis
                dataKey="price"
                type="category"
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="total" fill="#F44336" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-center p-8 bg-gray-50">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            {/* Yes/No Selection */}
            <div className="flex mb-4 rounded-full overflow-hidden border border-gray-200">
              <button
                className={`flex-1 py-2 px-4 font-medium text-center ${selectedOption === "yes" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                onClick={() => handleOptionSelect("yes")}
              >
                Yes ₹{YES_PRICE}
              </button>
              <button
                className={`flex-1 py-2 px-4 font-medium text-center ${selectedOption === "no" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                onClick={() => handleOptionSelect("no")}
              >
                No ₹{NO_PRICE}
              </button>
            </div>

            {/* Set Price Button */}
            <div className="flex justify-center mb-4">
              <button className="py-2 px-6 rounded-full bg-white border border-gray-200 text-gray-800 font-medium">
                Set price
              </button>
            </div>

            {/* Price UI */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-bold text-lg mb-1">Price</p>
                  <p className="text-gray-500 text-sm">0 qty available</p>
                </div>

                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={decrementPrice}
                    className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 border-l border-r border-gray-300">
                    ₹{price.toFixed(1)}
                  </span>
                  <button
                    onClick={incrementPrice}
                    className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quantity UI */}
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center">
                  <p className="font-bold text-lg">Quantity</p>
                  <Info className="h-4 w-4 ml-1 text-gray-400" />
                </div>

                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-xl text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="flex justify-between mb-2">
                <div className="text-center">
                  <p className="font-medium text-gray-800">₹{calculatePut()}</p>
                  <p className="text-xs text-gray-500">You put</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-green-500">
                    ₹{calculateGet()}
                  </p>
                  <p className="text-xs text-gray-500">You get</p>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button className="w-full bg-gray-200 text-gray-500 py-3 rounded-md font-medium">
              Place order
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-2">
              Interactive Preview Features:
            </h3>
            <ul className="text-sm text-blue-700">
              <li>• Click "Yes" or "No" to switch between options</li>
              <li>
                • Notice how the price updates to ₹5.9 or ₹4.1 respectively
              </li>
              <li>• Try the quantity and price adjusters</li>
              <li>• Observe the "You put" and "You get" values update</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
