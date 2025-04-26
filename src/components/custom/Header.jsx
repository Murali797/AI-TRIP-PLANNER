import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [openDialog, setOpenDialog] = useState(false)
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    if (user && !localStorage.getItem("seenCreateTripHint")) {
      toast("Tap '+ Create Trips' to build your first journey!", { duration: 5000 })
      localStorage.setItem("seenCreateTripHint", "true")
    }
  }, [user])

  useEffect(() => {
    if (clicks === 5) {
      toast("✨ Hidden travel deals unlocked! (Coming soon)")
      setClicks(0)
    }
  }, [clicks])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  })

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data))
        setOpenDialog(false)
        window.location.reload()
      })
  }

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between flex-wrap sm:flex-nowrap gap-4">
      <a href="/" className="flex-shrink-0">
        <motion.img
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          src="/logomain2.jpg"
          alt="Logo"
          className="h-10 sm:h-12 w-auto object-contain"
        />
      </a>

      <nav className="flex items-center gap-4 flex-wrap justify-center sm:justify-end w-full sm:w-auto text-center sm:text-left">
        {user ? (
          <>
            <div className="text-sm text-gray-500 font-bold w-full sm:w-auto text-center sm:text-left">
              {getGreeting()}, {user?.given_name || "traveler"}!
            </div>

            <motion.a whileTap={{ scale: 0.95 }} href='/create-trip'>
              <Button className="rounded-full font-semibold bg-violet-600 text-white hover:bg-violet-700 transition cursor-pointer">
                + Create Trips
              </Button>
            </motion.a>

            <motion.a whileTap={{ scale: 0.95 }} href='/my-trips'>
              <Button className="rounded-full font-semibold bg-slate-100 text-slate-900 hover:bg-slate-200 transition cursor-pointer">
                My Trips
              </Button>
            </motion.a>

            <Popover>
              <PopoverTrigger>
                <motion.img
                  whileHover={{ rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setClicks(prev => prev + 1)}
                  src={user?.picture}
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full hover:ring-2 hover:ring-violet-500 transition"
                />
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2 text-center text-sm">
                <p
                  className="cursor-pointer text-red-500 font-medium hover:underline"
                  onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    toast.success("Logged out successfully")
                    setTimeout(() => window.location.reload(), 500)
                  }}
                >
                  Logout
                </p>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setOpenDialog(true)}
              className="bg-violet-600 text-white rounded-full hover:bg-violet-700 transition"
            >
              Sign In
            </Button>
          </motion.div>
        )}
      </nav>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
          <DialogTitle>Sign In</DialogTitle> 
            <DialogDescription className="flex flex-col items-center gap-4 text-center">
              <img src="/logomain2.jpg" alt="Logo" className="h-12" />
              <h2 className="font-bold text-xl mt-2">Welcome Back</h2>
              <p className="text-gray-500 text-sm">Sign in to manage your trips with ease</p>
              <Button
                onClick={login}
                className="w-full mt-4 flex gap-3 items-center justify-center bg-slate-100 text-slate-900 hover:bg-slate-200"
              >
                <FcGoogle className="w-6 h-6 cursor-pointer" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header
