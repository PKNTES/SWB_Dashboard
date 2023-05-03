import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { useGetIdentity } from "@refinedev/core";
import { Box, Stack, Typography } from "@mui/material";
import { CoachCardProp, InfoBarProps } from "interfaces/coach";
import { Link } from "react-router-dom";

const InfoBar = ({icon, name}: InfoBarProps) => (
  <Stack 
  flex={1}
  minWidth={{ xs: "100%", sm: 300 }}
  gap={1.5}
  direction="row">
    {icon}
    <Typography fontSize={14} color="#808191">
      {name}
    </Typography>
  </Stack>
);

const CoachCard = ({id, name, email, avatar, noOfPlayers}: CoachCardProp ) => {
  
  const {data: currentUser } = useGetIdentity<{name: string, email: string}>();
  const generateLink = () => {
    if(currentUser?.email === email) return '/my-profile'
    return `/coaches/show/${id}`;
  }
  return (
    <Box
    component={Link}
    to={generateLink()}
    width="100%"
    borderRadius={8}
    bgcolor="black"
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row"},
      gap: '20px',
      padding: '20px',
      '&:hover': {
        boxShadow: '0px 25px 45px 2px  rgba(176,176,176, 0.3)'
      },

    
    }}
    > <img
    src={avatar}
    alt='user'
    width={50}
    height={50}
    style={{borderRadius: 8,  objectFit: 'cover'}} />
    <Stack 
    direction="column"
    justifyContent="space-between"
    flex={1}
    gap={{ xs: 4, sm: 2 }}>
      <Stack 
                    gap={2}
                    direction="row"
                    flexWrap="wrap"
                    alignItems="center"
                >
                  <Typography fontSize={22} color="secondary">
                    Coach
                  </Typography>
                  <Typography fontSize={22} fontWeight={600} color="primary">
                    {name}
                  </Typography>
                  
                </Stack>
                <Stack direction="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}>
                        <InfoBar
                        icon={<EmailOutlined sx={{ color: "#808191" }} />}
                        name={email}
                    />
                    <InfoBar
                        icon={<Place sx={{ color: "#808191" }} />}
                        name="Oakland"
                    />
                    <InfoBar
                        icon={<Phone sx={{ color: "#808191" }} />}
                        name="+555-555-5555"
                    />
                    <InfoBar
                        icon={<LocationCity sx={{ color: "#808191" }} />}
                        name={`${noOfPlayers} Players`}
                    />
                </Stack>

    </Stack>
    </Box>
  )
}

export default CoachCard