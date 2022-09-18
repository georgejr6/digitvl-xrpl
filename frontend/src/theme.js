import React from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    light: {
        theme: "#07689f",
        subTheme: "#a2d5f2",
        component:{
            backgroundColor: "#f6f6f6",
            color: "#2b2024",
        },
        button:{
            onHover:{
                backgroundColor:"#a2d5f2",
                color:"#191919"
            },
            contained:{
                backgroundColor: "#07689f",
                color:"#fafafa"
            },
            outlined:{
                backgroundColor:"transparent",
                color:"#191919"
            }
        },
        volume:{
            color:"#07689f"
        }
    },
    dark: {
        theme:"#4ecca3",
        subTheme: "#a2d5f2",
        component:{
            backgroundColor: "#232931",
            color: "#eeeeee",
        },
        button:{
            onHover:{
                backgroundColor:"#a2d5f2",
                color:"#fafafa"
            },
            contained:{
                backgroundColor: "#07689f",
                color:"black"
            },
            outlined:{
                backgroundColor:"transparent",
                color:"#fafafa"
            }
        },
        volume:{
            color:"#07689f"
        }
    }
});

export default theme;
export const ThemeContext = React.createContext(
    theme.light
);
// export const themes = {
//     light: {
//         theme: "#07689f",
//         subTheme: "#a2d5f2",
//         component:{
//             backgroundColor: "#f6f6f6",
//             color: "#2b2024",
//         },
//         button:{
//             onHover:{
//                 backgroundColor:"#a2d5f2",
//                 color:"#191919"
//             },
//             contained:{
//                 backgroundColor: "#07689f",
//                 color:"#fafafa"
//             },
//             outlined:{
//                 backgroundColor:"transparent",
//                 color:"#191919"
//             }
//         },
//         volume:{
//             color:"#07689f"
//         }
//     },
//     dark: {
//         theme:"#4ecca3",
//         subTheme: "#a2d5f2",
//         component:{
//             backgroundColor: "#232931",
//             color: "#eeeeee",
//         },
//         button:{
//             onHover:{
//                 backgroundColor:"#a2d5f2",
//                 color:"#fafafa"
//             },
//             contained:{
//                 backgroundColor: "#07689f",
//                 color:"black"
//             },
//             outlined:{
//                 backgroundColor:"transparent",
//                 color:"#fafafa"
//             }
//         },
//         volume:{
//             color:"#07689f"
//         }
//     }
// };
// export default themes;
// export const ThemeContext = React.createContext(
//     themes.light
// );