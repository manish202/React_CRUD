import { useState } from "react";

function App(){
    let [data,updata] = useState([]);
    let [show,setShow] = useState(false);
    let [inp,setinp] = useState({val:"",ind:""});
    function add_data(e){
        e.preventDefault();
        var x = e.target.term.value.trim();
        x && updata((old) => [...old,x]);
        e.target.reset();
    }
    function update_data(e){
        e.preventDefault();
        let y = inp.val.trim();
        y && updata((old) => {
            old[inp.ind] = y;
            return old;
        });
        setinp({val:"",ind:""});
        setShow(false);
    }
    function edit(ind){
        setShow(true);
        setinp({val:data[ind],ind:ind});
    }
    function chinp(e){
        setinp((old) => {
            return {val:e.target.value,ind:old.ind}
        });
    }
    function del(ind){
        updata((old) => {
            return old.filter((val,index) => {
                return ind !== index;
            });
        });
    }
    function get_data(val,ind){
        return <tr key={ind}>
                <td>{ind}</td>
                <td>{val}</td>
                <td><button className="btn btn-success" onClick={() => {edit(ind)}}>edit</button></td>
                <td><button className="btn btn-danger" onClick={() => {del(ind)}}>delete</button></td>
            </tr>
    }
    return <div className="container box">
    <h1>react js todo list crud with bootstrap 5</h1>
    <nav className="navbar navbar-light bg-light">
        <div className="container">
            <form autoComplete="off" className="d-flex mb-2" onSubmit={add_data}>
                <input className="form-control me-2" name="term" type="search" placeholder="add data" />
                <button className="btn btn-outline-success" type="submit">add</button>
            </form>
            {show && <form autoComplete="off" className="d-flex" onSubmit={update_data}>
                <input className="form-control me-2" name="term" type="search" value={inp.val} onChange={chinp} placeholder="edit data" />
                <button className="btn btn-outline-success" type="submit">update</button>
            </form>}
        </div>
    </nav>
        <table className="table text-center table-hover text-capitalize">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {data.length !== 0 ? data.map(get_data):<tr><td colSpan="4">no records found</td></tr>}
            </tbody>
        </table>
    </div>
}
export default App;