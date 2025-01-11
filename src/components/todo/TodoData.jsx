/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
const TodoData = (props) => {
    // console.log(">>> check props: ", props)
    const { todoList } = props;
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item`} key={item.id}>
                        <div>{item.name}</div>
                        <button>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoData;