import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ProcessHome = () => {
  return (
    <div>
      <h2 className="text-4xl font-medium text-black mb-10 text-left items-center flex gap-3">
        Create And Sell Your Products
        <FontAwesomeIcon icon={faArrowRight} className="text-black text-2xl" />
      </h2>
      <div className="grid grid-cols-1 m-auto gap-5 w-full md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col text-black gap-4 justify-start p-8 rounded-2xl border-2 border-gray-800">
          <h2 className="text-5xl font-bold">01</h2>
          <h3 className="text-2xl font-bold italic">Setup your Account</h3>
          <p className="text-xl font-normal">
            Register for a free account and unlock the power to sell anything,
            anytime.
          </p>
        </div>
        <div className="flex flex-col text-black gap-4 justify-start p-8 rounded-2xl border-2 border-gray-800">
          <h2 className="text-5xl font-bold">02</h2>
          <h3 className="text-2xl font-bold italic">Create Your Auction</h3>
          <p className="text-xl font-normal">
            Create a compelling listing that showcases your item and attracts
            potential buyers.
          </p>
        </div>
        <div className="flex flex-col text-black gap-4 justify-start p-8 rounded-2xl border-2 border-gray-800">
          <h2 className="text-5xl font-bold">03</h2>
          <h3 className="text-2xl font-bold italic">Add Starting Price for Bid</h3>
          <p className="text-xl font-normal">
            Determine your starting bid and consider a reserve price for added
            control.
          </p>
        </div>
        <div className="flex flex-col text-black gap-4 justify-start p-8 rounded-2xl border-2 border-gray-800">
          <h2 className="text-5xl font-bold">04</h2>
          <h3 className="text-2xl font-bold italic">List Product for Sale</h3>
          <p className="text-xl font-normal">
            Publish your Product and watch the bids come in, turning your unused
            items into revenue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessHome;
