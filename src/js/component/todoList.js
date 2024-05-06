async function getallTodos(){
  const response = await fetch('https://playground.4geeks.com/todo/users/bhooker', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  });
  const data = await response.json();
  console.log(data);
  return data.todos.map(todo => ({
      label: todo.label,
      done: todo.is_done,
      id: todo.id
  }));
}

async function createTodo(userName, todo) {
  const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          label: todo.label,
          is_done: todo.done
      })
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

async function updateTodo(todoId, todo) {
  const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          label: todo.label,
          is_done: todo.done
      })
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

async function deleteTodo(todoId) {
  const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
  });
  console.log(`Deleted Todo ID: ${todoId}`);
  return response.ok; 
}

async function clearAllTodos(userName) {
  // Retrieve all todos to clear them
  const todos = await getallTodos(userName);
  await Promise.all(todos.map(todo => deleteTodo(todo.id))); 
  console.log("All todos cleared.");
}

export { getallTodos, createTodo, updateTodo, deleteTodo, clearAllTodos };