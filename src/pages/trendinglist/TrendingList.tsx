import React from 'react'
import lineFilter from "../../assets/icons/lineFilter.svg"
import searchtwo from "../../assets/icons/searchtwo.svg"
import leftarrow from "../../assets/icons/leftarrow.svg"
import { useNavigate } from 'react-router-dom'
import TrendingListDetails from '../../components/trendingListDetails/TrendingListDetails'
import TrendingListHeader from '../../components/tradingListHeader/TrendingListHeader'

const TrendingList = () => {



  return (
    <>
    
    <TrendingListHeader label='Trending List'/>
    <TrendingListDetails/>
    </>
  );
}

export default TrendingList
