import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";

import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { actionType } from "../Context/reducer";
import { getAllAlbums } from "../api";
import { deleteObject} from "firebase/storage";

const DashboardAlbum = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {allAlbums &&
          allAlbums.map((data, index) => (
            <>
              <AlbumCard key={index} data={data} index={index} />
            </>
          ))}
      </div>
    </div>
  );
};

export const AlbumCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative  overflow-hidden w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <img
        src={data?.imageURL}
        className="w-full h-40 object-cover rounded-md"
        alt=""
      />

      <p className="text-base text-textColor">{data.name}</p>

      <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>

      {isDelete && (
        <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        className="absolute z-10 p-2 inset-0 bg-card backdrop-blur-md flex flex-col gap-6 items-center justify-center"
      >
        <p className="text-sm text-center text-textColor font-semibold">
          Are you sure do you want to delete this song?
        </p>

        <div className="flex items-center gap-3">
          <button
            className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
            onClick={() => deleteObject(data._id)}
          >
            Yes
          </button>
          <button
            className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
            onClick={() => setIsDelete(false)}
          >
            No
          </button>
        </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardAlbum;