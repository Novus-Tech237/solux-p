const EmptyState = () => {
    return ( 
    <div className="h-full">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 h-full flex justify-center items-center bg-cover"
        style = {{
            backgroundImage: "url('/BG.jpg')",  
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat', opacity: 0.5}}
      >
        <div className="text-center items-center flex flex-col">
          <h3 className="mt-2 text-lg font-semibold text-white bg-orange-300 p-2 rounded-full">
            Select a chat to start messaging
          </h3>
        </div>
      </div>
    </div>
      
    );
  }
   
  export default EmptyState;
  