import  { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import { Box, Stack, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PlayerCard, CustomButton } from "components";
import { PlayerDetails } from "pages";
import { useMemo } from "react";



const AllPlayers = () => {
  const navigate = useNavigate();

  const {tableQueryResult: {data, isLoading, isError}, current, setCurrent, setPageSize,
          pageCount, sorters, setSorters, filters, setFilters    } = useTable();
          

  const allPlayers = data?.data ?? [];

  const currentTeam = sorters.find((item) => item.field === 'team' )?.order;
   
      
  
  


  const toggleSort = (field: string ) => {
    setSorters([{ field, order: currentTeam === 'asc' ? 'desc' : 'asc'}])
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => 
      'field' in item ? item : [],
    );

    return {
      title: 
        logicalFilters.find((item) => item.field === 'title')?.value || "",
      position:
        logicalFilters.find((item) => item.field === 'position')?.value || "",
    };
  }, [filters]);
  
  
  if(isLoading) return <Typography> Loading...</Typography>
  if(isError) return <Typography> Error...</Typography>

  return (
    <Box>
      <Box mt="20px" sx={{ display: 'flex' , flexWrap: 'wrap', gap:3}}>
          <Stack direction='column' width='100%' > 
              <Typography fontSize={25} fontWeight={700} color="primary">
                {!allPlayers.length ? 'There are no players' : 'All Players' } </Typography>
                <Box mb={2} mt={3} width="84%" justifyContent="space-between" flexWrap="wrap">

                  <Box display='flex' gap={2} flexWrap="wrap" mb={{xs: '20px', sm: '0'}}>

                    <CustomButton  
                    title={`Sort team ${currentTeam === 
                      'asc' ? '↑' : '↓' }`}
                    handleClick={() => toggleSort('team')}
                    backgroundColor="#475be8"
                    color="#fcfcfc" />

                    <TextField 
                      variant="outlined" color='info' placeholder="Search by Name"
                      value={currentFilterValues.title}
                      onChange={(e) => {
                        setFilters([
                          {
                          field: 'title',
                          operator: 'contains',
                          value: e.currentTarget.value ? e.currentTarget.value : undefined,

                        },
                      ]);
                      }}
                    />
                     <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value={currentFilterValues.position}
                                onChange={(e) => {
                                    setFilters(
                                        [
                                            {
                                                field: "position",
                                                operator: "eq",
                                                value: e.target.value,
                                            },
                                        ],
                                        "replace",
                                    );
                                }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {[
                                    "Striker",
                                    "Midfielder",
                                    "Defender",
                                    "GoalKeeper",

                                ].map((type) => (
                                    <MenuItem
                                        key={type}
                                        value={type}
                                    >
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>

                  </Box>

                </Box>
          </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" >
        
        <CustomButton 
          title= "Add Player"
          handleClick={() => navigate('/players/create')}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
          />
      </Stack>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3}}>
        {allPlayers.map((player) => ( 
         <PlayerCard
            key={player._id}
            id={player._id}
            title={player.title}
            team={player.team}
            position={player.position}
            location={player.location}
            photo={player.photo}
            
            
         />

        ) 
        )}

      </Box>
      {allPlayers.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap"> 
            <CustomButton 
              title="Previous"
              handleClick={() => setCurrent((prev) => prev - 1)} backgroundColor="#475be8"
              color="#fcfcfc"
              disabled={!(current > 1)}/>
              <Box display={{xs: 'hidden', sm: 'flex'}}
                  alignItems="center" gap="5px">
                    Page<strong> {current} of { pageCount} </strong>

              </Box>
              <CustomButton 
              title="Next"
              handleClick={() => setCurrent((prev) => prev + 1)} backgroundColor="#475be8"
              color="#fcfcfc"
              disabled={(current === pageCount)}/>
             <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{'aria-label' : 'Without label'}}
                        defaultValue={`10`}
                        
                        
                        onChange={(e) => {
                          setPageSize(
                            
                             e.target.value? Number(e.target.value) : 10,
  
                          
                          )
                        }}
                        > 

                        { [10,20,30,40,50].map((size) => (
                          <MenuItem key={size} value={size }>Show {size} </MenuItem>
                        ))}
                        

                    </Select>
        </Box>
      )}

    </Box>
  )

  };
export default AllPlayers;