import { Button, Box, Grid, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useTheme } from '@mui/material/styles';
import loginImg from "../assets/loginImg.png";





export default function SignIn() {
  //via functionality now
  //commented out  so to use redux stuff
  const { loading, error } = useSelector((state) => state.user);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();



  const initialValues = {
    username: "",
    password: "",
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


    <Typography variant="h2" sx={{ color: theme.palette.primary.main }}>Login</Typography>
    <img
      src={loginImg}
      alt="loginImg"
      style={{ maxHeight: "30vh", maxWidth: "50vw", alignItems: "center" }}
    />


      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          //real sign up functionality proper

          //using the redux dispatchb method
          dispatch(signInStart());
          try {
            const response = await fetch("/api/auth/SignIn", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            const responseData = await response.json();

            if (responseData.success === false) {
              //using redux method
              dispatch(signInFailure(responseData.message));
              // setError(responseData.message || "Failed to sign In");
            } else {
              // Redirect to the home page upon successful signin
              console.log(responseData);
              dispatch(signInSuccess(responseData));
              navigate("/");
            }
          } catch (error) {
            dispatch(signInFailure(error.message));
            setError(
              "Failed to sign in. Please check your internet and try again later."
            );
          } finally {
            formikHelpers.resetForm();
          }
        }}
        validationSchema={object({
          username: string().required("please enter your username"),
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
                name="username"
                type="username"
                as={TextField}
                variant="outlined"
                label="username"
                fullWidth
                error={Boolean(errors.username) && Boolean(touched.username)}
                helperText={Boolean(touched.username) && errors.username}
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
                {loading ? "Loading..." : "Sign In"}
              </Button>

              {error && (
                <Box sx={{ color: "red", marginTop: "10px" }}>{error}</Box>
              )} 
            </Box>


            <Grid sx={{marginTop: "10px", display: "flex", flexDirection: "row"}}>
            <Typography variant="bottomLink">don't have an acoount?</Typography>
            <Link to={"/sign-up"} style={{textDecoration: "none"}}>
              <Typography variant="bottomLink" sx={{ color: theme.palette.primary.main  }}>
                 Sign up
              </Typography>
            </Link>
            </Grid>


          </Form>
        )}
      </Formik>
    </Grid>
  );
}
