import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({
    location: null,
    budget: "",
    traveler: "",
    noOfDays: 1, // Default value for days
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    // Ensure the value for noOfDays is valid
    if (name === "noOfDays" && (value > 5 || value < 1)) {
      toast.error("Please enter days between 1 and 5.");
      return;
    }

    // Update formData with the new value
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler ||
      !formData?.noOfDays ||
      formData.noOfDays > 5
    ) {
      toast.error("Please fill all the details correctly!");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location?.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const rawText = result?.response?.text();
      const tripJson = JSON.parse(rawText);
      await SaveAiTrip(tripJson);
    } catch (err) {
      console.error("Generate Trip Error:",err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (tripJson) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const dockId = Date.now().toString();
    await setDoc(doc(db, "AITrips", dockId), {
      userSelection: formData,
      tripData: tripJson,
      userEmail: user?.email,
      id: dockId,
    });
    navigate("/view-trip/" + dockId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="p-5 sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd]

 min-h-screen">
      <motion.h2
        className="font-bold text-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Let’s Craft Your Perfect Escape ✨
      </motion.h2>

      <motion.p
        className="mt-3 text-gray-600 text-xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Tell us a few details — and we’ll build a personalized itinerary just for you. 🌍🛫
      </motion.p>

      <motion.div
        className="mt-20 flex flex-col gap-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {/* Location */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-xl my-3 font-medium">Where do you want to go? 🌎</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange("location", value);
              },
            }}
          />
        </motion.div>

        {/* Days */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <h2 className="text-xl my-3 font-medium text-slate-800">How long is your adventure? 🗺️</h2>
<p className="text-sm text-slate-600">Max 5 days</p>

          <Input
            placeholder="Ex. 3"
            className='bg-white'
            type="number"
            value={formData?.noOfDays || ""}
            onChange={(e) => {
              const days = parseInt(e.target.value, 10);
              if (days > 5 || days < 1) {
                toast.error("Please enter days between 1 and 5.");
                return;
              }
              handleInputChange("noOfDays", days);
            }}
          />
        </motion.div>

        {/* Budget */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-xl my-3 font-medium">What's your budget range? 💸</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg 
                hover:shadow ${formData?.budget === item.title && "shadow-lg border-black"}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Travelers */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-xl my-3 font-medium">Who’s coming with you? 👯‍♂️</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg 
                hover:shadow ${formData?.traveler === item.people && "shadow-lg border-black"}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Generate Button */}
      <motion.div className="p-5 justify-end flex" whileHover={{ scale: 1.03 }}>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="bg-violet-50 border-2 border-violet-600 text-violet-700 hover:bg-violet-700 hover:border-violet-700 hover:text-white text-md px-6 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out cursor-pointer"


        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin cursor-pointer" />
              <span className="ml-2">We are working on it...</span>
            </>
          ) : (
            <>✨ Generate My Trip</>
          )}
        </Button>
      </motion.div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange = {setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/main_logo1.jpg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google 🔑</h2>
              <p>Sign in to the App with Google authentication</p>
              <Button
                onClick={login}
                className="w-full mt-5 cursor-pointer flex gap-4 items-center"
              >
                <FcGoogle className="w-7 h-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
