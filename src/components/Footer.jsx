const Footer = () => {
    return (
      <footer className="bg-black text-white py-8 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-5xl font-bold logoFont">Movie Space</div>

          <div className="flex interFont space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">LinkedIn</a>
            <a href="#" className="hover:text-gray-400">Github</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
          </div>

          <div className="text-sm mt-4 md:mt-0 interFont">Made by Artem Posudevskyi</div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  