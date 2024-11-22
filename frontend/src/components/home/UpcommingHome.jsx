import { useDispatch, useSelector } from "react-redux";
import SingleAuction from "../SingleAuction";
import { getUpcomingAuctions } from "../../store/auction/auctionSlice";
import { useEffect, useState } from "react";


const UpcommingHome = () => {

  const dispatch=useDispatch();
  const {upComingAuctions} = useSelector((state) => state.auction);
  const [upComingAuctionsData, setUpComingAuctionsData] = useState([]);

  useEffect(() => {
    dispatch(getUpcomingAuctions())
  } , []);

  useEffect(() => {

    setUpComingAuctionsData(upComingAuctions);
    
  }, [upComingAuctions]);

  return (
    <>
      <div className="">
        <h2 className="text-3xl font-bold text-black mb-5 text-left">Upcoming </h2>

        <swiper-container
          breakpoints={JSON.stringify({
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          })}
          style={{
            "--swiper-navigation-color": "black",
          }}
          navigation="true"
          slides-per-view="1"
          space-between="16"
        >
          {upComingAuctionsData.map((item) => (
            <swiper-slide key={item._id}>
              <SingleAuction
                name={item?.name}
                startingPrice={item?.startingPrice}
                image={item?.image}
                endTime={item?.endTime}
                startTime={item?.startTime}
                id={item?._id}
                status={item.status}
                sellerImage={item?.seller?.profilePicture}
                sellerName={item?.seller?.fullName}
                sellerId={item?.sellerId}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
};

export default UpcommingHome;