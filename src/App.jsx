import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo';
import InputBox from './components/InputBox';

function App() {

  // useState hooks
  const [amount, setAmount] = useState(0);  // Amount to be converted
  const [from, setFrom] = useState("usd");  // source currency
  const [to, setTo] = useState("inr");      // target currency
  const [convertedAmount, setConvertedAmount] = useState(0);   // converted amount

  // Using the custom hook to get currency information
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  // Function to convert currency
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  // function for swapping of currencies
  const swap = () => {
    setTo(from);
    setFrom(to);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  return (
    <div className='h-screen bg-cover bg-no-repeat flex flex-wrap justify-center items-center'
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/730647/pexels-photo-730647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>


      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}>

            <div className='w-full mb-1'>
              <InputBox label="From"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={from}
                onCurrencyChange={(currency) => setFrom(currency)}
                currencyOptions={options}
              ></InputBox>
            </div>

            <button onClick={swap}
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
            >
              SWAP
            </button>

            <div className='w-full mb-1'>
              <InputBox label="To"
                amount={convertedAmount}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={to}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisable
                currencyOptions={options}
              ></InputBox>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default App