import React from 'react';

const Table = ({ style, houses, companies, filter, refs})=> {
  // const calc = useRef()
  async function calc_sum(e){
    let found_house = await houses.find(h => h.house_id === e.currentTarget.id)
    let found_company = await companies.find(c => c.fillial_id === found_house.fillial_id)
    for(let i of Object.keys(found_company))found_house[i] = found_company[i]
    await (() =>{
      refs.company_name.current.value = found_company.company_name
      refs.fillial_name.current.value = found_company.fillial_name
      refs.house_rooms.current.value = found_house.house_rooms
      refs.house_price.current.value = found_house.house_price
      refs.house_area.current.value = found_house.house_area
    })()
    await filter({
      houses:found_house
    })
  }
  // console.log(companies,houses);
    return (
        <div>
          <div style={style.table_div}>
          </div>
          <div style={style.table_div}>
          <table style={{display:'block'}}>
            <thead>
              <tr>
                    <th>
                      Company
                    </th>
                    <th>
                      Rooms
                    </th>
                    <th>
                      Price
                    </th>
                    <th>
                      Area
                    </th>
              </tr>
            </thead>
            <tbody>
              <tr id='calculator'>
                
                </tr>
                {
                  houses.map((house,id) => (
                      <tr key={id} id={house.house_id} onDoubleClick={calc_sum}>
                      <td style={style.td}>
                            {companies.find(company => company.fillial_id === house.fillial_id).fillial_name}
                      </td>
                      <td style={style.td}>
                            {house.house_rooms}
                      </td>
                      <td style={style.td}>
                            {house.house_price}
                      </td>
                      <td style={style.td}>
                            {house.house_area}
                      </td>
                      </tr>
                    ))
                }
            </tbody>
          </table>
          </div>
        </div>
    );
}

export default Table;
