import React,{useEffect} from "react";
import {FcGoogle} from 'react-icons/fc';
import { app } from "../config/firebase.config";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const Login = ({setAuth}) => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();



    const loginWithGoogle = async () => {
        //console.log("Hai");
        await signInWithPopup(firebaseAuth,provider).then((userCred) => {
           setAuth(true);
           window.localStorage.setItem("auth","true");
            firebaseAuth.onAuthStateChanged((userCred)=>{
                if(userCred){
                    userCred.getIdToken().then((token) =>{
                        //console.log(token);
                        validateUser(token).then((data) => {
                            dispatch({
                                type: actionType.SET_USER,
                                user: data,
                              });
                        })
                       
                    })
                    navigate("/",{replace : true})
                }
                else{
                    setAuth(false);
                    dispatch({
                        type: actionType.SET_USER,
                        user: null,
                      });
                    navigate("/login");
                }
            })
        })
    }

    useEffect(() => {
        if(window.localStorage.getItem("auth") === "true"){     
              navigate("/",{replace : true})
        }
    
      
    }, [])
    

    return (
        <div className="relative w-screen h-screen">
            <video
        src="https://firebasestorage.googleapis.com/v0/b/music-app-7d0c4.appspot.com/o/assests%2Fvideo.mp4?alt=media&token=f8e554d5-e183-4549-812d-6706565a2708"
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      ></video>
          <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
                <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center  gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
                    onClick={loginWithGoogle}
                    >
                        <FcGoogle className="text-xl"/>
                        Sign in With Google
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Login