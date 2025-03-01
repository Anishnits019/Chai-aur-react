import React from 'react'
function Search() {
    const cases=[
    {name:"Headphones"},
    {name:"Mobile"},
    {name:"Charger"},
    {name:"Washing Machine"},
    {name:"Grocerries"}
    ]
    const [item,SearchItem]=useState('');
    const [foundItem,setFoundItem]=useState('');
    const result=cases.find((product)=>product.name===item)
    setFoundItem(result);       
  return (
    <>
       <input
        type="text"
        value={item}
        onChange={(e)=>(
            SearchItem(e.target.value)
        )}
       ></input>
       <div>
         <p>{foundItem}</p>
       </div>
    </>
  )
}

export default Search
