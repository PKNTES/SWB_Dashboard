import { Place } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Typography, Box, Card, CardMedia, CardContent, Stack  } from "@mui/material";
import { ReportCardProps } from "interfaces/report.js";

const ReportCard = ({id, title, location, team, position, photo}: ReportCardProps) => {
  return (
    <Card
      component={Link}
      to={`/reports/show/${id}`}
      sx={{
        maxWidth:'330px',
        padding:'10px',
        '&:hover' : {
          boxShadow: '0 22px 45px 2px rgba(176,176,176, 0.3)'
        
        },
        cursor: 'pointer',
        textDecoration: 'none',
        borderRadius: "10px",
        bgcolor: "midnightblue"
      }}
      elevation={0}
      
    >
      <CardMedia 
      component="img"
      width='100%'
      height={210}
      image={photo}
      alt= "card image"
      sx={{borderRadius:"10px"}}
      />
      <CardContent sx={{ display: 'flex',  flexDirection: " row",
       justifyContent: "space-between", gap: '10px',  paddingX: '5px'}}>
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="primary"> {title}</Typography>
          <Stack direction="row" gap={0.5}
          alignItems="flex-start">
            <Place 
              sx={{ fontSize: 18, color: 'primary', 
              marginTop: 0.5}}/>
          <Typography fontSize={14} color="secondary">{location}</Typography>

          </Stack>

        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} bgcolor="orchid"  height="fit-content">
          <Typography color="black" fontSize={14} fontWeight={500}> {team} </Typography>
        </Box>
        <Box px={1.5} py={0.5} borderRadius={1} bgcolor="orchid"  height="fit-content">
          <Typography color="black" fontSize={14} fontWeight={500}> {position} </Typography>
        </Box>
      </CardContent >
    </Card>
  )
}

export default ReportCard;