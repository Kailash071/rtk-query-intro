import {
    useGetTodosQuery,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useAddTodoMutation
} from "../api/apiSlice"
import { useState } from "react"

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ userId: 1, title: newTodo, completed: false })
        setNewTodo('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit} >
           <label htmlFor="new-todo" className="">Enter a new todo item</label>
           <div className="row justify-content-center g-1 mb-3">
            <div className="form-group col-5">
                <input
                    type="text"
                    id="new-todo"
                    className="form-control"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="btn btn-outline-success b-0 text-center col-1">
            <i className="bi bi-cloud-upload"></i>
            </button>
           </div>
        </form>


    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos.map(todo => { //JSON.stringify(todos)
            return (
                <article key={todo.id} className="row justify-content-center align-items-center g-1">
                    <div className="form-check col-4">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            className="form-check-input"
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label className="form-check-label" htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash col-1 btn b-0 text-danger" onClick={() => deleteTodo({ id: todo.id })}>
                        <i className="bi bi-trash"></i>
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main className="container text-center mt-5">
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default TodoList