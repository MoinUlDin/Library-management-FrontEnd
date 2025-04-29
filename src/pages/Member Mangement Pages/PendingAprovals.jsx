import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/childrens/FloatingMessage";
import MemberServices from "../../services/MemberServices";
import { FaUserCheck } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";

function PendingApprovals() {
  const pendingUserList = useSelector(
    (state) => state.member.pendingApprovalsList || null
  );
  const [loading, setLoading] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const hasSelection = selectionModel.length > 0;
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("List", pendingUserList);
    if (!pendingUserList) {
      setLoading(true);
    }

    console.log();
    MemberServices.getPendingApprovalsList(dispatch)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleApproveSingle = (id) => {
    setSendingRequest(true);
    MemberServices.setMemberApproved(id, dispatch)
      .then((res) => {
        console.log(res);
        setToastMessage(res.detail);
        setShowToast(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSendingRequest(false);
      });
  };
  const handleRejectSingle = (id) => {
    setSendingRequest(true);
    MemberServices.setMemberRejected(id, dispatch)
      .then((res) => {
        console.log(res);
        setToastMessage(res.detail);
        setShowToast(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSendingRequest(false);
      });
  };
  const handleApproveMember = () => {
    console.log("Approved actions clicked. SelectionModel", selectionModel);
    Promise.all(
      selectionModel.map((id) => MemberServices.setMemberApproved(id, dispatch))
    )
      .then(() => {
        setToastMessage("Selected members approved ✔️");
        setSelectionModel([]); // clear selection
      })
      .catch((err) => {
        console.error(err);
        setToastMessage("Error approving some members");
      });
  };

  const handleRejectMember = () => {
    Promise.all(
      selectionModel.map((id) => MemberServices.setMemberRejected(id, dispatch))
    )
      .then(() => {
        setToastMessage("Selected members rejected ❌");
        setSelectionModel([]);
      })
      .catch((err) => {
        console.error(err);
        setToastMessage("Error rejecting some members");
      });
  };
  //   {
  //     "id": 3, "username": "Moinuldin",
  //     "email": "moinuldinc@gmail.com",    "role": "MEMBER",
  //     "member_id": "MBR-0002", "is_verified": true,
  //     "first_name": "Moin",  "last_name": "Ul Din"
  // }
  //
  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 140,
      renderCell: (props) => {
        const val = props.row?.email || "-";
        return val;
      },
    },
    {
      field: "username",
      headerName: "User Name",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.username || "-";
        return val;
      },
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.first_name || "-";
        return val;
      },
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.last_name || "-";
        return val;
      },
    },

    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (props) => {
        const val = props.row?.role || "-";
        return val;
      },
    },
    {
      field: "member_id",
      headerName: "Member Id",
      width: 110,
      renderCell: (props) => {
        const val = props.row?.member_id || "-";
        return val;
      },
    },
    {
      field: "is_verified",
      headerName: "Verified",
      width: 110,
      renderCell: (props) => {
        const val = props.row?.is_verified || false;

        return val ? (
          <span className="h-full text-green-600 text-xl flex items-center justify-center">
            <FiThumbsUp />
          </span>
        ) : (
          <span className="h-full text-xl text-red-600 flex items-center justify-center ">
            <FiThumbsDown />
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <div className=" h-full">
            <div className="flex gap-4 items-center text-xl h-full">
              <Tooltip title="Approve Member" placement="top">
                <FaUserCheck
                  onClick={(e) => {
                    e.stopPropagation(); // <-- prevent row‐click
                    handleApproveSingle(params.row.id);
                  }}
                  className="ptr text-2xl hover:text-blue-600 text-blue-400"
                />
              </Tooltip>
              <Tooltip title="Reject Member" placement="top">
                <FaUserXmark
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRejectSingle(params.row.id);
                  }}
                  className="ptr text-2xl text-orange-600"
                />
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  const handleDisable = (id) => {
    MemberServices.ToggleMemberDisabled(id, dispatch)
      .then((res) => {
        const msg = res.is_active
          ? "Member has been enabled ✔"
          : "Member has been Disabled ❌";
        setToastMessage(msg);
        setShowToast(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-8">
      {/* Overlay Sending Reques */}
      {sendingRequest && (
        <div className="inset-0 fixed w-full h-screen bg-black/60  z-40 flex items-center justify-center">
          <div className="bg-white flex gap-4 p-8 z-50">
            <ImSpinner8 className="animate-spin text-4xl" />
            <span className="text-2xl ">Sending Request...</span>
          </div>
        </div>
      )}

      {/* Bulk Buttons */}
      <div className="px-1 my-6 overflow-x-auto relative">
        <div className="flex gap-3 absolute top-2 left-2 z-100">
          <button
            onClick={handleApproveMember}
            className="bg-blue-800 hover:bg-blue-700 px-6 py-2 ptr rounded text-gray-100"
          >
            Bulk Approved
          </button>
          <button className="bg-amber-600 hover:bg-amber-700 px-6 py-2 ptr rounded text-gray-100">
            Bulk Reject
          </button>
        </div>

        <DataGrid
          rows={pendingUserList}
          columns={columns}
          // loading={loading}
          rowHeight={60}
          headerHeight={50}
          disableRowSelectionOnClick
          showToolbar
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 50, { value: -1, label: "All" }]}
          // rowSelectionModel={new Set(selectionModel)}
          // onRowSelectionModelChange={(newSelection) => {
          //   setSelectionModel(Array.from(newSelection));
          // }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              csvOptions: {
                fieldsToExport: columns
                  .filter((c) => c.field !== "actions")
                  .map((c) => c.field),
              },
            },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F1857C",
              fontSize: "1rem",
              color: "#0d0f54",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
            },
          }}
        />
      </div>

      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}

export default PendingApprovals;
