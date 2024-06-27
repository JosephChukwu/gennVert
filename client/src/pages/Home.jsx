import React from "react";
import { Button, Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const theme = useTheme();

  return (
    <main>
      <Box
        sx={{
          mt: "12vh",
          height: "100%",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            <Typography variant="h6">
              Hi {currentUser ? currentUser.username : "Guest"}!
            </Typography>
            <Typography variant="body1">
              Welcome {currentUser ? "back" : "to our platform"}!
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">Genn coin:</Typography>
            <Typography variant="body1">
              {currentUser ? currentUser.points : "N/A"}
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            width: "90vw",
            height: "25vh",
            bgcolor: theme.palette.primary.main,
            borderRadius: "10px"
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              gap: "3rem",
              mt: "2rem"
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" sx={{ color: "white" }}>
                  Task Completed
                </Typography>
                <Typography variant="h2" sx={{ color: "white" }}>
                  {currentUser ? currentUser.tasksCompleted : "N/A"}
                </Typography>
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" sx={{ color: "white" }}>
                  Referrals
                </Typography>
                <Typography variant="h2" sx={{ color: "white" }}>
                  {currentUser ? currentUser.referrals : "N/A"}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" sx={{ color: "white" }}>
                  Days Active
                </Typography>
                <Typography variant="h2" sx={{ color: "white" }}>
                  {currentUser ? currentUser.daysActive : "N/A"}
                </Typography>
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h2" sx={{ color: "white" }}>
                  Level
                </Typography>
                <Typography variant="h2" sx={{ color: "white" }}>
                  {currentUser ? Math.ceil(currentUser.points / 50) : "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </main>
  );
};

export default Home;
