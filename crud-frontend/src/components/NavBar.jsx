export default function NavBar({onOpen, onSearch}) {
    const handleSearchChange = (event) => {
        // event = letter 'e' that is being typed in and searched
        onSearch(event.target.value); // Call the onSearch callback with the input value
        // onSearch means whatever entered in search bar, no need to press 'Enter'
    };
    
    return (
        <>
            <div className="navbar bg-base-100 p-4">
            <div className="navbar-start">
                {/* -- drop down <div></div> */}
                {/* ++ logo */}
                <a className="btn btn-ghost text-xl">Client Manager Dashboard</a>
                {/* ++ search input */}
                
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    {/* w-48 */}
                    <input type="text" placeholder="Search" onChange={handleSearchChange} className=" input input-bordered w-48 md:w-auto"  />
                </div>
                
            </div>
            <div className="navbar-end">
                {/* -- svg burrnos divs */}
                {/* ++ add modal on click button  */}

                <button onClick={onOpen} className="btn btn-primary">Add Client</button>

            </div>
            </div>
        </>
    )
}