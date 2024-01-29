import { IoMdCash } from "react-icons/io";

const SubscriptionPage = () => {
    return (
        <>
            <div className="flex flex-row items-center gap-x-2 pt-5 px-6">
                <IoMdCash className=" text-3xl text-orange-600"/>
                <h1 className="text-2xl font-bold text-orange-600">Subscription</h1>
            </div>

            <div className="flex flex-row items-center justify-center gap-x-2 pt-5 px-6">
                <h1 className="flex flex-row text-6xl items-center justify-center font-bold">Get Personalized Follow Ups</h1>
            </div>
            <div className="flex flex-row items-center gap-x-2 pt-5 px-6">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src="developer.jpg" alt="Card" className="w-full" />
            <div className="px-6 py-4">
              <h1 className="font-bold text-xl mb-2">Developer Pack</h1>
              <p className="text-gray-700 text-base mb-2">Get Curated Online Classes with Experts in the Field, Have a Concrete road map to follow with the acquired skills gained on our platform.</p>
              <p className="text-gray-500">FCFA 10,000 /Mo</p>
            </div>
            <div className="px-6 py-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Make Payment
              </button>
            </div>
            </div>
            </div>
            
            {/* <div className="flex flex-row items-center justify-center gap-x-2 pt-10 px-6">
                <p className="text-2xl">Explore Solux E-Learning, your gateway to online classes and guided roadmaps. Our subscription provides access to comprehensive courses and curated learning paths. From interactive online classes to structured roadmaps, we offer a tailored learning experience. Join us now to level up your skills in web development and IT. Start your journey with Solux E-Learning today!</p>
            </div> */}

        </> 
        
     );
}
 
export default SubscriptionPage;