import { RiUserAddFill } from "react-icons/ri";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { FaUsers, FaUserPlus } from "react-icons/fa6";
import {
  FaCaretUp,
  FaCaretDown,
  FaCaretRight,
  FaCaretLeft,
  FaEye,
  FaRegEdit,
  FaPlus,
  FaCartPlus,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  deleteUserById,
  getTopSellers,
} from "../../store/user/userSlice";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import { Link } from "react-router-dom";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Line, Doughnut } from "react-chartjs-2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { allUser, topSellers, reset } = useSelector((state) => state.user);
  const [filterInput, setFilterInput] = useState("");
  const [filterField, setFilterField] = useState("name");
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(filterField, value); // Use the selected field
    setFilterInput(value);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUserById(id)).then(() => {
      dispatch(getAllUsers());
    });
  };
  //console.log(topSellers, "top sellers ,,,");
  const columns = React.useMemo(
    () => [
      {
        Header: "Picture",
        accessor: "profilePicture",
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
        accessor: "fullName",
      },
      {
        Header: "Type",
        accessor: "userType",
        Cell: ({ value }) => (
          <span
            className="capitalize"
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Verified",
        accessor: "paymentVerified",
        Cell: ({ value }) => (
          <span
            className={`py-1 px-2 border  rounded-lg ${
              value === "Unverified"
                ? "text-red-600 border-red-600"
                : value === "Verified"
                  ? "text-green-500 border-green-500"
                  : ""
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <div className="flex gap-2">
            <Link to={`/admin/users/profile/${original.actions}`}>
              <FaEye
                size={38}
                className="inline mt-[-3px] text-black hover:text-white hover:bg-black rounded-lg border-2 border-black  px-2 py-[5px] transition-all"
              />
            </Link>
            <button onClick={() => handleDeleteUser(original.actions)}>
              <MdDeleteForever
                size={38}
                className=" inline mt-[-3px] text-red-600 hover:text-white hover:bg-red-600 rounded-lg border-2 border-red-600  px-[6px] py-[3px] transition-all"
              />
            </button>
            <Link to={`/admin/users/edit/${original.actions}`}>
              <FaRegEdit
                size={38}
                className="inline mt-[-3px] text-blue-500 hover:text-white hover:bg-blue-500 rounded-lg border-2 border-blue-500  px-2 py-[5px] transition-all"
              />
            </Link>

            {/* ...other buttons */}
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getTopSellers());
  }, []);

  const data = React.useMemo(
    () =>
      Array.isArray(allUser?.data)
        ? allUser.data.map((user) => ({
            profilePicture: user.profilePicture,
            fullName: user.fullName,
            userType: user.userType,
            paymentVerified:
              user.paymentVerified === false ? "Unverified" : "Verified",
            actions: user._id,
          }))
        : [],
    [allUser]
  );
  //console.log("data", data);

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

  const totalBuyers = allUser?.data?.filter(
    (user) => user.userType === "user"
  ).length;
  const totalVerifiedUsers = allUser?.data?.filter(
    (user) => user.paymentVerified === true
  ).length;
  const totalSellers = allUser?.data?.filter(
    (user) => user.userType === "seller"
  ).length;
  // const totalAdmins=allUser?.data?.filter((user) => user.userType === "admin").length;

  const userCreatedAt = new Array(12).fill(0);
  allUser?.data?.forEach((user) => {
    const month = new Date(user.createdAt).getMonth();
    userCreatedAt[month] = userCreatedAt[month] + 1;
  });

  //console.log("userCreatedAt", userCreatedAt);

 


  return (
    
    <div className="px-7 py-4 w-full bg-gray-300 border border-gray-700 text-black rounded-2xl">
      <h2 className=" text-black italic font-bold text-4xl border-b border-gray-800 pb-3 mb-5 ">
        Users Information
      </h2>
      <div className="text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 [&>div]:border [&>div]:rounded-lg [&>div]:bg-gray-100 [&>div]:border-black [&>div]:p-5 [&>div]:transition-all  ">
        <div className="flex justify-between">
          <div>
            <div className="text-4xl text-black font-bold">
              {allUser?.data?.length}
            </div>
            <h1 className="md:text-lg text-black font-semibold ">All Users</h1>
          </div>
          <FaUsers size={36} className="bg-[#daa520] rounded-full p-2" />
        </div>
        <div className="flex justify-between">
          <div>
            <span className="text-4xl text-black font-bold">
              {totalSellers}
            </span>
            <div className="md:text-lg text-black font-semibold ">Sellers</div>
          </div>
          <FaShop
            size={36}
            strokeWidth="1"
            className="bg-[#a45a52]  rounded-full p-2"
          />
        </div>
        <div className="flex justify-between">
          <div>
            <span className="text-4xl text-black font-bold">
              {
                allUser?.data?.filter(
                  (user) =>
                    new Date(user.createdAt).getTime() >
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                ).length
              }
            </span>
            <div className="md:text-lg text-black font-semibold  ">
              New Users
              <p className="text-[10px] text-black mt-[-7px] ">
                within this week
              </p>
            </div>
          </div>
          <RiUserAddFill size={36} className="bg-[#5d8aa8] rounded-full p-2" />
        </div>
        <div className="flex justify-between">
          <div>
            <span className="text-4xl text-black font-bold">
              {totalBuyers}
            </span>
            <div className="md:text-lg text-black font-semibold  ">Buyers</div>
          </div>
          <FaCartPlus size={36} className="bg-[#d98986] rounded-full p-2" />
        </div>
        <div className="flex justify-between">
          <div>
            <span className="text-4xl text-black font-bold">
              {totalVerifiedUsers}
            </span>
            <div className="md:text-lg text-black font-semibold  ">Verified Users</div>
          </div>
          <RiVerifiedBadgeFill
            size={36}
            className="bg-[#50c878] rounded-full p-1"
          />
        </div>
      </div>
      <div className=" mt-10 flex flex-col gap-4 lg:flex-row">
        <div className="bg-gray-100 border w-full lg:max-w-[400px] border-black rounded-lg flex justify-center items-center py-4">
          <div className="max-w-[400px] w-full ">
            <Doughnut
              data={{
                labels: ["Sellers", "Buyers"],
                datasets: [
                  {
                    data: [totalSellers, totalBuyers],
                    backgroundColor: [
                      "#a45a52",
                      "#d98986",
                      "#01796f",
                    ],
                    borderColor: "black", // Adds a black border around each segment
                    borderWidth: 0.5,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      color: "black",
                      font:{
                        size: 16,
                        weight: "bold",
                      }
                    },
                  },
                  title: {
                    display: true,
                    text: "User Base",
                    color: "black",
                    font:{
                      size: 24,
                      weight: "bold",
                    }
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex w-full justify-center items-center bg-gray-100 border border-black rounded-lg  py-4">
          <div className="w-full max-w-[900px]">
            <Line
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    label: "Total Users",
                    data: userCreatedAt, // replace this with your data
                    fill: false,
                    backgroundColor: "#7e191b",
                    borderColor: "#7e191b",
                    font:{
                      size: 18,
                    }
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 2,
                      color: "black",
                    },
                  },
                  x: {
                    ticks: {
                      color: "black",
                    },
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: "black",
                      font:{
                        size: 18,
                        weight: "bold",
                      }
                    },
                  },
                  title: {
                    display: true,
                    text: "User Growth Over Time",
                    color: "black",
                    font:{
                      size: 24,
                      weight: "bold",
                    }
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <>
        <div className="mt-12 ">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              className="outline-none bg-gray-100 placeholder:text-black rounded-xl px-3 py-3 cursor-pointer border border-black  transition-all"
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
            >
              <option value="">Select a field</option>
              <option value="fullName">Name</option>
              <option value="userType">Type</option>
              <option value="paymentVerified">Verified</option>
            </select>
            <input
              className="outline-none w-full md:w-[200px] bg-gray-100 placeholder:text-black rounded-xl px-3 py-3 border border-black transition-all"
              value={filterInput}
              onChange={handleFilterChange}
              placeholder={"Search name"}
            />
          </div>
          <div className="overflow-auto rounded-2xl border border-black mt-4 max-h-[500px]">
            <table
              {...getTableProps()}
              className="text-left blackspace-nowrap px-3 w-full border-separate border-spacing-x-0 border-spacing-y-4 "
            >
              <thead className="sticky top-0 bg-gray-100 table-header-group">
                {headerGroups.map((headerGroup, headerGroupIndex) => (
                  <tr
                    className="table-row"
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroupIndex}
                  >
                    {headerGroup.headers.map((column, i) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={i}
                        className="p-2 pr-5 select-none first:rounded-l-lg last:rounded-r-lg hover:bg-gray-200  transition-all"
                      >
                        <div className="flex gap-4 ml-12 text-black">
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
                {page.map((row, i) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  return (
                    <tr {...rowProps} key={i} className="border text-black">
                      {row.cells.map((cell, j) => {
                        const cellProps = cell.getCellProps();
                        return (
                          <td
                            className="pl-12 text-lg pr-5 border-b border-black pb-2"
                            {...cellProps}
                            key={`${i}-${j}`}
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
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 my-4 items-center md:button:px-4 md:button:py-2 button:px-2 button:py-1 button:rounded-lg  ">
          <div className="flex justify-center items-center gap-4">
            <button
              className={`bg-black text-white transition-all ${
                pageIndex === 0 ? "bg-black text-white" : ""
              }`}
              onClick={() => gotoPage(0)}
              disabled={pageIndex === 0 ? true : false}
            >
              <MdSkipPrevious size={18} />{" "}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`bg-black text-white transition-all ${
                !canPreviousPage ? "bg-black text-white" : ""
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
              className={`bg-black text-white transition-all ${
                !canNextPage ? "bg-black text-white" : ""
              }`}
            >
              <FaCaretRight size={18} />
            </button>
            <button
              className={`bg-black text-white transition-all ${
                pageIndex === pageCount - 1
                  ? "bg-black text-white"
                  : ""
              }`}
              onClick={() => gotoPage(pageCount - 1)}
            >
              <MdSkipNext size={18} />{" "}
            </button>
          </div>

          <select
            className="outline-none hidden md:block bg-gray-100 placeholder:text-black rounded-xl px-4 py-3 cursor-pointer border border-border-info-color  transition-all "
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
      </>
      
      {/* <div className="text-black mt-10">
        <h2 className=" text-black font-bold text-xl border-b border-border-info-color pb-3 mb-5 ">
          Top Sellers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 flex-col gap-4 bg-theme-bg2 rounded-lg  p-4">
          {topSellers?.map((seller) => (
            <div
              className="w-full bg-theme-bg-light p-4 rounded-lg"
              key={seller._id}
            >
              <img
                className="w-[50px] md:w-full rounded-lg "
                src={seller.profilePicture}
                alt={seller.fullName}
              />
              <h2 className="text-lg font-semibold my-2 ">{seller.fullName}</h2>
              <div className="[&>*]:border-b [&>*]:border-border-info-color ">
                <p>
                  Total Auctions:{" "}
                  <span className="text-black">
                    {seller.totalAuctions}
                  </span>
                </p>
                <p>
                  Successful:{" "}
                  <span className="text-black">
                    {seller.paidAuctions}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default AllUsers;
