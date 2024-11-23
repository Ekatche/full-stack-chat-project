import { useTheme } from "@mui/material/styles";
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Drawer, IconButton, Link, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const PrimaryAppBar = () => {
    const [sideMenu, setSideMenu] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"))

    useEffect(() => {
        if (isSmallScreen && sideMenu) {
            setSideMenu(false);
        }
    }, [isSmallScreen]);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setSideMenu(open);
            };

    return (
        <AppBar sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            backgroundColor: theme.palette.background.default,
            borderBottom: `1px solid ${theme.palette.divider}`,
        }}>

            <Toolbar variant="dense"
                sx={{
                    height: theme.primaryAppBar.height,
                    minHeight: theme.primaryAppBar.height
                }}
            >
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                    <IconButton
                        onClick={toggleDrawer(true)}


                        color="inherit"
                        aria-label="open drawer"
                        edge="start" sx={{ marginRight: 2 }}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <Drawer anchor="left"
                    open={sideMenu}
                    onClose={toggleDrawer(false)}
                >
                    {[...Array(100)].map((_, i) => (
                        <Typography key={i} components="paragraph">
                            {i + 1}

                        </Typography>)

                    )}

                </Drawer>


                <Link href="/" underline="none" color="inherit">
                    <Typography variant="h6"
                        components="div"
                        noWrap
                        sx={{
                            display: { fontWeight: 700, letterSpacing: "-0.5" }
                        }}
                    >
                        DJCHAT
                    </Typography>
                </Link>
                <IconButton color="inherit" aria-label="open drawer" edge="end" sx={{ marginRight: 2 }}>
                    <PersonIcon />
                </IconButton>


            </Toolbar>
        </AppBar>
    )
};

export default PrimaryAppBar