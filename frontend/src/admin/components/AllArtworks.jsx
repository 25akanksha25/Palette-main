import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../store/user/userSlice";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { Link } from "react-router-dom";
import {
  deleteArtworkById,
  getAllArtworks,
} from "../../store/artwork/artworkSlice";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import {
  FaCaretUp,
  FaCaretDown,
  FaCaretRight,
  FaCaretLeft,
  FaEye,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const AllArtworks = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [filterField, setFilterField] = useState("name");
  const { artwork, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.artwork
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(filterField, value); // Use the selected field
    setFilterInput(value);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteArtworkById(id)).then(() => {
      dispatch(getAllArtworks());
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Picture",
        accessor: "picture",
        Cell: ({ value }) => (
          <img
            src={value}
            alt="Profile"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Seller",
        accessor: "seller",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`py-1 px-2 border capitalize rounded-lg ${
              value === "available"
                ? "text-orange-600 border-orange-600"
                : value === "sold"
                ? "text-green-700 border-green-700"
                : ""}`
            }
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Payment Status",
        accessor: "paymentStatus",
        Cell: ({ value, row: { original } }) => (
          <span className={original.statusClass}>{value}</span>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <div className="flex gap-2">
            <Link to={`/admin/artwork/view/${original.actions}`}>
              <FaEye
                size={38}
                className="inline mt-[-3px] text-black hover:text-white hover:bg-black rounded-lg border border-black  px-2 py-[5px] transition-all"
              />
            </Link>
            <button onClick={() => handleDeleteUser(original.actions)}>
              <MdDeleteForever
                size={38}
                className=" inline mt-[-3px] text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-600  px-[6px] py-[3px] transition-all"
              />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllArtworks());
  }, [dispatch]);

  const data = useMemo(
    () =>
      Array.isArray(artwork)
        ? artwork.map((art) => {
            // If the artwork is sold, set payment status to "Paid"
            const paymentStatus =
              art?.status === "sold" || art?.paid === true ? "Paid" : "UnPaid";
  
            // Define payment status classes based on payment status
            const paymentStatusClass =
              paymentStatus === "Paid"
                ? "text-green-600 px-2 py-1 border border-green-600 rounded-full"
                : "text-red-600 px-2 py-1 border border-red-600 rounded-full";
  
            // Define artwork status class (based on availability)
            const statusClass =
              art?.status === "available"
                ? "text-orange-600 px-2 py-1 border border-orange-600 rounded-full"
                : art?.status === "sold"
                ? "text-green-700 px-2 py-1 border border-green-700 rounded-full"
                : "";
  
            return {
              picture: art?.image,
              name: art?.name,
              category: art?.category?.name || "---",
              seller: art?.seller?.fullName || "---",
              location: art?.location?.name,
              status: art?.status,
              price: art?.price,
              paymentStatus: paymentStatus,
              paymentStatusClass: paymentStatusClass, // Add payment status class
              statusClass: statusClass,
              actions: art?._id,
            };
          })
        : [],
    [artwork]
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
    gotoPage,
    setPageSize,
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

  return (
    <>
      <div className="px-7 py-4 w-full bg-gray-300 text-black rounded-2xl border border-gray-700">
        <h2 className=" text-black font-bold text-3xl border-b border-gray-700 pb-3 mb-5 ">
          All Artworks
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="outline-none bg-gray-100 rounded-xl px-3 py-3 cursor-pointer border border-border-info-color focus:border-black  transition-all"
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
          >
            <option value="name">Select a Field</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="seller">Seller</option>
            <option value="location">Location</option>
            <option value="status">Status</option>
            <option value="price">Price</option>
            <option value="paymentStatus">Payment Status</option>
          </select>
          <input
            className="outline-none w-full md:w-[200px] bg-gray-100 rounded-xl px-3 py-3 border border-black focus:border-black transition-all"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search Name"}
          />
        </div>
        <div className="overflow-auto px-4 rounded-2xl border border-gray-700 mt-4 max-h-[500px]">
          <table
            {...getTableProps()}
            className="text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4 "
          >
            <thead className="sticky top-0 bg-gray-200 table-header-group text-black">
              {headerGroups.map((headerGroup, headerGroupIndex) => (
                <tr
                  className="table-row"
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroupIndex}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={columnIndex}
                      className="p-2 pr-5 select-none first:rounded-l-lg last:rounded-r-lg border-b border-border-gray-400  hover:bg-gray-300  transition-all"
                    >
                      <div className="flex gap-4">
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaCaretDown size={24} className="mt-[-2px]" />
                            ) : (
                              <FaCaretUp size={24} />
                            )
                          ) : null}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="table-row-group" {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                const rowProps = row.getRowProps();
                return (
                  <tr
                    {...rowProps}
                    {...row.getRowProps()}
                    key={row.id}
                    className=" border "
                  >
                    {row.cells.map((cell, cellIndex) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={cellIndex}
                          className="pl-2 pr-5 border-b border-black pb-2"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 my-4 items-center md:button:px-4 md:button:py-2 button:px-2 button:py-1 button:rounded-lg  ">
          <div className="flex justify-center items-center gap-4">
            <button
              className={`bg-[#00A3FF] text-white transition-all ${
                pageIndex === 0 ? "bg-black" : ""
              }`}
              onClick={() => gotoPage(0)}
              disabled={pageIndex === 0 ? true : false}
            >
              <MdSkipPrevious size={18} />{" "}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`bg-[#00A3FF] text-white transition-all ${
                !canPreviousPage ? "bg-black" : ""
              }`}
            >
              <FaCaretLeft size={18} />
            </button>
            <span className="text-black">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageCount}{" "}
              </strong>
              {"  "}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`bg-[#00A3FF] text-white transition-all ${
                !canNextPage ? "bg-black" : ""
              }`}
            >
              <FaCaretRight size={18} />
            </button>
            <button
              className={`bg-[#00A3FF] text-white transition-all ${
                pageIndex === pageCount - 1
                  ? "bg-black"
                  : ""
              }`}
              onClick={() => gotoPage(pageCount - 1)}
            >
              <MdSkipNext size={18} />{" "}
            </button>
          </div>

          <select
            className="outline-none hidden md:block bg-gray-200 rounded-xl px-4 py-3 cursor-pointer border border-border-info-color focus:border-black  transition-all "
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[8, 12, 16, 20, 24, 28, 32, 36, 40].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default AllArtworks;