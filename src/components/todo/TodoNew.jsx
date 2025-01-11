import { useState } from "react"

const TodoNew = (props) => {
    console.log(">>> check point: ", props)

    const [inputValue, setInputValue] = useState("")

    const { addNewTodo } = props

    // addNewTodo("Alan");
    const handleClick = () => {
        console.log(">>> check valueInput: ", inputValue)
    }

    const handleOnChange = (name) => {
        setInputValue(name)
    }
    return (
        <div className='todo-new'>
            <input type="text"
                onChange={(event) => handleOnChange(event.target.value)}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
        </div>
    )
}

export default TodoNew;