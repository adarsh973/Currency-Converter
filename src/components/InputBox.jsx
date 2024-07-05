import { useId } from "react"
import useCurrencyInfo from "../hooks/useCurrencyInfo";

function InputBox({
    label,
    amount = 0,
    onAmountChange,
    onCurrencyChange,
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
    currencyOptions = [],
}) {

    const amountId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">

                <label htmlFor={amountId} className="ext-black/40 mb-2 inline-block">
                    {label}
                </label>

                <input id={amountId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    disabled={amountDisable}
                    value={ amount }
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    onFocus={(e) => e.target.value === '0' && onAmountChange && onAmountChange('')} // Clear input if '0'
                ></input>
            </div>

            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange = {(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}>

                        {/* data in dropdown currency list */}
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                        
                </select>
            </div>
        </div>
    )
}

export default InputBox;