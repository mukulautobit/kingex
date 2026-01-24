import React from 'react'
import HeaderBar from '../../components/searchHeader/HeaderBar'
import filterIcon from "../../assets/icons/lineFilter.svg"
// import searchtwo from "../../assets/icons/searchtwo.svg"
import plusIcon from "../../assets/icons/plusIcon.svg"
import InfoHeader from '../../components/infoheader/InfoHeader'
import { Link, useNavigate } from 'react-router-dom';
import CommoditiesItem from '../../components/commoditiesItem/CommoditiesItem'


const MyList = () => {

      const navigate = useNavigate();
     const handleCardClick = (index:number)=>{
        const data = {
            value : "970272",
            name : "abcd"
        }

        navigate("/instrumentDetails", {
            state : {
                instrumentData : data
            }
        })
    }

  return (
    <div>
      <HeaderBar
        title="Top 20 by Market Cap"
        rightIcons={
          <>
            <img src={filterIcon} className="w-6 h-6" />
            <img src={plusIcon} className="w-6 h-6" />
          </>
        }
      />
      <InfoHeader/>
      {/* COMMODOTIES COARD */}
        <div className="flex flex-col py-2.5 px-5">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div onClick={()=>{handleCardClick(index)}}>
                        <CommoditiesItem
                  tradeName={"SBI"}
                        exchange={"buy"}
                         ltp={5}
                    pnl={4}                 // ✅ FINAL VALUE PASSED
                timestamp={1769246240}
                        />
                    </div>
                ))}
            </div>
    </div>
  )
}

export default MyList

// 
