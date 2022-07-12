import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { Navbar, SideBar } from "../components";

const drawerWidth = 280;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>

      <Navbar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />

      {/* Navbar drawerWidth */}

      {/* Navbar drawerWidth */}

      <Box
        component='main'
        sx={{flexGrow: 1, p:3}}
      >
        {/* Toolbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
