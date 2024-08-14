import CallLogTable from './small-component/CallLogTable'
import NameIpPairTable from './small-component/NameIpPairTable'

export default function BodyComponent() {
  return (
    <div className="w-full h-full p-5 lg:flex block gap-3">
      <div className="lg:w-1/4 w-full">
        <NameIpPairTable/>
      </div>
      <div className="lg:w-3/4 w-full">
        <CallLogTable/>
      </div>
    </div>
  )
}