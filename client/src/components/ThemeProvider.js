import { createTheme } from "@mui/material";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#5c58ff",
      ash: "#a5a7a6",
    },
    secondary: {
      main: "#a5a7a6",
    },
  },
  typography: {
    fontFamily: [
      'Inter, Roboto, Arial, sans-serif', // Specify your custom font family here
    ].join(','),
    // Define custom variants if needed
    h3: {
      fontWeight: 700,
      fontStyle: 'italic',
    },
    h5: {
      fontWeight: 700,
      fontStyle: 'italic',
    },
    body6: {
      fontWeight: 600,
      fontStyle: 'italic',
    },
    h2: {
      fontWeight: 600,
      fontStyle: 'normal',
      fontSize: "21px",
      lineHeight: "26px",
    },
    body1: {
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: "20px",
      lineHeight: "30px",
    },
    bottomLink: {
      fontWeight: 400,
      fontStyle: 'normal',
    },
  },
});




// import { createTheme } from "@mui/material";

// export const Theme = createTheme({
//     palette:{
//         primary:{
//             main: "#5c58ff",
//             ash: "#a5a7a6",
//         },
//         secondary: {
//             main: "#a5a7a6"
//         }
//     },
//     Typography: {
//         fontFamily: 'Inter, Roboto, Arial, sans-serif',
//         // Define custom variants
//             h3: {
//                 fontWeight: 700,
//                 fontStyle: 'italic',
//             },
//             h5: {
//                 fontWeight: 700,
//                 fontStyle: 'italic',
//             },
//             body6: {
//                 fontWeight: 600,
//                 fontStyle: 'italic',
//             },
//             h2: {
//                 fontWeight: 700,
//                 fontStyle: 'normal',
//             },
//             body1: {
//                 fontWeight: 800,
//                 fontStyle: 'normal',
//                 size: "11px",
//                 lineHieght: "16px"
//             },
//             body2: {
//                 fontWeight: 100,
//                 fontStyle: 'normal',
//             },
//             // Add more variants as needed
//     },
// });
