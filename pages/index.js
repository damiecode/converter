import React , { useEffect, useState } from 'react';
import CurrencyInput  from '../components/CurrencyInput.js'
import styles from '../styles/Home.module.css';

const BASE_URL = " https://api.exchangeratesapi.io/latest"

const Home = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRates, setExchangeRates] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if(amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRates;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRates;
  }

  useEffect(() => {
      fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRates(data.rates[firstCurrency])
      })
  }, []);

  useEffect(() => {
    if (fromCurrency != null & toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRates(data.rates[toCurrency]))
      }
    }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false);
  }

  return (
    <div className="container">
      <div className="converter-container">
      <h2 className="head-text">Currency Converter</h2>
      <CurrencyInput 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyInput 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
      <div className="para">
        <p>This is a simple currency conveter that get latest rates from an open soure API</p>
      </div>
      </div>
    </div>
  )
}

export default Home;
