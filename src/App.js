import { React, useState, useEffect } from "react";
import axios from "axios";

// https://restcountries.eu/rest/v2/region/asia
// ● Display following attributes - name, capital, flag(display image for each country), region,
// subregion, population, borders & languages.
const App = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState([]);
  async function getData() {
    try {
      const url = `https://restcountries.eu/rest/v2/region/${region}`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const refresh = () => {
    getData();
  }
  useEffect(() => {
    getData();
  });
  return (
    <div className="hero-container">
      <div className="information-heading-container">
        <div className="left">
          <h1>Choose Region </h1>
          <select name={region} onChange={(e) => {
            setRegion(e.target.value);

          }}>
            <option defaultChecked>Choose</option>
            <option value="asia">Asia</option>
            <option value="africa">africa</option>
            <option value="americas">americas</option>
            <option value="europe">europe</option>
            <option value="oceania">oceania</option>
          </select>
        </div>
        <div className="right">
          <button onClick={refresh}>Refresh</button>
        </div>
      </div>

      <hr />
      <table className="GeneratedTable">

        <thead>
          <tr>
            <th>Sno</th>
            <th>name</th>
            <th>capital</th>
            <th>flag</th>
            <th>region</th>
            <th>subregion</th>
            <th>population</th>
            <th>borders</th>
            <th>languages</th>
          </tr>
        </thead>
        <tbody>
          {data.map((currElem, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{currElem.name}</td>
                <td> {currElem.capital} </td>
                <td><img className="country-flag" src={currElem.flag} alt="flag" /></td>
                <td>{currElem.region}</td>
                <td>{currElem.subregion}</td>
                <td>{currElem.population}</td>
                <td>{currElem.borders + ","}</td>
                <td>{currElem.languages.map(val => val.name + ",")}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
