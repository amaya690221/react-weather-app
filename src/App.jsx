// App.jsx
import { useState } from "react"
import Title from "./components/Title"
import Form from "./components/Form"
import Results from "./components/Results"
import Loading from "./components/Loading" //データ取得中表示

const App = () => {
  const [loading, setLoading] = useState(false) //データ取得中表示
  const [city, setCity] = useState("")
  const [results, setResults] = useState({
    country: "",
    cityName: "",
    temperature: "", 
    conditionText: "",
    icon: ""
  })
  const getWeather = (e) => {
        e.preventDefault()
        setLoading(true) //データ取得済
        fetch(`https://api.weatherapi.com/v1/current.json?key=edd693cf6c0449deb4c14444240105&q=${city}&aqi=no`)
        .then(res => res.json())
        .then(data => {
          setResults({
            country: data.location.country,
            cityName: data.location.name,
            temperature: data.current.temp_c,
            conditionText: data.current.condition.text,
            icon: data.current.condition.icon
          })
          setLoading(false) //データ取得中
          setCity("") //フォームの入力文字初期化
      })
      //エラー処理
      .catch(() => alert("エラーが発生しました。ページをリロードして、もう一度入力してください"))
  }
  console.log(results)

  return (
        <div className="wrapper">
            <div className="container">
              
                <Title/>
                <Form getWeather={getWeather}
                //フォームの入力文字初期化
                setCity={setCity} 
                city={city}
                />
                {loading ? <Loading/> : <Results results={results}/>}
            </div>
        </div>
    )
}

export default App