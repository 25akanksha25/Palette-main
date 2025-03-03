// import React, { useEffect, useState, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllEvents, deleteEventById } from "../../store/event/eventSlice";
// import { useTable, useSortBy, usePagination, useFilters } from "react-table";
// import { Link } from "react-router-dom";
// import { MdDeleteForever } from "react-icons/md";
// import { FaCaretUp, FaCaretDown, FaCaretRight, FaCaretLeft, FaEye } from "react-icons/fa";

// const AllEvents = () => {
//   const dispatch = useDispatch();
//   const [filterInput, setFilterInput] = useState("");
//   const [filterField, setFilterField] = useState("title");
//   const { events } = useSelector((state) => state.event);

//   useEffect(() => {
//     dispatch(getAllEvents());
//   }, [dispatch]);

//   const handleDeleteEvent = (id) => {
//     dispatch(deleteEventById(id)).then(() => {
//       dispatch(getAllEvents());
//     });
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Event Image",
//         accessor: "eventImage",
//         Cell: ({ value }) => (
//           <img src={value} alt="Event" style={{ width: "50px", height: "50px" }} />
//         ),
//       },
//       {
//         Header: "Event Name",
//         accessor: "title",
//       },
//       {
//         Header: "Date",
//         accessor: "startDate",
//         Cell: ({ value }) => new Date(value).toLocaleDateString(),
//       },
//       {
//         Header: "Location",
//         accessor: "location",
//         Cell: ({ value }) => value?.name || "---",
//       },
//       {
//         Header: "Seller",
//         accessor: "seller",
//         Cell: ({ value }) => value?.fullName || "---",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <span className={`py-1 px-2 border capitalize rounded-lg ${value === "upcoming"
//               ? "text-blue-600 border-blue-600"
//               : value === "completed"
//               ? "text-green-700 border-green-700"
//               : "text-orange-600 border-orange-600"
//             }`}
//           >
//             {value}
//           </span>
//         ),
//       },
//       {
//         Header: "Actions",
//         accessor: "_id",
//         Cell: ({ row: { original } }) => (
//           <div className="flex gap-2">
//             <Link to={`/admin/event/view/${original._id}`}>
//               <FaEye size={38} className="text-black hover:text-white hover:bg-black border border-black px-2 py-[5px] rounded-lg transition-all" />
//             </Link>
//             <button onClick={() => handleDeleteEvent(original._id)}>
//               <MdDeleteForever size={38} className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-[6px] py-[3px] rounded-lg transition-all" />
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const data = useMemo(
//     () =>
//       Array.isArray(events)
//         ? events.map((event) => ({
//             eventImage: event.eventImage,
//             title: event.title,
//             startDate: event.startDate,
//             location: event.location,
//             seller: event.seller,
//             status: event.status,
//             _id: event._id,
//           }))
//         : [],
//     [events]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     nextPage,
//     previousPage,
//     canPreviousPage,
//     canNextPage,
//     state: { pageIndex, pageSize },
//     pageCount,
//     setFilter,
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageSize: 8 },
//     },
//     useFilters,
//     useSortBy,
//     usePagination
//   );

//   const handleFilterChange = (e) => {
//     const value = e.target.value || undefined;
//     setFilter(filterField, value);
//     setFilterInput(value);
//   };

//   return (
//     <div className="px-7 py-4 w-full bg-gray-300 text-black rounded-2xl border border-gray-700">
//       <h2 className="text-black font-bold text-3xl border-b border-gray-700 pb-3 mb-5">
//         All Events
//       </h2>
//       <div className="flex flex-col md:flex-row gap-4">
//         <select
//           className="outline-none bg-gray-100 rounded-xl px-3 py-3 cursor-pointer border border-black focus:border-black transition-all"
//           value={filterField}
//           onChange={(e) => setFilterField(e.target.value)}
//         >
//           <option value="title">Select a Field</option>
//           <option value="title">Event Name</option>
//           <option value="startDate">Date</option>
//           <option value="location">Location</option>
//           <option value="seller">Seller</option>
//           <option value="status">Status</option>
//         </select>
//         <input
//           className="outline-none w-full md:w-[200px] bg-gray-100 rounded-xl px-3 py-3 border border-black focus:border-black transition-all"
//           value={filterInput}
//           onChange={handleFilterChange}
//           placeholder="Search Event Name"
//         />
//       </div>
//       <div className="overflow-auto px-4 rounded-2xl border border-gray-700 mt-4 max-h-[500px]">
//         <table {...getTableProps()} className="w-full text-left border-separate border-spacing-x-0 border-spacing-y-4">
//           {/* <thead className="sticky top-0 bg-gray-200 text-black">
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     key={column.id}
//                     className="p-2 pr-5 select-none border-b border-gray-400 hover:bg-gray-300 transition-all"
//                   >
//                     <div className="flex gap-4">
//                       {column.render("Header")}
//                       <span>
//                         {column.isSorted ? (
//                           column.isSortedDesc ? <FaCaretDown size={18} /> : <FaCaretUp size={18} />
//                         ) : null}
//                       </span>
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead> */}


