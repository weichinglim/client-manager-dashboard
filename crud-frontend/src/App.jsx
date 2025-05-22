
import './App.css'
import NavBar from './components/Navbar'
import TableList from './components/Tablelist'
import ModalForm from './components/ModalForm'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchClients = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/clients')
        setTableData(response.data); // Set the fetched data
    } catch (err) {
        setError(err.message);
    }
  } ;

  useEffect( () => {
    fetchClients(); // Call function
  }, []); // Else return empty arr if line 9-17 doesnt happen


  const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        console.log('Client added:', response.data); //Log the response
        setTableData((prevData) => [...prevData, response.data]);

      } catch (error) {
        console.error('Error adding client:', error); // Log any errors
      }
      console.log('modal mode Add');

    } else {
      //console.log('modal mode Edit');
      console.log('Updating client with ID:', clientData.id); //Log the ID being updated
        try {
            const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
            console.log('Client updated:', response.data);
            setTableData((prevData) => 
              prevData.map((client) => (client.id === clientData.id ? response.data : client))
            );
        } catch (error) {
            console.error('Error updating client:', error);
        }
    }
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      <TableList setTableData={setTableData} tableData={tableData} handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm isOpen={isOpen} onSubmit={handleSubmit}
      mode={modalMode} onClose={() => setIsOpen(false)} 
      clientData={clientData} />
    </>
  )
}

export default App
