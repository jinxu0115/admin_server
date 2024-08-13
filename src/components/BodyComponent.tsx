import CallLogTable from './small-component/CallLogTable'
import NameIpPairTable from './small-component/NameIpPairTable'

export default function BodyComponent() {
  return (
    <div className="w-full h-full p-5 flex">
      <div className="w-1/4">
        <NameIpPairTable/>
      </div>
      <div className="w-3/4">
        <CallLogTable/>
      </div>
    </div>
  )
}