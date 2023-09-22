

async function getallTodos(){
    await fetch('https://playground.4geeks.com/apis/fake/todos/user/bhooker', {
       method: "POST",
       body: JSON.stringify([]),
       headers: {
         "Content-Type": "application/json"
       },
})
   const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/bhooker', {
       method: "GET"
       ,
       headers: {
         "Content-Type": "application/json"
       }
})
const data = await response.json()
console.log(data);

return data;

}
async function updateTodos(abc) {

  const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/bhooker', {
       method: "PUT",
       body: JSON.stringify(abc),
       headers: {
         "Content-Type": "application/json"
       },
})
console.log(response)

}

export {getallTodos, updateTodos};