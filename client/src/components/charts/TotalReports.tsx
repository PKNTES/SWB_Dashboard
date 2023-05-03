import React from 'react'
import { Box, Typography, Stack } from "@mui/material"
import { PieChartProps } from 'interfaces/home'
import ReactApexChart from 'react-apexcharts'
import { ArrowCircleUpRounded } from '@mui/icons-material'
import { TotalRevenueOptions, TotalRevenueSeries } from './chart.config'

const TotalReports = () => {
  return (
    <Box p={4} flex={1} bgcolor="#fcfcfc" id="chart" display="flex" flexDirection="column" borderRadius="15px">
        <Typography fontSize={18} fontWeight={600} color="secondary">
          Total Reports 
        </Typography>
        <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
          <Typography fontSize={28} fontWeight={700} color="primary"> 1000 Reports</Typography>
          <Stack direction="row" alignItems="center" gap={1}> <ArrowCircleUpRounded sx={{fontsize:25, color: "#475be8"}}/>
          <Stack>
            <Typography fontSize={15} color="#475be8">
              0.8%
            </Typography>
            <Typography fontSize={12} color="#808191">
              Than Last Month
            </Typography>
            </Stack></Stack>
        </Stack>
        <ReactApexChart 
          series={TotalRevenueSeries}
          type='bar'
          height={310}
          options={TotalRevenueOptions} />

        

    </Box>
  )
}

export default TotalReports