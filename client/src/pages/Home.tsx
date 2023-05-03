
import { Box, Typography, Stack } from "@mui/material";
import { useList } from "@refinedev/core"
import { pieChart,  TotalReports, CoachCard,PlayerCard, TopCoach } from "components";
import PieChart from "components/charts/pieChart";
import CoachReports from "components/charts/coachReports";


  const Home = () => {
    const { data, isLoading, isError } = useList({
        resource: "players",
        config: {
            pagination: {
                pageSize: 4,
            },
        },
    });

    const latestReports = data?.data ?? [];

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong!</Typography>;

  return (
    <Box>

      <Typography fontSize={25} fontWeight={700} color='primary'>
        Soccer Without Borders Dashboard
      </Typography>

      <Box mt='20px' display="flex" flexWrap="wrap" gap={4}>
        <PieChart title="Player Reports" value={1000} series={[75, 25]} colors={['#475be8', "#e4e8ef"]} />
        <PieChart title="New Players" value={150} series={[15, 85]} colors={['#475238', "#e228ef"]} />
        <PieChart title="Current Players" value={750} series={[75, 25]} colors={['#475bfa', "#eee81f"]} />
        <PieChart title="Alumni" value={100} series={[10, 90]} colors={['#1df3e8', "#ea551f"]} />

      </Box>
      <Stack mt="25px" width="100%" direction={{ xs: 'column', lg: "row" }} gap={4}>
        <TotalReports />
        <CoachReports />
        </Stack>
          <Box flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px">
                  <Typography fontSize="18px" fontWeight={600} color="#11142d">
                    Latest Player Reports
                </Typography>
                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestReports.map((player) => (
                        <PlayerCard
                            key={player._id}
                            id={player._id}
                            title={player.title}
                            location={player.location}
                            team={player.team}
                            photo={player.photo}
                            position={player.position}
                        />
                    ))}
                </Box>

          </Box>

    </Box>
  );
}

export default Home