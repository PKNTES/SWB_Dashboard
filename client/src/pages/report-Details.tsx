import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from"@refinedev/core"
import { useParams, useNavigate } from "react-router-dom";
import { ChatBubble, Delete, Edit, Phone, Place, Star } from "@mui/icons-material";
import { CustomButton } from "components";

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const ReportDetails = () => {

  const navigate = useNavigate();
  const { data: user } = useGetIdentity<{name: string, email: string}>();
  const  { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult} = useShow();

  const { data, isLoading, isError} = queryResult;

  const reportDetails = data?.data ?? {};

  if (isLoading) {
    return <div>Loading...</div>;
}

if (isError) {
    return <div>Something went wrong!</div>;
}

  const isCurrentUser = user?.email === reportDetails.creator.email;

  const handleDeleteReport = () => {
    const response = window.confirm(
        "Are you sure you want to delete this report?",
    );
    if (response) {
        mutate(
            {
                resource: "reports",
                id: id as string,
            },
            {
                onSuccess: () => {
                    navigate("/reports");
                },
            },
        );
    }
};

  return (
    <Box
    borderRadius="15px"
    bgcolor="#FCFCFC"
            width="fit-content"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Report Details
            </Typography>
            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={reportDetails.photo}
                        alt="player_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="player_details-img"
                    />
                     <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {reportDetails.position}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {reportDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#808191" }} />
                                    <Typography fontSize={14} color="#808191">
                                        {reportDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    Team
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#475BE8"
                                    >
                                        {reportDetails.team}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        mb={0.5}
                                    >
                                        2023   
                                    </Typography>
                                    
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" marginLeft="10px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {reportDetails.description}
                            </Typography>
                        </Stack>
                        </Box>
                        </Box>
                            
                        <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(reportDetails.creator.avatar)
                                        ? reportDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {reportDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Coach
                                </Typography>
                            </Box>


                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                   {reportDetails.location}
                                </Typography>
                            </Stack>


                        <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {reportDetails.creator.allReports.length}{" "}
                                
                            </Typography>
                            </Stack>
                        

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/players/edit/${reportDetails._id}`,
                                        );
                                    }
                                }}
                            />
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteReport();
                                }}
                            />
                        </Stack>
                        </Stack>
                    

                    <Stack>
                        <img
                            src="https://res.cloudinary.com/docoawqcl/image/upload/v1683041436/OIHS.png"
                            width="100%"
                            height={306}
                            alt="pic"
                            style={{ borderRadius: 10, objectFit: "cover" }}
                        />
                    </Stack>

                   

</Box>
    </Box>
    </Box>
    
  );
};


export default ReportDetails;