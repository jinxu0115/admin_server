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
    <div className="h-20 px-10 py-5 border-b border-[#222e44] flex items-center bg-[#222e44] ml-[319px] fixed w-[calc(100%-320px)] z-50">
      {
        userInfo.id &&
        <div className="flex items-center justify-end w-full">
          <div>
            <Dropdown userInfo={userInfo}/>
          </div>
        </div>
      }
    </div>
  );
}