import { useEffect, useRef, useState } from 'react';
// import env from 'react-dotenv';
import './App.css';
import SearchHouse from './Search_house';
import Table from './Table';
import env from './env'
const style = {
  label:{
    display:'block',
    textAlign:'center',
    margin:'5px auto',
    fontSize:'20px'
  },
  inline_label:{
    display:'inline',
    textAlign:'center',
    margin:'5px auto',
    fontSize:'20px'
  },
  input:{
    display:'block',
    margin:'8px auto'
  },
  inline_input:{
    display:'inline',
    margin:'8px auto'
  },
  table_div: {
    display:'flex',
    justifyContent:"center",
    alignItems:"center"
   },
   td:{
     border:'1px solid black',
     padding:'8px',
     margin:'2px',
     textAlign:'center'
   },
}
function App() {
  const [companies, setCompanies] = useState([]);
  const [globalCompanies,setGlobalCompanies] = useState([]);
  const [houses, setHouses] = useState([]);
  const [globalHouses, setGlobalHouses] = useState([]);
  // const [filter,setFilter] = useState({})
  // console.log(env,window.env);
  const refs = {
    company_name: useRef(),
    fillial_name: useRef(),
    house_rooms: useRef(),
    house_price: useRef(),
    house_area: useRef()
  }
  useEffect(() => {
  // console.log(env,`${env.HOST}:${env.PORT}/get_companies`);
  console.log(`Fetching${env.HOST}:${env.PORT}/get_companies`);
  fetch(`${env.HOST}${env.PORT ? ':'+env.PORT:''}/get_companies`)
  .then(data=>data.json()).then(value=> {
    setCompanies(value)
    setGlobalCompanies(value)
  })
  fetch(`${env.HOST}${env.PORT ? ':'+env.PORT:''}/get_houses`)
  .then(data=>data.json()).then(value=> {
    setHouses(value)
    setGlobalHouses(value)
  })
  },[])
  async function filterer(filters = {}){
    // console.log(filters);
    // fetch(`${env.HOST}:${env.PORT}/get_houses`)
    // console.log(filters,Object.values(filters).length);
    if(Object.values(filters).length === 0){
      await setCompanies(globalCompanies)
      await setHouses(globalHouses)
      return true
    }
    if(filters.companies){
      if(filters.companies.default)return await setCompanies(globalCompanies)
      let local_companies = globalCompanies
      let companies_list =(
        Object.entries(filters.companies)
      .map(data=>local_companies
        .filter(gData=>gData[data[0]] === data[1]))[0]
      )
      // console.log(companies_list);
      // console.log((companies_list.map(c => globalHouses.filter(h => h.fillial_id === c.fillial_id)).reduce((prev,curr)=> [...prev,...curr],[])));
      await setCompanies(companies_list)
      await setHouses((companies_list.map(c => globalHouses.filter(h => h.fillial_id === c.fillial_id)).reduce((prev,curr)=> [...prev,...curr],[])))
    // console.log(houses);
    }
    if(filters.houses){
      if(filters.houses.default) return setHouses(globalHouses)
      // Object.entries(filters.houses)
      // .map(data=>globalHouses
      //   .map(gData=>console.log(!isNaN(+gData[data[0]]) ,+gData[data[0]],+data[1])))
      
        setHouses(
        ...Object.entries(filters.houses)
      .map(data=>globalHouses
        .filter(gData=>!isNaN(+gData[data[0]]) ? +gData[data[0]] >= +data[1] : gData[data[0]] === data[1]))
      )
    }
}
  return (
    <div className="App">
      <SearchHouse style={style} houses={houses} companies={companies} filter={filterer} refs={refs} />
      <Table style={style} houses={houses} companies={companies} filter={filterer} refs={refs} />
    </div>
  );
}

export default App;
