const CurrencyInput = props => {
	const {
		currencyOptions,
		selectedCurrency,
		onChangeCurrency,
		amount,
		onChangeAmount
	} = props;

	return (
		<form>
			<label for="amount">Amount</label>
			<input type="number" className="input" value={amount} onChange={onChangeAmount} />
			<select 
				id="currency" 
				value={selectedCurrency}
				onChange={onChangeCurrency}
			>
				{currencyOptions.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
		</form>
	)
}

export default CurrencyInput;
