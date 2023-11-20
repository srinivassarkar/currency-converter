import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components/index";

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <p className="text-slate-50 text-2xl text-center mb-4">
          CURRENCY CONVERTER
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="from"
              amount={amount}
              selectedCurrency={from}
              currencyOptions={options}
              onCurrencyChange={(currency) => {
                setFrom(currency);
              }}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>
          <div className="relative w-full h-0.5 mb-2">
            <button
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 transition duration-300 hover:bg-blue-700 hover:border-blue-700"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mb-1">
            <InputBox
              label="to"
              amount={convertedAmount}
              amountDisabled
              currencyOptions={options}
              onCurrencyChange={(currency) => {
                setTo(currency);
              }}
              selectedCurrency={to}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg transition duration-300 hover:bg-blue-700"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
