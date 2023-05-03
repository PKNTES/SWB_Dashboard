import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, Select, MenuItem, Button } from "@mui/material";
import { FormProps } from "interfaces/common";
import  CustomButton  from "./CustomButton"


const Form = ({type, register, handleSubmit, handleImageChange, 
  formLoading, onFinishHandler, playerImage}: FormProps) => {
    return (
  <Box>
    <Typography fontSize={25} fontWeight={700} color="primary">
      {type} A Player 
    </Typography>
    <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="dark">
        <form 
            style={{
               marginTop: '20px',
                width: "100%",
                 display: 'flex',
                  flexDirection: "column",
                   gap: '20px' }}
                    onSubmit={handleSubmit(onFinishHandler)}>
          <FormControl>
            <FormHelperText 
                sx={{fontWeight: 500,
                     margin:'10px 0',
                      fontSize: 16,
                        color: "primary"}}>Enter Player Name
            </FormHelperText>
            <TextField fullWidth required id="outlined-basic" color="info" variant="outlined" {...register('title', { required: true})} />
          </FormControl>
           <FormControl>
            <FormHelperText sx={{fontWeight: 500, margin:'10px 0', fontSize: 16,  color: "primary"}}>Enter Player Team
            </FormHelperText>
            <TextField fullWidth required id="outlined-basic" color="info" variant="outlined" {...register('team', { required: true})} />
          </FormControl>
          <FormControl>
            <FormHelperText sx={{fontWeight: 500, margin:'10px 0', fontSize: 16,  color: "primary"}}>Enter Player Location
            </FormHelperText>
            <TextField fullWidth required id="outlined-basic" color="info"  variant="outlined" {...register('location', { required: true})} />
          </FormControl>
          
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "primary",
                                }}
                            >
                                Select Player Position
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="primary"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                {...register("position", {
                                    required: true,
                                })}
                            >
                                <MenuItem value="GoalKeeper">GoalKeeper</MenuItem>
                                <MenuItem value="Defender">Defender</MenuItem>
                                <MenuItem value="Midfielder">Midfielder</MenuItem>
                                <MenuItem value="Striker">Striker</MenuItem>
                                
                            </Select>
                        </FormControl>
                  
          <FormControl>
            <FormHelperText sx={{fontWeight: 500, margin:'10px 0', fontSize: 16,  color: "primary"}}>Enter Player Report
            </FormHelperText>
          <TextareaAutosize minRows={5} required placeholder="Write a player report description using SWB Behavioral Health Model" color="info" style={{width: '100%', background: 'transparent', fontSize: '16px', borderColor: 'rgba(0,0,0,0.23)', borderRadius: 6, padding:10, color: "#EC407A"}}  {...register('description', { required: true})}/>
          </FormControl> 
           <Stack direction="column" gap={1} justifyContent="center" mb={2} >
            <Stack direction="row" gap={2} >
              <Typography fontSize={16} fontWeight={500} my="10px">
                Player/Coach Photo
              </Typography>
              <Button component="label" sx={{ width: 'fit-content',backgroundColor:"#ce93d8" , color: "black", textTransform: 'capitalize', fontSize: 16}}> Upload*
               <input hidden accept='image/*' type="file" onChange={( e: React.ChangeEvent<HTMLInputElement>) => { 
                
               handleImageChange(e.target.files![0])}} />
               </Button>

            </Stack>
            <Typography fontSize={14} sx={{wordBreak: "break-all"}}>
              {playerImage?.name}
            </Typography>

          </Stack> 
          <CustomButton  
            type="submit"
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor="#ce93d8"
            color="black"
            />
          
        </form>
    </Box>
  </Box> 
  );
  };
export default Form;