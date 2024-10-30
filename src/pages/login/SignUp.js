/*
- File Name: SignUp.js
- Author: shrouk ahmed
- Date of Creation: 17/9/2024
- Versions Information: 1.0.0
- Dependencies:
  {
  REACT , 
  MUI ,
  react-router-dom ,
  @react-oauth/google,
  jwt-decode,
  axios,
  react-hook-form,
  Login.css,
  App.css
  }
- Contributors:
- Last Modified Date: 17/10/2024
- Description : a Sign up component created by REACT and MUI
*/
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Snackbar,
  Alert,
  IconButton,
  Stack,
  Typography,
  List,
  ListItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import "../../App.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [isActive, setIsActive] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Username Validation
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [usernameTooltipOpen, setUsernameTooltipOpen] = useState(false); // State for username tooltip

  const validateUsername = (value) => {
    const usernamePattern = /^(?=.*[a-zA-Z]{3})(?=.*[0-9]{2})[a-zA-Z0-9]+$/;
    return usernamePattern.test(value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsValidUsername(validateUsername(e.target.value));
  };

  const handleUsernameFocus = () => {
    if (!isValidUsername) {
      setUsernameTooltipOpen(true); // Show tooltip on focus if username is invalid
    }
  };

  const handleUsernameBlur = () => {
    setUsernameTooltipOpen(false);
  };

  // Email Validation
  const [signInEmail, setSignInEmail] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTooltipOpen, setEmailTooltipOpen] = useState(false); // State for email tooltip

  const handleEmailChange = (e) => {
    const newEmail = e.target.value; // Store the new email value
    setSignInEmail(newEmail);
    setEmail(newEmail);

    // Validate email and set error state
    const emailPattern = /^[a-zA-Z0-9]{3,}(\.[a-zA-Z0-9]+)*@gmail\.com$/; // Simple email regex pattern
    const isValid = emailPattern.test(newEmail); // Check validity of new email
    setEmailError(!isValid);

    // Show tooltip if the email is invalid and the input is not empty
    setEmailTooltipOpen(!isValid && newEmail.length > 0);
  };

  // Show tooltip on focus; hide if valid email
  const handleEmailFocus = () => {
    const emailPattern = /^[a-zA-Z0-9]{3,}(\.[a-zA-Z0-9]+)*@gmail\.com$/; // Simple email regex pattern
    const isValid = emailPattern.test(email); // Check validity of the current email
    setEmailTooltipOpen(!isValid); // Show tooltip if the email is invalid
  };

  // Hide tooltip when focus is lost
  const handleEmailBlur = () => {
    setEmailTooltipOpen(false); // Hide tooltip when focus is lost
  };

  /////////////////////////////////////////////////
  //Password Validaion
  // State for passwords
  const [signInPassword, setSignInPassword] = useState(""); // Password for sign-in
  const [signUpPassword, setSignUpPassword] = useState(""); // Password for sign-up
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [ConfirmtooltipOpen, setConfirmTooltipOpen] = useState(false);
  const validations = {
    minLength: signUpPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(signUpPassword),
    hasLowerCase: /[a-z]/.test(signUpPassword),
    hasNumber: /[0-9]/.test(signUpPassword),
    hasSpecialChar: /[!@#$%^&*]/.test(signUpPassword),
    match:
      signUpPassword && confirmPassword
        ? confirmPassword === signUpPassword
        : false,
  };
  const validationCriteria = [
    { label: "At least 8 characters", valid: validations.minLength },
    { label: "At least one uppercase letter", valid: validations.hasUpperCase },
    { label: "At least one lowercase letter", valid: validations.hasLowerCase },
    { label: "At least one number", valid: validations.hasNumber },
    {
      label: "At least one special character",
      valid: validations.hasSpecialChar,
    },
  ];
  const ConfirmValidationCriteria = [
    { label: "Passwords match", valid: validations.match },
  ];
  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  /////////////////////////////////////////////////
  const navigate = useNavigate(); // Initialize the navigate function

  //form handling
  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if any of the fields are empty
    if (!username || !email || !signUpPassword || !confirmPassword) {
      return;
    }

    // Proceed with form submission if all fields are filled
    if (isValidUsername && !emailError && validationCriteria) {
      // Submit form

      onSubmit({ username, password: signUpPassword, email, confirmPassword });
      console.log("Form Submitted!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };
  //////////////////////////////////////////////////////////////////////

  const handleSignUpSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateUsername(username)) {
      setIsValidUsername(false);
      setUsernameTooltipOpen(true);
    } else {
      setIsValidUsername(true);
      setUsernameTooltipOpen(false);
      // Proceed with form submission (e.g., API call)
    }
    const emailPattern = /^[a-zA-Z0-9]{3,}(\.[a-zA-Z0-9]+)*@gmail\.com$/;
    const isValid = emailPattern.test(email);
    setEmailError(!isValid);
    setEmailTooltipOpen(!isValid);

    // Check if any of the fields are empty
    if (!username || !email || !signUpPassword || !confirmPassword) {
      return;
    }

    // Proceed with form submission if all fields are filled
    if (isValidUsername && !emailError && validationCriteria) {
      // Submit form

      onSubmit({ username, password: signUpPassword, email, confirmPassword });
      console.log("Form Submitted!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  /////////////////////////////////////////////////
  // Show JSON data in console
  axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage
    const refreshToken = localStorage.getItem("refreshToken"); // Get refresh token from localStorage

    if (token) {
      request.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    if (refreshToken) {
      request.headers["Refresh-Token"] = refreshToken; // Add refresh token to custom header
    }

    console.log("Starting Request", JSON.stringify(request.data, null, 2));
    return request;
  });
  const googleNavigate = useNavigate();
  /////////////////////////////////////////////////
  const onSubmit = async (data) => {
    const SignUpData = {
      ...data,
    };

    // signup api
    try {
      const response = await axios.post(
        "https://careerguidance.runasp.net/Auth/SignUp",

        SignUpData
      );
      const token = response.data.accessToken; // Adjust this if the key differs
      const refreshToken = response.data.refreshToken; // Adjust this if the key differs
      localStorage.setItem("authToken", token);

      localStorage.setItem("refreshToken", refreshToken);

      console.log("Sign-up successful:", response.data);
      handleClick();
      navigate("/");
    } catch (error) {
      console.log("Error during API call: ", error);

      let errorMsg;
      if (error.response && error.response.data) {
        if (error.response.status === 409) {
          const serverMessage = error.response.data.message || "";
          console.log("Server Message: ", serverMessage); // عرض رسالة الخادم للتحقق منها

          // تحقق من نص الرسالة باستخدام جمل شرطية مباشرة
          if (
            serverMessage === "User.DublicatedEmail" ||
            "Another user with the same email is already exists"
          ) {
            errorMsg = "Username or Email is already exists";
          } else {
            errorMsg = serverMessage || "حدث خطأ غير متوقع. حاول مرة أخرى.";
          }
        } else {
          errorMsg =
            error.response.data.message || "حدث خطأ غير متوقع. حاول مرة أخرى.";
        }
      } else {
        errorMsg = error.message || "حدث خطأ غير متوقع. حاول مرة أخرى.";
      }

      setErrorMessage(errorMsg);
      setOpenSnackbar(true);
    }
    /////////////////////////////////////////////////////////////

    const getToken = () => {
      return localStorage.getItem("authToken"); // Match the storage key used in SignUp
    };

    const getRefreshToken = () => {
      return localStorage.getItem("refreshToken"); // Match the storage key used in SignUp
    };

    const fetchData = async () => {
      const token = getToken();

      try {
        const response = await axios.get("https://yourapi.com/endpoint", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Optionally handle token expiration and refresh
        if (error.response && error.response.status === 401 || 400) {
          console.log("Token expired, refreshing...");
          await refreshAccessToken(); // Implement refresh logic
        }
      }
    };

    const refreshAccessToken = async () => {
      const refreshToken = getRefreshToken();

      try {
        const response = await axios.post(
          "https://careerguidance.runasp.net/Auth/RefreshToken",
          {
            refreshToken: refreshToken,
          }
        );

        // Store the new access token
        localStorage.setItem("authToken", response.data.accessToken); // Update if the key is different
        console.log(
          "Access token refreshed successfully:",
          response.data.accessToken
        );
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    };
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setErrorMessage(""); // Clear the error message after closing
  };
  /////////////////////////////////////////////////////////////

  //login api
  const { register, handleSubmit } = useForm(); // Initialize useForm

  const onSubmit2 = async (data) => {
    const LoginData = {
      EmailOrUsername: data.signInEmail,
      password: data.password,
    };

    console.log("LoginData being sent:", LoginData);

    try {
      const response = await axios.post(
        "https://careerguidance.runasp.net/Auth/Login",
        LoginData,
        { headers: { "Content-Type": "application/json" } }
      );
      const role = response.data.role;
      // Navigate based on role
      if (role === "admin") {
        navigate("/dashboard"); // Navigate to admin dashboard
      } else if (role === "Student") {
        navigate("/"); // Navigate to user dashboard
      } else {
        navigate("/"); // Default navigation if role does not match
      }
      
      // Store tokens in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      console.log("Login successful:", response.data);
    } catch (error) {
      console.log("Error during API call: ", error);

      let errorMsg;
      if (error.response && error.response.data) {
        if (error.response.status === 401 || 400) {
          const serverMessage = error.response.data.message || "";
          console.log("Server Message: ", serverMessage); // عرض رسالة الخادم للتحقق منها

          // تحقق من نص الرسالة باستخدام جمل شرطية مباشرة
          if (
            serverMessage === "The EmailOrUsername field is required" ||
            "Email Or Username' must not be empty"
          ) {
            errorMsg = "Invalid Username or password ";
          } else {
            errorMsg = serverMessage || "حدث خطأ غير متوقع. حاول مرة أخرى.";
          }
        } else {
          errorMsg =
            error.response.data.message || "حدث خطأ غير متوقع. حاول مرة أخرى.";
        }
      } else {
        errorMsg = error.message || "حدث خطأ غير متوقع. حاول مرة أخرى.";
      }

      setErrorMessage(errorMsg);
      setOpenSnackbar(true);
    }
  };

  const getToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };
  const fetchData = async () => {
    const token = getToken();

    try {
      const response = await axios.get("https://yourapi.com/endpoint", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);

      //  handle token expiration and refresh
      if (error.response && error.response.status === 401 || 400) {
        console.log("Token expired, refreshing...");
        await refreshAccessToken(); // Implement refresh logic
      }
    }
  };
  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    try {
      const response = await axios.post(
        "https://careerguidance.runasp.net/Auth/RefreshToken",
        {
          refreshToken: refreshToken,
        }
      );

      // Store the new access token
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log(
        "Access token refreshed successfully:",
        response.data.accessToken
      );
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };
  /////////////////////////////////////////////////////////////

  const isMobilee = useMediaQuery("(max-width:600px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const handleClick = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSuccess = async (response) => {
    console.log("Login Success:", response);
    // Decode the credential token
    const credentialResponseDecoded = jwtDecode(response.credential);
    console.log(credentialResponseDecoded);

    // Send the token to your API
    try {
      const apiResponse = await axios.post(
        "https://careerguidance.runasp.net/Auth/Google-Signin",
        {
          token: response.credential,
        }
      );
      console.log("API Response:", apiResponse.data);
      // Handle the API response as needed (e.g., store tokens, navigate, etc.)
      googleNavigate("/");
    } catch (error) {
      console.error("API Call Failed:", error);
    }
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
  };

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Handle the token received from Google (send it to the backend or log in the user)
  };

  return (
    <div className="biggerContainer">
      <div
        className={`container ${isActive ? "active" : ""}`}
        id="container"
        style={{ marginTop: "0px" }}
      >
        <div className="form-container sign-in Formm">
          <form onSubmit={handleSignUpSubmit} className="Formm">
            <h1 style={{ color: "#293241", marginBottom: 13 }}>
              Create Account
            </h1>
            {/* Username field */}
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <TextField
                name="username"
                placeholder="Username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                error={!isValidUsername} // Show error when username is invalid
                onFocus={handleUsernameFocus} // Show tooltip on focus
                onBlur={handleUsernameBlur} // Hide tooltip on blur
                autoComplete="off"
                sx={{
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                    backgroundColor: "transparent",
                    WebkitTextFillColor: "#293241", // Maintain your desired text color
                    transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
                  },
                  "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                    {
                      backgroundColor: "transparent",
                      WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                      transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                    },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    width: "320px",
                    height: "37px",
                    margin: "0", // Remove default margin from TextField
                    border: "1px solid gray",
                    "& fieldset": {
                      border: "none", // Remove the default border
                    },
                  },
                  "& .MuiInputBase-root": {
                    "&.Mui-focused": {
                      borderColor: "gray", // Remove focus color
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ee6c4d",
                          borderLeft: "none",
                          borderTop: "none",
                          borderBottom: "none",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <PersonIcon
                          style={{
                            color: "#ee6c4d",
                            fontSize: 30,
                            marginRight: 5,
                          }}
                        />
                      </div>
                    </InputAdornment>
                  ),
                }}
              />

              <Tooltip
                title={
                  !isValidUsername
                    ? "Username must be at least 3 letters, 2 numbers and contain only letters and numbers."
                    : ""
                }
                placement={isMobilee ? "bottom" : "left-start"} // Conditionally set the placement
                open={usernameTooltipOpen} // Control tooltip visibility for username
                arrow
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: "#f5f5f5", // Set your desired background color here
                      color: "#ee6c4d", // Optional: Set text color for better visibility
                      textTransform: "bold",
                      fontSize: 13,
                    },
                  },
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: isMobilee ? [-100, 10] : [5, 315], // Larger vertical offset for mobile mode
                      },
                    },
                  ],
                }}
              />
            </Box>
            {/* Email field */}
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <TextField
                name="email"
                placeholder="Email"
                type="email"
                error={emailError} // Control error state
                value={email}
                onChange={handleEmailChange}
                onFocus={handleEmailFocus} // Show tooltip on focus
                onBlur={handleEmailBlur} // Hide tooltip on blur
                autoComplete="off"
                sx={{
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                    backgroundColor: "transparent",
                    WebkitTextFillColor: "#293241", // Maintain your desired text color
                    transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
                  },
                  "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                    {
                      backgroundColor: "transparent",
                      WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                      transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                    },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    width: "320px",
                    height: "37px",
                    margin: "10px 0",
                    border: "1px solid gray",
                    "& fieldset": {
                      border: "none", // Remove the default border
                    },
                  },
                  "& .MuiInputBase-root": {
                    "&.Mui-focused": {
                      borderColor: "gray", // Remove focus color
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ee6c4d",
                          borderLeft: "none",
                          borderTop: "none",
                          borderBottom: "none",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <EmailIcon
                          style={{
                            color: "#ee6c4d",
                            fontSize: 30,
                            marginRight: 5,
                          }}
                        />
                      </div>
                    </InputAdornment>
                  ),
                }}
              />

              <Tooltip
                title="Please enter a valid email in the format: xxx@gmail.com"
                placement={isMobilee ? "bottom" : "left-start"} // Conditionally set the placement
                open={emailTooltipOpen}
                arrow
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: "#f5f5f5",
                      color: "#ee6c4d",
                      textTransform: "bold",
                      fontSize: 13,
                    },
                  },
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: isMobilee ? [-220, 38] : [18, 315], // Larger vertical offset for mobile mode
                      },
                    },
                  ],
                }}
              />
            </Box>
            {/* sign up Password field with tooltip */}
            <Tooltip
              title={
                <Box sx={{ width: 180 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 13, fontWeight: "bold", color: "#293241" }}
                  >
                    Password Requirements:
                  </Typography>
                  <List>
                    {validationCriteria.map((item, index) => (
                      <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                        <Typography
                          color={item.valid ? "green" : "red"}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "10px",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          {item.valid ? "✔" : "✖"} {item.label}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              }
              open={
                tooltipOpen && validationCriteria.some((item) => !item.valid)
              } // Keep tooltip open if some criteria are not met
              placement={isMobilee ? "bottom" : "left-start"}
              arrow
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: isMobilee ? [0, -5] : [0, -5], // Larger vertical offset for mobile mode
                    },
                  },
                ],
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#f5f5f5",
                    color: "#293241",
                  },
                },
              }}
            >
              <TextField
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="signUpPassword"
                value={signUpPassword}
                onChange={(e) => {
                  setSignUpPassword(e.target.value);
                  setTooltipOpen(true); // Show tooltip while typing
                }}
                onBlur={() => {
                  setTooltipOpen(false); // Hide it when password is fully valid
                }}
                onFocus={() => {
                  setTooltipOpen(true); // Hide it when password is fully valid
                }}
                autoComplete="off"
                sx={{
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                    backgroundColor: "transparent",
                    WebkitTextFillColor: "#293241", // Maintain your desired text color
                    transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
                  },
                  "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                    {
                      backgroundColor: "transparent",
                      WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                      transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                    },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    width: "320px",
                    height: "37px",
                    border: "1px solid gray",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-root": {
                    "&.Mui-focused": { borderColor: "gray" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ee6c4d",
                          borderLeft: "none",
                          borderTop: "none",
                          borderBottom: "none",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <LockIcon
                          style={{
                            color: "#ee6c4d",
                            fontSize: 30,
                            marginRight: 5,
                          }}
                        />
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>

            {/* Confirm Password field with tooltip */}
            <Tooltip
              title={
                <Box sx={{ width: 180 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 13, fontWeight: "bold", color: "#293241" }}
                  >
                    Password Requirements:
                  </Typography>
                  <List>
                    {ConfirmValidationCriteria.map((item, index) => (
                      <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                        <Typography
                          color={item.valid ? "green" : "red"}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "10px",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          {item.valid ? "✔" : "✖"} {item.label}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              }
              open={
                ConfirmtooltipOpen &&
                ConfirmValidationCriteria.some((item) => !item.valid)
              } // Keep tooltip open if some criteria are not met
              arrow
              placement={isMobilee ? "bottom" : "left-start"} // Conditionally set the placement
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: isMobilee ? [0, -18] : [10, -5], // Larger vertical offset for mobile mode
                    },
                  },
                ],
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#f5f5f5", // Set your desired background color here
                    color: "#293241", // Optional: Set text color for better visibility
                  },
                },
              }}
            >
              <TextField
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmTooltipOpen(true)} // Show tooltip on focus
                onBlur={() => setConfirmTooltipOpen(false)} // Hide tooltip on blur
                autoComplete="off"
                sx={{
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                    backgroundColor: "transparent",
                    WebkitTextFillColor: "#293241", // Maintain your desired text color
                    transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
                  },
                  "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                    {
                      backgroundColor: "transparent",
                      WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                      transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                    },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    width: "320px",
                    height: "37px",
                    margin: "10px 0",
                    border: "1px solid gray",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-root": {
                    "&.Mui-focused": { borderColor: "gray" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ee6c4d",
                          borderLeft: "none",
                          borderTop: "none",
                          borderBottom: "none",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <EnhancedEncryptionIcon
                          style={{
                            color: "#ee6c4d",
                            fontSize: 30,
                            marginRight: 5,
                          }}
                        />
                      </div>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleShowPassword}
                        edge="end"
                        style={{ color: "gray" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Tooltip>

            <button
              type="submit"
              className="btn"
              style={{ textTransform: "capitalize" }}
            >
              Sign Up
            </button>

            {/* Continue with Google button */}
            <Stack
              display="flex"
              alignItems="center"
              justifyContent="center"
              direction="row"
            >
              <div
                style={{
                  border: "1px solid rgba(34, 60, 84, 0.397)",
                  width: 140,
                  margin: 10,
                }}
              ></div>
              <span style={{ color: "#293241", fontWeight: "bold" }}> OR </span>
              <div
                style={{
                  border: "1px solid rgba(34, 60, 84, 0.397)",
                  width: 140,
                  margin: 10,
                }}
              ></div>
            </Stack>
            <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
          </form>
          {/* end of sign up form  */}
        </div>
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit(onSubmit2)}>
            <h1 style={{ color: "#293241" }}>Sign In</h1>

            {/* Username or email field */}
            <TextField
              {...register("signInEmail", { required: true })} // Use the register method here
              placeholder="Username or email"
              type="text"
              onChange={(e) => setSignInEmail(e.target.value)}
              required
              autoComplete="off"
              sx={{
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 10px transparent inset", // Make the autofill background transparent
                  backgroundColor: "transparent",
                  WebkitTextFillColor: "#293241", // Maintain your desired text color
                  transition: "background-color 5000s ease-in-out 0s", // A trick to override autofill background
                },
                "& input:-webkit-autofill:focus, & input:-webkit-autofill:hover":
                  {
                    backgroundColor: "transparent",
                    WebkitBoxShadow: "0 0 0 10px transparent inset", // Keep it transparent on focus/hover
                    transition: "background-color 5000s ease-in-out 0s", // Maintain the background color override
                  },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  width: "320px",
                  height: "37px",
                  margin: "15px 0",
                  border: "1px solid gray",
                  "& fieldset": {
                    border: "none", // Remove the default border
                  },
                },
                "& .MuiInputBase-root": {
                  "&.Mui-focused": {
                    borderColor: "gray", // Remove focus color
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ee6c4d",
                        borderLeft: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <PersonIcon
                        style={{
                          color: "#ee6c4d",
                          fontSize: 30,
                          marginRight: 5,
                        }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
            {/* Sign in Password field */}
            <TextField
              {...register("password", { required: true })} // Use the register method here
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  width: "320px",
                  height: "37px",
                  border: "1px solid gray",
                  "& fieldset": { border: "none" },
                },
                "& .MuiInputBase-root": {
                  "&.Mui-focused": { borderColor: "gray" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ee6c4d",
                        borderLeft: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <LockIcon
                        style={{
                          color: "#ee6c4d",
                          fontSize: 30,
                          marginRight: 5,
                        }}
                      />
                    </div>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleShowPassword}
                      edge="end"
                      style={{ color: "gray" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/*  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", // Adjust spacing between checkbox and link
                width: "80%", // Adjust width as per the layout
              }}
            >
              {/* Remember Me Checkbox */}
              <Box display="flex" alignItems="center" mt={1}>
                {" "}
                {/* Aligns the checkbox and label */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                      sx={{
                        transform: "scale(0.8)", // Adjust checkbox size
                        "&.Mui-checked": {
                          color: "#ee6c4d",
                        },
                      }}
                    />
                  }
                  label="Remember Me"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "13px", // Set font size for the label
                      color: "#293241", // Set label color
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>

              {/* Forget Your Password Link */}
              <Link
                to="/ForgotPassword" // Replace with your actual route
                style={{
                  textDecoration: "none",
                  color: "#293241",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <button
              type="submit"
              className="btn"
              style={{ textTransform: "capitalize" }}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>
                Don't have an account ? <br />
                Register with your personal details to use all of the site
                features
              </p>
              <button
                className="hidden btn"
                id="login"
                onClick={handleLoginClick}
                style={{ textTransform: "capitalize" }}
              >
                Sign Up
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Do you have an account ? <br />
                Enter your personal details to use all of the site features
              </p>
              <button
                className="hidden btn"
                id="register"
                onClick={handleRegisterClick}
                style={{ textTransform: "capitalize" }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Account created successfully
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SignUp;
function postData() {
  throw new Error("Function not implemented.");
}
