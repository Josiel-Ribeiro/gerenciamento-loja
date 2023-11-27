import { Box, Paper, Typography, useTheme } from "@mui/material";

export const PaginaInicial = () => {
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      gap={5}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 60,
          background: theme.palette.background.paper,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        component={Paper}
      >
        <Typography>Sua logo</Typography>
      </Box>
    </Box>
  );
};
