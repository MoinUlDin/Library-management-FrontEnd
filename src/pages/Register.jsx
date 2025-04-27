import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userServices"; // Service for API calls
import { ImSpinner8 } from "react-icons/im"; // Import spinner icon
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Toast from "../components/childrens/FloatingMessage";
import Logo from "../components/childrens/Logo";

function Register() {
  const navigate = useNavigate();
  const cardbackground = "bg-slate-200";
  const [isLoading, setIsLoading] = useState(false);
  // For API messages
  const [apiMessage, setApiMessage] = useState("");
  const [toast, setToast] = useState(false);
  // Local state for toggling password visibility for both password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    // Check password match
    if (data.password !== data.password2) {
      setError("password2", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    setIsLoading(true);
    // Prepare the payload for your API endpoint
    const payload = {
      first_name: data.FirstName,
      last_name: data.LastName,
      username: data.username,
      email: data.Email,
      password: data.password,
      password2: data.password2,
    };

    try {
      // Call your registration API via your service
      const response = await UserService.registerUser(payload);
      setToast(true);
      // Assume API sends back { message: "Your registration ...", ... }
      setApiMessage(response.message || "Registration successful.");
      // Optionally, after a delay, navigate to login
    } catch (err) {
      console.error("Registration error:", err);
      // Use err.message directly, as our thrown error doesn't have a response property.
      setApiMessage(err.message || "Error Registration Failed.");
    } finally {
      setIsLoading(false);
      setToast(true);
    }
  };

  return (
    <div className="md:fixed md:inset-0 bg-slate-300 flex flex-col justify-center items-center">
      <div
        className={`shadow-2xl overflow-hidden bg-white shadow-slate-600 max-w-[700px] rounded-xl md:rounded-3xl flex flex-col justify-center items-center ${cardbackground}`}
      >
        {toast && (
          <Toast
            message={apiMessage}
            duration={8}
            onClose={() => setToast(false)}
          />
        )}
        <div className="flex flex-col gap-2 bg-blue-600 w-full min-h-[110px] items-center justify-center mb-3 relative">
          <h1
            onClick={() => setToast(true)}
            className="text-lg md:text-3xl mt-3"
          >
            KFGC Digital Library
          </h1>
          <h6 className="text-gray-800">Student Registration Portal</h6>
          <div className="translate-y-9 -mt-10">
            <Logo css="size-10" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-2 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 ">
            <div>
              <TextField
                id="FirstName"
                label="First Name"
                variant="outlined"
                margin="normal"
                size="small"
                className="w-80"
                {...register("FirstName", {
                  required: "First Name is required",
                })}
              />
              {errors.FirstName && (
                <p className="text-red-500 text-xs">
                  {errors.FirstName.message}
                </p>
              )}
              <TextField
                id="username"
                label="User Name"
                variant="outlined"
                margin="normal"
                size="small"
                className="w-80"
                {...register("username", {
                  required: "Username Name is required",
                })}
              />
              {errors.rCompanyName && (
                <p className="text-red-500 text-xs">
                  {errors.rCompanyName.message}
                </p>
              )}
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                margin="normal"
                size="small"
                type={showPassword ? "text" : "password"}
                className="w-80"
                {...register("password", { required: "Password is required" })}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" sx={{ m: 0, p: 0 }}>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ p: 0.5 }}
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {errors.rpassword && (
                <p className="text-red-500 text-xs">
                  {errors.rpassword.message}
                </p>
              )}
            </div>
            <div>
              <TextField
                id="LastName"
                label="Last Name"
                variant="outlined"
                margin="normal"
                size="small"
                className="w-80"
                {...register("LastName", {
                  required: "Last Name is required",
                })}
              />
              {errors.LastName && (
                <p className="text-red-500 text-xs">
                  {errors.LastName.message}
                </p>
              )}
              <TextField
                id="Email"
                label="Email"
                variant="outlined"
                margin="normal"
                size="small"
                className="w-80"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.Email && (
                <p className="text-red-500 text-xs">{errors.Email.message}</p>
              )}
              <TextField
                id="password2"
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                size="small"
                type={showPassword2 ? "text" : "password"}
                className="w-80"
                {...register("password2", {
                  required: "Please re-enter your password",
                })}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end" sx={{ m: 0, p: 0 }}>
                        <IconButton
                          onClick={() => setShowPassword2(!showPassword2)}
                          edge="end"
                          sx={{ p: 0.5 }}
                        >
                          {showPassword2 ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {errors.password2 && (
                <p className="text-red-500 text-xs">
                  {errors.password2.message}
                </p>
              )}
            </div>
          </div>
          {errors.general && (
            <p className="text-red-500 my-2 md:mt-4">
              {errors.general.message}
            </p>
          )}
          {apiMessage && (
            <p className="text-red-500 max-w-[80%] text-[12px] my-2 md:mt-4 mx-auto text-center">
              {apiMessage}
            </p>
          )}
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="uppercase hover:cursor-pointer py-2 bg-blue-600 text-white rounded-xl px-8 md:px-12 mt-2 md:mt-6"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <ImSpinner8 className="animate-spin" />
                  <span>Creating..</span>
                </span>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
        <a className="mb-4 -mt-2 font-bold text-blue-600" href="/">
          Back to login
        </a>
      </div>
    </div>
  );
}

export default Register;
