import Dropdown from "./small-component/Dropdown";

export default function Header(){
  return (
    <div className="h-20 px-10 py-5 border-b border-gray-400 bg-white flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <img className="h-12" src="/logo.png"/>
          <div className="ml-3 text-3xl font-bold">Server</div>
        </div>
        <div>
          <Dropdown/>
        </div>
      </div>
    </div>
  )
}