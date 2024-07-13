
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {currency: "Rs.", style: "currency"})

function FormatCurrency(num : number) {

    return (
        CURRENCY_FORMATTER.format(num)
    );
}

export default FormatCurrency