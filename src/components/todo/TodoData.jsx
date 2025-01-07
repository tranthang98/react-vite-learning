const TodoData = (props) => {
    // console.log(">>> check props: ", props)
    const { name, age, data } = props;
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;
    return (
        <div className='todo-data'>
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
        </div>
    )
}

export default TodoData;