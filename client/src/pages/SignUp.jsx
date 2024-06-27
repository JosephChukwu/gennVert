import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { object, string,  } from "yup";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signupimg from "../assets/Signupimg.png";
import { useTheme } from '@mui/material/styles';




const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const initialValues = { 
    fullname: "",
    username: "",
    whatsapp: "",
    campus: "",
    password: "",
    referrer: ""
  };

  return (
    <Grid
      sx={{
        mt: "12vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h2" sx={{ color: theme.palette.primary.main }}>Create Account</Typography>
      <img
        src={Signupimg}
        alt="signup img"
        style={{ maxHeight: "30vh", maxWidth: "50vw", alignItems: "center" }}
      />

      {/*formik components bia form  */}

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          //real sign up functionality proper
          setLoading(true);
          setError("");

          try {
            const response = await fetch("/api/auth/SignUp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            const responseData = await response.json();

            if (responseData.success === false) {
              setError(responseData.message || "Failed to sign up");
            } else {
              // Redirect to the home page upon successful signup
              console.log(responseData);
              navigate("/sign-in");
            }
          } catch (error) {
            setError("Failed to sign up. Please try again later.");
          } finally {
            setLoading(false);
            formikHelpers.resetForm();
          }

          // console.log(values)
          // formikHelpers.resetForm();
        }}
        validationSchema={object({
          fullname: string()
            .required("please enter your fullname")
            .min(8, "fullname is too short"),
          username: string()
            .required("please enter your username")
            .min(5, "username is too short")
            .matches(/^\S*$/, "Username cannot contain spaces"),
          referrer: string()
            .min(5, "referrer is too short")
            .matches(/^\S*$/, "referrer cannot contain spaces"),
          campus: string()
            .required("please enter your campus"),
          whatsapp: string()
            .required("please enter your whatsapp number")
            .min(10, "whatsapp is too short")
            .max(14, "Total length should not exceed 14 characters")
            .matches(
              /^\+234\d{10}$/,
              "WhatsApp number must be in the format +234XXXXXXXXXX"
            ),
          password: string()
            .required("please enter your password")
            .min(6, "password is too short")
            .matches(/^\S*$/, "Password cannot contain spaces"),
        })}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "80vw", sm: "50vw" },
                marginTop: { xs: "20px", sm: "0px" },
              }}
            >
              <Field
                name="fullname"
                type="string"
                as={TextField}
                variant="outlined"
                label="fullname"
                fullWidth
                error={Boolean(errors.fullname) && Boolean(touched.fullname)}
                helperText={Boolean(touched.fullname) && errors.fullname}
              />
              <Box height={14} />

              <Field
                name="username"
                type="string"
                as={TextField}
                variant="outlined"
                label="username"
                fullWidth
                error={Boolean(errors.username) && Boolean(touched.username)}
                helperText={Boolean(touched.username) && errors.username}
              />
              <Box height={14} />

              <FormControl variant="outlined" fullWidth>
                <InputLabel id="campus">campus</InputLabel>
                <Field
                  name="campus"
                  type="string"
                  as={Select}
                  variant="outlined"
                  label="campus"
                  fullWidth
                  error={Boolean(errors.campus) && Boolean(touched.campus)}
                  // helperText={Boolean(touched.type) && errors.type}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="UNEC">UNEC</MenuItem>
                  <MenuItem value="UNN">UNN</MenuItem>
                </Field>
                <ErrorMessage
                  name="campus"
                  component="div"
                  style={{ color: "#ff8080" }}
                />
              </FormControl>
              <Box height={14} />

              <Field
                name="whatsapp"
                type="string"
                as={TextField}
                variant="outlined"
                label="whatsapp"
                fullWidth
                error={Boolean(errors.whatsapp) && Boolean(touched.whatsapp)}
                helperText={Boolean(touched.whatsapp) && errors.whatsapp}
                // defaultValue="+234"
              />
              <Box height={14} />

              <Field
              name="referrer"
              type="string"
              as={TextField}
              variant="outlined"
              label="referrer"
              fullWidth
              error={Boolean(errors.referrer) && Boolean(touched.referrer)}
              helperText={Boolean(touched.referrer) && errors.referrer}
            />
            <Box height={14} />

              <Field
                name="password"
                type="password"
                as={TextField}
                variant="outlined"
                label="Password"
                fullWidth
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
              />
              <Box height={16} />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!dirty || !isValid || loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </Button>

              {error && (
                <Box sx={{ color: "red", marginTop: "10px" }}>{error}</Box>
              )}
            </Box>

            <Grid sx={{marginTop: "10px", display: "flex", flexDirection: "row"}}>
            <Typography variant="bottomLink">already have an acoount?</Typography>
            <Link to={"/sign-in"} style={{textDecoration: "none"}}>
              <Typography variant="bottomLink" sx={{ color: theme.palette.primary.main  }}>
                 Sign In
              </Typography>
            </Link>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default SignUp;

//     </Grid>
//   );
// }
