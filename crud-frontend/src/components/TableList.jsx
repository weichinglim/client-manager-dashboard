import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TableList({handleOpen, searchTerm, tableData, setTableData}){
    // const [tableData, setTableData] = useState([]); Move to App.jsx
    const [error, setError] = useState(null);

    // Move to App.jsx
    // useEffect( () => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/api/clients')
    //             setTableData(response.data); // Set the fetched data
    //         } catch (err) {
    //             setError(err.message);
    //         }
    //     } ;
    //     // Remember to FETCH the data
    //     fetchData(); // Call function
    // } , []); // Else return empty arr if line 9-17 doesnt happen

    //Filter the tableData based on the searchTerm
    const filteredData = tableData.filter( client => // get all the clients available
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) || // then filter
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle Delete
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/clients/${id}`); //API call to delete client
                setTableData((prevData) => prevData.filter(client => client.id !== id)) // Update state
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        }
    };

    return(
        <>
            {error && <div className="alert alert-error">{error}</div>}
            <div className="overflow-x-auto">
                <table className="table mt-10">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Job</th>
                        <th>Rate</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody className="hover">
                    {/* row 1 */}
                    
                    {filteredData.map((client) => (
                        <tr key={client.id}>
                        <th>{client.id}</th>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.job}</td>
                        <td>{client.rate}</td>
                        <td>
                            <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary`: `btn-outline btn-primary`}`}>
                                {client.isactive ? `Active` : `Inactive`}

                            </button>
                        </td>
                        <td>
                            <button onClick={() => handleOpen('edit', client)} className={`btn btn-secondary`}>Update</button> {/* onClick={() => handleOpen('edit')} | onClick={onOpen} */}
                        </td>
                        <td>
                            <button className={`btn btn-accent`} onClick={() => handleDelete(client.id)} >Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


