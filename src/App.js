import { useState, useEffect } from "react"

////// FAQ:  //////////////////////////////////////////////////
//
// is writing everything in a single file bad?
//   yes
//
// do I care?
//   given that I don't plan on continuing development: no
//
// can you continue development?
//   sure!
//
///////////////////////////////////////////////////////////////

const input_container_style = {
  "marginBottom": "8px",
  "height": "32px",
  "display": "flex",
  "alignItems": "center",
}

const label_style = {
  "minWidth": "132px",
  "display": "flex",
  "justifyContent": "right",
  "marginRight": "8px",
}

function InputBox(props) {
  return (
    <div style={input_container_style}>
      <div style={label_style}>{props.label}</div>
      <input
        value={props.value}
        onChange={(e) => props.handleChange(e)}
      />
    </div>
  );
}

function App() {
  const [state, setState] = useState({
    "start": "0,-100,4,1,0,100,1,0",
    "end": "100,-100,4,1,0,100,1,0",
    "v0": "1.00",
    "vf": "2.00",
    "off": "-3",
    "num_points": "1",
  });
  const [output, setOutput] = useState("");

  useEffect(() => {
    let start = state.start.split(",");
    let end = state.end.split(",");
    let misc = "";
    for (let i = 2; i <= 7; i++) {
      if (i !== 6) {
        misc += "," + start[i];
        if (start[i] !== end[i]) {
          setOutput("incompatible :(");
          return;
        }
      } else {
        misc += ",0"
      }
    }

    let steps = parseInt(state.num_points) + 1;
    let start_time = parseInt(start[0]);
    let end_time = parseInt(end[0]);

    let accel = Math.pow(parseFloat(state.vf) / parseFloat(state.v0), 1 / steps)
    let v = -100 / accel;

    let dt = (end_time - start_time) / steps;
    start[0] = parseInt(start[0]);
    let inherited = parseInt(start[6]);
    if (inherited === 0) {
      start[0] += parseInt(state.off);
    }
    let out_string = start.join(",");
    let current_time = parseInt(start[0]);
    if (inherited === 1) {
      current_time += parseInt(state.off);
    }
    for (let i = 0; i < steps; i++) {
      current_time += dt;
      let rounded = Math.round(current_time);
      out_string += "\n" + rounded.toString() + "," + v + misc;
      v /= accel
    }

    setOutput(out_string);
  }, [state])

  return (
    <div>
      <InputBox
        label={"first timing point:"}
        value={state.start}
        handleChange={(e) => {
          setState(prevState => ({
            ...prevState,
            "start": e.target.value
          }));
        }}
      />
      <InputBox
        label={"last timing point:"}
        value={state.end}
        handleChange={(e) => {
          setState(prevState => ({
            ...prevState,
            "end": e.target.value
          }));
        }}
      />
      <InputBox
        label={"starting speed:"}
        value={state.v0}
        handleChange={(e) => {
          setState(prevState => ({
            ...prevState,
            "v0": e.target.value
          }));
        }}
      />
      <InputBox
        label={"ending speed:"}
        value={state.vf}
        handleChange={(e) => {
          setState(prevState => ({
            ...prevState,
            "vf": e.target.value
          }));
        }}
      />
      <InputBox
        label={"# of points between:"}
        value={state.num_points}
        handleChange={(e) => {
          setState(prevState => ({
            ...prevState,
            "num_points": e.target.value
          }));
        }}
      />
      <InputBox
        label={"offset:"}
        value={state.off}
        handleChange={(e) => {
          setState(prevState => ({
            ...prevState,
            "offz": e.target.value
          }));
        }}
      />
      <textarea value={output} style={{"height": "128px", "overflowY": "scroll", "width": "290px", "resize": "none"}} readOnly />
      <div>
        <br/>
        tutorial: <a href="https://github.com/seenry/osvgen">https://github.com/seenry/osvgen</a>
      </div>
    </div>
  );
}

export default App;
