import { useState } from "react"

const TodoNew = (props) => {
    const [inputValue, setInputValue] = useState("")

    const { addNewTodo } = props

    // addNewTodo("Alan");
    const handleClick = () => {
        addNewTodo(inputValue);
        setInputValue("");
    }

    const handleOnChange = (name) => {
        setInputValue(name)
    }
    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
                value={inputValue}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
            <div>
                My text input is = {inputValue}
            </div>
        </div>
    )
}

export default TodoNew;