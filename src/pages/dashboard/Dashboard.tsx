import React from 'react'
// import SearchHeader from '../../components/searchHeader/SearchHeader'
import InfoHeader from '../../components/infoheader/InfoHeader'
import MarketOptionsOffers from '../../components/marketOptions/MarketOptionsOffers'
import Commodities from '../../components/commodities/Commodities'
import trendingCommodities from "../../assets/icons/trendingComodities.svg"
import searchIcon from "../../assets/icons/searchIcon.svg"
import HeaderBar from '../../components/searchHeader/HeaderBar'
// import trendingStocks from "../../assets/icons/trendingStocks.svg"
// import BottomBar from '../../components/bottomBar/BottomBar'


const Dashboard = () => {
  return (
    <>
      {/* <SearchHeader/> */}
      <HeaderBar
        showSearch
        rightIcons={<img src={searchIcon} className="w-[15px] h-[15px]" />}
      />
      <InfoHeader />
      <MarketOptionsOffers />
      <Commodities icon={trendingCommodities} label='Trending Commodities' />
      <Commodities icon={trendingCommodities} label='Trending Stocks' />
      {/* <BottomBar/> */}
    </>
  )
}

export default Dashboard
