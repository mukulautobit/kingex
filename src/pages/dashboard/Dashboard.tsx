import { useEffect, useState } from 'react'
// import SearchHeader from '../../components/searchHeader/SearchHeader'
import InfoHeader from '../../components/infoheader/InfoHeader'
import MarketOptionsOffers from '../../components/marketOptions/MarketOptionsOffers'
import Commodities from '../../components/commodities/Commodities'
// import trendingCommodities from "../../assets/icons/trendingComodities.svg"
import searchIcon from "../../assets/icons/searchIcon.svg"
import HeaderBar from '../../components/searchHeader/HeaderBar'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { fetchCategories } from '../../store/slices/categoriesSlice'
import stocksIcon from "../../assets/icons/tradingstocks.svg"
import { fetchAccounts } from '../../store/slices/accountSlice'

// import trendingStocks from "../../assets/icons/trendingStocks.svg"
// import BottomBar from '../../components/bottomBar/BottomBar'


const Dashboard = () => {

  const [search, setSearch] = useState("");

  const { data } = useAppSelector(state => state.categories);
  const apiStatus = useAppSelector(state => state.websockets.apiStatus);
  const dispatch = useAppDispatch()
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchAccounts())
    console.log("FETCH ACCOUNTS")
  }, [])

  // console.log(data)
  useEffect(() => {
    if (apiStatus === 'connected') {
      dispatch(fetchCategories())
    }

  }, [apiStatus, dispatch])

  useEffect(() => {
    const reqCategories = data.filter((cat) => cat === 'stock')
    // console.log(reqCategories)
    setCategories(reqCategories)
  }, [data])

  return (
    <>
      {/* <SearchHeader/> */}
      <HeaderBar
        showSearch
        rightIcons={<img src={searchIcon} className="w-[15px] h-[15px]" />}
        placeholder="Search"
        onSearchChange={(value) => setSearch(value)}
      />
      <InfoHeader />
      <MarketOptionsOffers />
      {
        categories?.map((cat) => (

          <Commodities icon={stocksIcon} label={cat.toUpperCase()} search={search} />
        ))
      }
      {/* <Commodities icon={trendingCommodities} label='Trending Stocks' /> */}
      {/* <BottomBar/> */}
    </>
  )
}

export default Dashboard
