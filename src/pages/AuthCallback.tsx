import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const resolveAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session?.user) {
        navigate("/dashboard", { replace: true })
      } else {
        navigate("/", { replace: true })
      }
    }

    resolveAuth()
  }, [navigate])

  return null
}

export default AuthCallback
