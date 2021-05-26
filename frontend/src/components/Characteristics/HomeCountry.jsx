function HomeCountry(props) {
  const countries={
    "AUT": "Austria",
    "BHS": "Bahamas",
    "BLR": "Belarus",
    "BEL": "Belgium",
    "BRA": "Brazil",
    "BRN": "Brunei",
    "BGR": "Bulgaria",
    "CAN": "Canada",
    "HRV": "Croatia",
    "CZE": "Czech Republic",
    "DNK": "Denmark",
    "EST": "Estonia",
    "FIN": "Finland",
    "FRA": "France",
    "DEU": "Germany",
    "HTI": "Haiti",
    "HUN": "Hungary",
    "IDN": "Indonesia",
    "IRL": "Ireland",
    "ITA": "Italy",
    "JAM": "Jamaica",
    "JPN": "Japan",
    "KAZ": "Kazakhstan",
    "LVA": "Latvia",
    "LBN": "Lebanon",
    "LTU": "Lithuania",
    "NLD": "Netherlands",
    "NGA": "Nigeria",
    "NOR": "Norway",
    "PRY": "Paraguay",
    "POL": "Poland",
    "RUS": "Russia",
    "SRB": "Serbia",
    "SVK": "Slovakia",
    "SVN": "Slovenia",
    "ZAF": "South Africa",
    "KOR": "South Korea",
    "SWE": "Sweden",
    "CHE": "Switzerland",
    "TWN": "Taiwan",
    "TZA": "Tanzania",
    "UKR": "Ukraine",
    "GBR": "United Kingdom",
    "USA": "United States",
    "VEN": "Venezuela"
    }
    return (
              <select style={{width: props.width}} name="value" value={props.value} className="form-select" aria-label="Default select example" onChange={event => props.inputChange(props.idx, event)}>
                <option selected>Select Country</option>
                {Object.keys(countries).map((key) => {
                  return <option value={key}>{countries[key]}</option>
                })   
                }
            </select>
      
    );
  }

  
  
  export default HomeCountry;
