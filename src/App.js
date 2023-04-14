import "./App.css";
import { useState } from "react";
import { EditModal } from "./Components/modal";

export default function App() {
  // console.log("hello")
  return (
    <div className="App">
      <Container />
      <EditModal />
    </div>
  );
}

let taskskey = 0;

function Container() {
  const [tasks, setTasks] = useState([[0, "Tasks will be added here"]]);
  // const [taskskey,setTaskskey]=useState(0);//now using global variable
  const [isStart, setStart] = useState(true);
  const [input, setInput] = useState("");

  function addKey() {
    // setTaskskey(taskskey+1);
    taskskey++;
  }
  function addTask() {
    let task = input;
    if (task === "") {
      return;
    }
    if (isStart) {
      setTasks([[taskskey, task]]);
      setStart(false);
    } else {
      setTasks([...tasks, [taskskey, task]]);
    }
    addKey();
    setInput("");
  }
  function removeTask(key) {
    setTasks(tasks.filter((val) => val[0] !== key));
  }

  return (
    <div className="my_container">
      <h2>Awesome Todo List</h2>
      <Adder
        setInput={setInput}
        input={input}
        onAdd={(task) => {
          console.log("new task added");
          addTask();
        }}
      />
      <List tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

function Adder(props) {
  return (
    <div className="my_adder">
      <input
        onChange={(e) => {
          props.setInput(e.target.value);
        }}
        value={props.input}
        className="add_task"
        placeholder="What do you need to do today?"
      ></input>
      <Button text="Add" onAdd={props.onAdd} styleClass="adderbtn" />
    </div>
  );
}

function List(props) {
  let list = props.tasks.map((task) => (
    <ListItem key={task[0]} text={task[1]} removeTask={props.removeTask} id={task[0]} />
  ));

  return list;
}

function ListItem(props) {
  const [cut, setCut] = useState(false);

  return (
    <div className="my_item">
      <div className="flex_left">
        <input
          type="checkbox"
          id="scales"
          name="scales"
          style={{
            margin: "0 10px 0 0",
          }}
          onChange={() => {
            setCut(!cut);
          }}
        ></input>
        <label
          htmlFor="scales"
          style={{
            textDecoration: cut ? "line-through" : "inherit",
          }}
        >
          {props.text}
        </label>
      </div>
      <svg
        onClick={() => props.removeTask(props.id)}
        className="flex_right"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        height="15px"
      >
        <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
      </svg>
    </div>
  );
}

function Button(props) {
  return (
    <button className={`my_btn ${props.styleClass}`} onClick={props.onAdd}>
      {props.text}
    </button>
  );
}
