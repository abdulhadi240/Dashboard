// ** MUI Imports
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {

  const [timestamp, setTimestamp] = useState(null);
  const [sign, setSign] = useState(null);
  const [orders, setOrders] = useState([]);
  const secret = "28e470e1bb4c937b41281c7046edef8552a10402";
  const appKey = "6b7r8522daq2r";
  const accessToken = "TTP_9YL5PQAAAAC7Vga5PPlGWG9yFH-qQilqTuVqoyOTo0qDq8ms8o8w0GAlny2J6nJyRfjfDlECR1MzKM5OzzZv_OoU9jpCer9pXxo10PquRYHtElytXzU68i_7h_mS5nYVrnYG88xNR4kgl64xOMLWXQCaUslW5v5LKwuSPAtuJI1EN1Q8aJgw1g";

  useEffect(() => {
    const calSign = () => {
      const ts = Math.floor(new Date().getTime() / 1000);
      const queryParams = {
        timestamp: ts,
        app_key: appKey,
        access_token: accessToken,
      };

      const sortedParams = Object.keys(queryParams).sort().reduce((acc, key) => {
        acc[key] = queryParams[key];
        return acc;
      }, {});

      let signString = secret;
      for (const key in sortedParams) {
        signString += key + sortedParams[key];
      }
      signString += secret;

      const calculatedSign = CryptoJS.HmacSHA256(signString, secret).toString();

      // Update state with timestamp and sign
      setTimestamp(ts);
      setSign(calculatedSign);

      console.log("Sign:", calculatedSign);
      console.log("Timestamp:", ts);
    };

    calSign();

    // Make the API call
    const fetchData = async () => {
      try {
        const response = await fetch(`https://open-api.tiktokglobalshop.com/api/orders/search?app_key=${appKey}&access_token=${accessToken}&sign=${sign}&timestamp=${timestamp}`, {
          method: 'POST',
          mode:'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page_size: 100,
          }),
        });

        const data = await response.json();
        console.log(data)
        setOrders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [timestamp, sign, appKey, accessToken, secret]);
  // eslint-disable-next-line newline-before-return
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid> */}
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid> */}
        {/* <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid> */}
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    <div>
      {/* Your component content */}
      <p>Timestamp: {timestamp}</p>
      <p>Sign: {sign}</p>
      <pre>Orders: {JSON.stringify(orders, null, 2)}</pre>
    </div>
    </ApexChartWrapper>
  )
}

export default Dashboard
