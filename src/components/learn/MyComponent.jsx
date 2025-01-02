// JSX
const MyComponent = () => {
    // const username = "thang";
    // const username = 25;
    // const username = true;
    // const username = null;
    // const username = undefined;
    const username = [1, 2, 3];
    // const username = {
    //     name: "thangtn8",
    //     age: 27
    // }

    return (
        <>
            <div>{JSON.stringify(username)} & hoidanit</div>
            <div>{console.log("ERIC")}</div>
            <div style={
                {
                    color: "red",
                    borderRadius: "10px"
                }
            }
            >child</div>
        </>
    );
}

export default MyComponent;