//           <thead className="sticky top-0 bg-gray-200 text-black">
//   {headerGroups.map((headerGroup, index) => ( // Add key here
//     <tr {...headerGroup.getHeaderGroupProps()} key={index}> 
//       {headerGroup.headers.map((column) => (
//         <th
//           {...column.getHeaderProps(column.getSortByToggleProps())}
//           key={column.id} // Ensure each th has a unique key
//           className="p-2 pr-5 select-none border-b border-gray-400 hover:bg-gray-300 transition-all"
//         >
//           <div className="flex gap-4">
//             {column.render("Header")}
//             <span>
//               {column.isSorted ? (
//                 column.isSortedDesc ? <FaCaretDown size={18} /> : <FaCaretUp size={18} />
//               ) : null}
//             </span>
//           </div>
//         </th>
//       ))}
//     </tr>
//   ))}
// </thead>


//           <tbody {...getTableBodyProps()}>
//             {page.length > 0 ? (
//               page.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()} key={row.id} className="border">
//                     {row.cells.map((cell) => (
//                       <td {...cell.getCellProps()} key={cell.column.id} className="pl-2 pr-5 border-b border-black pb-2">
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={columns.length} className="text-center py-4">
//                   No events found
//                 </td>
//               </tr>
//             )}
//           </tbody>

          
//         </table>
//       </div>
//       <div className="flex flex-col md:flex-row justify-center gap-4 my-4 items-center">
//         <button onClick={previousPage} disabled={!canPreviousPage} className="bg-[#00A3FF] text-white px-3 py-2 rounded-lg">
//           <FaCaretLeft size={18} />
//         </button>
//         <span className="text-black">
//           Page {pageIndex + 1} of {pageCount}
//         </span>
//         <button onClick={nextPage} disabled={!canNextPage} className="bg-[#00A3FF] text-white px-3 py-2 rounded-lg">
//           <FaCaretRight size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllEvents;










import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents, deleteEventById } from "../../store/event/eventSlice";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaCaretUp, FaCaretDown, FaCaretRight, FaCaretLeft, FaEye } from "react-icons/fa";

const AllEvents = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [filterField, setFilterField] = useState("title");
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleDeleteEvent = (id) => {
    dispatch(deleteEventById(id)).then(() => {
      dispatch(getAllEvents());
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Event Image",
        accessor: "eventImage",
        Cell: ({ value }) => (
          <img src={value} alt="Event" style={{ width: "50px", height: "50px" }} />
        ),
      },
      {
        Header: "Event Name",
        accessor: "title",
      },
      {
        Header: "Date",
        accessor: "startDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Location",
        accessor: "location",
        Cell: ({ value }) => value?.name || "---",
      },
      {
        Header: "Seller",
        accessor: "seller",
        Cell: ({ value }) => value?.fullName || "---",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row: { original } }) => {
          const currentDate = new Date();
          const startDate = new Date(original.startDate);
          const endDate = original.endDate ? new Date(original.endDate) : null;
          
          let status = "Upcoming"; // Default status

          if (endDate && currentDate > endDate) {
            status = "Ended";
          } else if (currentDate >= startDate && (!endDate || currentDate <= endDate)) {
            status = "Live";
          }

          console.log(`Event: ${original.title}, Start: ${startDate}, End: ${endDate}, Current: ${currentDate}, Status: ${status}`);

          return (
            <span
              className={`py-1 px-2 border capitalize rounded-lg ${
                status === "Upcoming"
                  ? "text-blue-600 border-blue-600"
                  : status === "Live"
                  ? "text-green-700 border-green-700"
                  : "text-orange-600 border-orange-600"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ row: { original } }) => (
          <div className="flex gap-2">
            <Link to={`/admin/event/view/${original._id}`}>
              <FaEye size={38} className="text-black hover:text-white hover:bg-black border border-black px-2 py-[5px] rounded-lg transition-all" />
            </Link>
            <button onClick={() => handleDeleteEvent(original._id)}>
              <MdDeleteForever size={38} className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-[6px] py-[3px] rounded-lg transition-all" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      Array.isArray(events)
        ? events.map((event) => ({
            eventImage: event.eventImage,
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate || null, // Ensure endDate exists
            location: event.location,
            seller: event.seller,
            _id: event._id,
          }))
        : [],
    [events]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize },
    pageCount,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 8 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(filterField, value);
    setFilterInput(value);
  };

  return (
    <div className="px-7 py-4 w-full bg-gray-300 text-black rounded-2xl border border-gray-700">
      <h2 className="text-black font-bold text-3xl border-b border-gray-700 pb-3 mb-5">
        All Events
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        <select
          className="outline-none bg-gray-100 rounded-xl px-3 py-3 cursor-pointer border border-black focus:border-black transition-all"
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
        >
          <option value="title">Select a Field</option>
          <option value="title">Event Name</option>
          <option value="startDate">Date</option>
          <option value="location">Location</option>
          <option value="seller">Seller</option>
          <option value="status">Status</option>
        </select>
        <input
          className="outline-none w-full md:w-[200px] bg-gray-100 rounded-xl px-3 py-3 border border-black focus:border-black transition-all"
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Search Event Name"
        />
      </div>
      <div className="overflow-auto px-4 rounded-2xl border border-gray-700 mt-4 max-h-[500px]">
        <table {...getTableProps()} className="w-full text-left border-separate border-spacing-x-0 border-spacing-y-4">
          <thead className="sticky top-0 bg-gray-200 text-black">
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    className="p-2 pr-5 select-none border-b border-gray-400 hover:bg-gray-300 transition-all"
                  >
                    <div className="flex gap-4">
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? <FaCaretDown size={18} /> : <FaCaretUp size={18} />
                        ) : null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id} className="border">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.column.id} className="pl-2 pr-5 border-b border-black pb-2">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEvents;
