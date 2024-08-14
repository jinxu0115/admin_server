'use client'
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function ViewMedia(){
  const router = useRouter()
  useEffect(() => {
    console.log(router.query)
  }, [router])
  return (
    <div>
      sadf
    </div>
  )
}