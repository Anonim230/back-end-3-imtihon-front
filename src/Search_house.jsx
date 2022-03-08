import React, { useRef, useState } from 'react';
import env from './env'

const SearchHouse = ({style, companies, houses, filter, refs}) => {
    const thead = useRef()
    const [ctable,setCtable] = useState([])
    function submit_form(e){
        e.preventDefault()
        let command = `${env.HOST}:${env.PORT}/get_credit?`
        if(refs.house_price.current)command += `value=${refs.house_price.current.value}`
        // console.log(e.target.children);
        fetch(command)
        .then(data => data.json()).then(value => {
            // thead.current.innerHTML = ''
    // calc.current.innerHTML = ''
    let t = []
    thead.current.style.display = ''
    // for(let j of Object.keys(value[0])){
    //     if(j.endsWith('id')) continue
    //     let th = document.createElement('th')
    //     th.textContent = j.replace('_',' ')
    //     thead.current.appendChild(th)
    // }
    for(let i of Object.keys(value)){
      // let td = document.createElement('td')
      // td.textContent = (value[i])
      // td.style = style.td
      // calc.current.appendChild(td)
      t.push((value[i]))
    }
    // console.log(t);
    setCtable(t)
    // console.log(e.currentTarget,value,);
    // console.log(value)
        })
    }
    let companies_list = []
    for(let i of companies){
        if(!(companies_list.find(data => data.company_id === i.company_id )))companies_list.push(i)
    }
    function filter_by_company(e){
        if(!e.target.value)return filter({companies:{default:true}})
        filter({companies:{[e.target.id]:e.target.value}})
        // console.log(e.target.value);
    }
    function filter_by_house(e){
        if(!e.target.value)return filter({houses:{default:true}})
        filter({houses:{[e.target.id]:e.target.value}})
        // console.log(e.target.value);
    }
    const [rooms, setRooms] = useState(0);
    return (
        <div>
            <form action="" onSubmit={submit_form}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                <label style={style.inline_label} htmlFor="company_name">Kompaniyani tanlang</label>
                <input ref={refs.company_name} style={style.inline_input} onChange={filter_by_company} type="text" id='company_name' list='company_list'/>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <label htmlFor="fillial_name" style={style.inline_label}>Fillialni tanlang</label>
                    <input ref={refs.fillial_name} type="text" style={style.inline_input} list='fillial_list' onChange={filter_by_company} id='fillial_name' />
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <label htmlFor="house_rooms" style={style.inline_label}>Xonalar soni({rooms})</label>
                    <input ref={refs.house_rooms} type="range" defaultValue={0} min={1} max={8} style={style.inline_input}  onChange={e =>setRooms(+e.target.value) || filter_by_house(e)} id='house_rooms' />
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <label htmlFor="house_price" style={style.inline_label}>Narxini kiriting</label>
                    <input ref={refs.house_price} type='number' style={style.inline_input} onChange={filter_by_house} defaultValue={0} id='house_price' />
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <label htmlFor="house_area" style={style.inline_label}>Maydonni kiriting</label>
                    <input ref={refs.house_area} type='number' style={style.inline_input} onChange={filter_by_house} defaultValue={1} id='house_area' />
                </div>
                <input style={style.input} type="submit" value="Qidirish" />
                  {/* Lists */}
                  <datalist id='company_list'>
                    {
                        companies_list.map(company => (
                            <option key={company.fillial_id} value={company.company_name}>{company.company_name}</option>
                        ))
                    }
                  </datalist>
                  <datalist id='fillial_list'>
                    {
                        companies_list.map(company => (
                            <option key={company.fillial_id} value={company.fillial_name}>{company.fillial_name}</option>
                        ))
                    }
                  </datalist>
            </form>
            <div style={style.table_div}>
                <table style={{display:'block'}}>
                <thead>
                    <tr ref={thead} style={{display:'none'}}>
                        <th>FIllial name</th>    
                        <th>Credit value</th>    
                        <th>Credit percent</th>    
                        <th>Mortgage duration</th>    
                        <th>Total sum</th>    
                    </tr>
                    </thead>
                <tbody>
                    {
                    ctable.map((t,i) => (
                        <tr key={i}>
                            <td style={style.td}>{t.bank_fillial_name}</td>
                            <td style={style.td}>{t.credit_value} $</td>
                            <td style={style.td}>{t.credit_percent}</td>
                            <td style={style.td}>{~~(t.credit_duration / 12) > 0 ?`${~~(t.credit_duration / 12)}yil` : ''} {(t.credit_duration % 12) > 0 ?`${(t.credit_duration % 12)}oy` : ''}</td>
                            <td style={style.td}>{t.total}$</td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchHouse;
