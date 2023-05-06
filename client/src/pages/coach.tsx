import { useList } from "@refinedev/core";
import { Box, Typography } from "@mui/material";
import { CoachCard } from "components";




const Coaches = () => {

  const {data, isLoading, isError} = useList({
    resource: 'users'
  });

  const allCoaches = data?.data ?? [];
  
  
  if(isLoading) return <div>Loading...</div>;
  if(isError) return <div>Error...</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="primary"> Coaches List</Typography>
      <Box mt="20px" borderRadius={8}
            sx={{
              display:"flex",
              flexWrap: "wrap",
              gap: '5px',
              backgroundColor: "black"
              
            }}>

              {allCoaches.map((coaches) => (
                <CoachCard 
                key={coaches._id}
                id={coaches._id}
                name={coaches.name}
                email={coaches.email}
                avatar={coaches.avatar}
                noOfPlayers={coaches.allPlayers.length}/>
              ) )}
            </Box>
    </Box>
  )
}

export default Coaches;