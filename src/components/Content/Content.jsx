import { useEffect, useState } from "react";
import css from "./style.scss"
import res from "../../data"
// import Header from "../Header";


function Content() {
    const [items, setItems] = useState([]);
    const [currencyOne, setCurrencyOne] = useState(0);
    const [currencyTwo, setCurrencyTwo] = useState(0);
    const [currencyNameOne, setCurrencyNameOne] = useState(items[0]?.txt)
    const [currencyNameTwo, setCurrencyNameTwo] = useState(items[0]?.txt)
    const [rateOne, setRateOne] = useState(1);
    const [rateTwo, setRateTwo] = useState(1);

    useEffect(() => {
        setItems(res);
    }, []);
    console.log(items);



    const handleCurrencyOneChange = (e) => {
        const value = e.target.value;
        setCurrencyOne(value);
        setCurrencyTwo((value * rateOne) / rateTwo);
    };

    const handleCurrencyTwoChange = (e) => {
        const value = e.target.value;
        setCurrencyTwo(value);
        setCurrencyOne((value * rateTwo) / rateOne);
    };

    const handleRateOneChange = (e) => {
        const selectedRate = items.find(item => item.cc === e.target.value)?.rate;
        setRateOne(selectedRate);
        setCurrencyTwo((currencyOne * selectedRate) / rateTwo);
    };

    const handleRateTwoChange = (e) => {
        const selectedRate = items.find(item => item.cc === e.target.value)?.rate;
        setRateTwo(selectedRate);
        setCurrencyOne((currencyTwo * selectedRate) / rateOne);
    };



    // useEffect(() => {
    //     fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return res;
    //         })
    //         .then(
    //             (result) => {
    //                 console.log(result);
    //                 setItems(result)
    //             },
    //             (error) => {
    //                 console.error('Error fetching data:', error);
    //             }
    //         )
    //         .catch((error) => {
    //             console.error('Fetch error:', error);
    //         });
    // }, [items]);

    return (
        <>
            <header className="header">
                <div className="header__currency">
                    <div className="header__currency--code">USD</div>
                    <div className="header__currency--rate">{items.find(item => item.cc === "USD")?.rate}</div>
                </div>
                <div className="header__currency">
                    <div className="header__currency--code">EUR</div>
                    <div className="header__currency--rate">{items.find(item => item.cc === "EUR")?.rate}</div>
                </div>
                <div className="header__currency">
                    <div className="header__currency--code">PLN</div>
                    <div className="header__currency--rate">{items.find(item => item.cc === "PLN")?.rate}</div>
                </div>
            </header>
            <div className="content">
                <div className="content__currency">
                    <select onChange={handleRateOneChange} className="content__currency--select">
                        {items.map((item, index) => (
                            <option key={index} value={item.cc} className="content__currency--option">{item.cc}</option>
                        ))}
                    </select>
                    <input
                        className="content__currency--input"
                        type="number"
                        value={currencyOne}
                        onChange={handleCurrencyOneChange}
                    />
                </div>
                <div className="content__currency">
                    <select onChange={handleRateTwoChange} className="content__currency--select">
                        {items.map((item, index) => (
                            <option key={index} value={item.cc} className="content__currency--option">{item.cc}</option>
                        ))}
                    </select>
                    <input
                        className="content__currency--input"
                        type="number"
                        value={currencyTwo}
                        onChange={handleCurrencyTwoChange}
                    />
                </div>
            </div>
        </>
    );
}

export default Content;
