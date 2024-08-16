import Dropdown from "./small-component/Dropdown";

interface Authority {
  authority: string;
}

interface UserInfoInterface {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  lastName?: string;
  role?: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  authorities?: Authority[];
}

interface HeaderProps {
  userInfo: UserInfoInterface;
}

export default function Header({ userInfo }: HeaderProps) {
  return (
    <div className="h-20 px-10 py-5 border-b border-gray-400 bg-white flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <img className="h-12" src="/logo.png" alt="Logo" />
          <div className="ml-3 text-3xl font-bold">Server</div>
        </div>
        <div>
          <Dropdown userInfo={userInfo}/>
        </div>
      </div>
    </div>
  );
}