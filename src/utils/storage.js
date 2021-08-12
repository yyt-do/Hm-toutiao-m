const setItem = (name,value) =>{
    if(typeof value == 'object'){
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(name,value)
}
const getItem = name=>{
  const data = window.localStorage.getItem(name)
  // 判断data是否为JSON格式字符串
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
const removeItem = name => {
  window.localStorage.removeItem(name)
}
export {setItem,getItem,removeItem}