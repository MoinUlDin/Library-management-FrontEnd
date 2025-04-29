import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FiBookOpen, FiEdit, FiTrash, FiUserX } from "react-icons/fi";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/childrens/FloatingMessage";
import MemberServices from "../../services/MemberServices";

function AddMember() {
  const memberlist = useSelector((state) => state.member.memberList || null);
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!memberlist) {
      setLoading(true);
    }
    MemberServices.getMemberList(dispatch)
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
  //  {
  //   id: 1, first_name: "", last_name: "", middle_name: "", father_first_name: "",
  //   father_last_name: "", profile_photo: null,
  //   class_name: "", section: "", mobile_number: "", cnic: "",
  //   department: null, session: null, registration_id: "", roll_no: "",
  //   shift: "DAY", security_fee: "0.00", payment_proof: null,
  //   member_id: "MBR-0001",  home_address: "", emergency_contact: "",
  //   library_membership_id: "", username: "member",
  // };
  const columns = [
    {
      field: "roll_no",
      headerName: "Role No",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.roll_no || "-";
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
      field: "class_name",
      headerName: "Class Name",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.class_name || "-";
        return val;
      },
    },
    {
      field: "section",
      headerName: "Section",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.section || "-";
        return val;
      },
    },
    {
      field: "department",
      headerName: "Department",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.department || "-";
        return val;
      },
    },
    {
      field: "cnic",
      headerName: "CNIC",
      width: 130,
      renderCell: (props) => {
        const val = props.row?.cnic || "-";
        return val;
      },
    },
    {
      field: "registration_id",
      headerName: "Reg Id",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.registration_id || "-";
        return val;
      },
    },
    {
      field: "shift",
      headerName: "Shift",
      width: 90,
      renderCell: (props) => {
        const val = props.row?.shift || "-";
        return val;
      },
    },
    {
      field: "member_id",
      headerName: "Member Id",
      width: 120,
      renderCell: (props) => {
        const val = props.row?.member_id || "-";
        return val;
      },
    },
    {
      field: "home_address",
      headerName: "Address",
      width: 130,
      renderCell: (props) => {
        const val = props.row?.home_address || "-";
        return val;
      },
    },
    {
      field: "emergency_contact",
      headerName: "Emergency Contact",
      width: 150,
      renderCell: (props) => {
        const val = props.row?.emergency_contact || "-";
        return val;
      },
    },
    {
      field: "library_membership_id",
      headerName: "Library Memb Id",
      width: 130,
      renderCell: (props) => {
        const val = props.row?.library_membership_id || "-";
        return val;
      },
    },
    {
      field: "mobile_number",
      headerName: "Mobile Number",
      width: 140,
      renderCell: (props) => {
        const val = props.row?.mobile_number || "-";
        return val;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,
      filterable: false,
      disableExport: true,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 w-ful h-full items-center">
            <Tooltip
              title="Toggle between Disable and Enable User"
              placement="top"
            >
              <IconButton
                size="small"
                onClick={() => handleDisable(params.row?.id)}
              >
                <FiUserX className="text-gray-600" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <IconButton
                size="small"
                onClick={() => handleDelete(params.row?.id)}
              >
                <FiTrash color="red" />
              </IconButton>
            </Tooltip>
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
  const handleShowForm = (mode, id) => {
    if (mode === "new") {
    } else {
      const existing = issuedBookList.find((item) => item.id === id);
    }
  };
  return (
    <div className="mt-8">
      {/* Header Buttons */}
      <div className="flex items-center justify-end px-8">
        <button
          onClick={() => handleShowForm("new")}
          className="px-3 py-2 ptr bg-amber-500 rounded hover:bg-amber-700 "
        >
          Issue Book
        </button>
      </div>
      {/* table Content */}
      <div className="px-1 my-6 overflow-x-auto">
        <DataGrid
          rows={memberlist}
          columns={columns}
          // loading={loading}
          rowHeight={60}
          headerHeight={50}
          disableSelectionOnClick
          showToolbar
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

export default AddMember;
