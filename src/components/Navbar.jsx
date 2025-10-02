import Logo from "../assets/images/logo.png"
function Navbar() {
  return (
    <div className="w-full flex place-content-between gap-4 p-5 px-10 pt-7 fixed z-100">
      {/* logo */}
      <div className="flex">
        <div className="h-15 w-15">
          <img src={Logo} alt="" />
        </div>

        {/* logo font */}
        <div className="flex flex-col items-center w-29 h-15 ">
          <h1 className="font-bold text-[19px]">Blood Bank</h1>
          <h2 className="font-bold">Near Me</h2>
        </div>
      </div>
      <div className="flex gap-8 mt-3">
        
        <a href="">Donate Blood</a>
        <a href="">About us</a>
        <a href="">FAQs</a>
        <a href="">Contact us</a>
      </div>
    </div>
  )
}

export default Navbar
