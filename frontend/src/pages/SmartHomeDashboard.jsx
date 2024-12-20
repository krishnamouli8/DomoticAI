// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Bell,
//   Plus,
//   Search,
//   Settings,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Card, CardContent, DeviceIcon } from "../components/SmartHomeComponents";
// import Modal from "../components/Modal";
// import Sidebar from "../components/Sidebar";
// import { bulbService } from "../services/bulbService";
// import { fanService } from "../services/fanService";

// const SmartHomeDashboard = () => {
  
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [bulbError, setBulbError] = useState(null);
//   const [fanError, setFanError] = useState(null);
//   const [devices, setDevices] = useState([
//     {
//       name: "Humidity Sensor",
//       type: "Humidity",
//       status: "off",
//       lastActive: "2 days",
//     },
//     {
//       name: "Temperature Sensor",
//       type: "Temperature",
//       status: "on",
//       lastActive: "Active",
//     },
//     {
//       name: "AC Unit",
//       type: "Air Conditioner",
//       status: "off",
//       lastActive: "1 hour",
//     },
//     {
//       name: "Main Lights",
//       type: "Lights",
//       status: "off",
//       lastActive: "27 min",
//     },
//     { name: "Router", type: "Wi-fi", status: "on", lastActive: "Active" },
//     { name: "Fan", type: "Fan", status: "off", lastActive: "2 hours" },
//   ]);

//   const stats = [
//     { value: "21", unit: "°C", label: "Living Room", sublabel: "Temperature" },
//     { value: "44", unit: "%", label: "Outside", sublabel: "Humidity" },
//     { value: "87", unit: "m²", label: "Water", sublabel: "Consumption" },
//     { value: "417", unit: "GB", label: "Internet", sublabel: "Usage" },
//   ];

//   const roomConsumption = [
//     { room: "Living Room", percentage: 15 },
//     { room: "Kitchen", percentage: 30 },
//     { room: "Attic", percentage: 15 },
//     { room: "Garage", percentage: 20 },
//     { room: "Basement", percentage: 20 },
//   ];

//   const handleAddDevice = (newDevice) => {
//     setDevices((prevDevices) => [...prevDevices, newDevice]);
//   };

//   const handleSidebarToggle = () => {
//     setIsExpanded(!isExpanded);
//   };  

  
//   useEffect(() => {
//     const fetchBulbStatus = async () => {
//       try {
//         const status = await bulbService.getBulbStatus();
//         setDevices((prevDevices) =>
//           prevDevices.map((device) =>
//             device.type === "Lights"
//               ? { ...device, status: status.state === "1" ? "on" : "off" }
//               : device
//           )
//         );
//       } catch (error) {
//         setBulbError("Failed to get bulb status");
//       }
//     };

//     fetchBulbStatus();
//   }, []);

//   useEffect(() => {
//     const fetchFanStatus = async () => {
//       try {
//         const status = await fanService.getFanStatus();
//         setDevices((prevDevices) =>
//           prevDevices.map((device) =>
//             device.type === "Fan"
//               ? { ...device, status: status.state === "1" ? "on" : "off" }
//               : device
//           )
//         );
//       } catch (error) {
//         setFanError("Failed to get fan status");
//       }
//     };

//     fetchFanStatus();
//   }, []);

//   const toggleDevice = async (index) => {
//     const device = devices[index];

//     if (device.type === "Lights") {
//       try {
//         setBulbError(null);
//         const newState = device.status === "off";
//         await bulbService.toggleBulb(newState);

//         setDevices((prevDevices) =>
//           prevDevices.map((dev, i) => {
//             if (i === index) {
//               const newStatus = dev.status === "on" ? "off" : "on";
//               return {
//                 ...dev,
//                 status: newStatus,
//                 lastActive: newStatus === "on" ? "Active" : "Just now",
//               };
//             }
//               return dev;
//           })
//         );
//       } catch (error) {
//         setBulbError("Failed to toggle bulb");
//         console.error("Error toggling bulb:", error);
//       }
//     } else if (device.type === "Fan") {
//       try {
//         setFanError(null);
//         const newState = device.status === "off";
//         await fanService.toggleFan(newState);

//         setDevices((prevDevices) =>
//           prevDevices.map((dev, i) => {
//             if (i === index) {
//               const newStatus = dev.status === "on" ? "off" : "on";
//               return {
//                 ...dev,
//                 status: newStatus,
//                 lastActive: newStatus === "on" ? "Active" : "Just now",
//               };
//             }
//             return dev;
//           })
//         );
//       } catch (error) {
//         setFanError("Failed to toggle fan");
//         console.error("Error toggling fan:", error);
//       }
//     } else {
//       setDevices((prevDevices) =>
//         prevDevices.map((device, i) => {
//           if (i === index) {
//             const newStatus = device.status === "on" ? "off" : "on";
//             return {
//               ...device,
//               status: newStatus,
//               lastActive: newStatus === "on" ? "Active" : "Just now",
//             };
//           }
//           return device;
//         })
//       );
//     }
//   };

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-gray-100">
//       <div className="fixed bottom-4 right-4 z-50 space-y-2">
//         {bulbError && (
//           <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
//             {bulbError}
//           </div>
//         )}

//         {fanError && (
//           <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
//             {fanError}
//           </div>
//         )}
//       </div>

//       <Sidebar
//       isExpanded={isExpanded}
//       onToggle={handleSidebarToggle}
//       onLogout={handleLogout}
//       />


//       <div
//         className={`flex-1 ${
//           isExpanded ? "ml-64" : "ml-16"
//         } transition-all duration-300 bg-gray-900`}
//       >
//         <header className="bg-gray-800/80 backdrop-blur-sm p-4 flex justify-between items-center shadow-sm border-b border-gray-700">
//           <div className="flex items-center space-x-4">
//             {/* <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="text-gray-400 hover:text-gray-200 transition-colors"
//             >
//               {isExpanded ? (
//                 <ChevronLeft className="w-6 h-6" />
//               ) : (
//                 <ChevronRight className="w-6 h-6" />
//               )}
//             </motion.button> */}
//             <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-400">
//               Smart Home
//             </h1>
//           </div>
//           <div className="flex items-center space-x-4 ">
//             <div className="relative">
//               <input
//                 type="search"
//                 placeholder="Search here"
//                 className="pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="text-gray-400 hover:text-gray-100 transition-colors"
//             >
//               <Settings className="h-6 w-6" />
//             </motion.button>
//             <div className="relative">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="text-gray-400 hover:text-gray-100 transition-colors"
//               >
//                 <Bell className="h-6 w-6" />
//               </motion.button>
//               <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
//             </div>
//           </div>
//         </header>

//         <div className="p-6 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {stats.map((stat, index) => (
//               <Card key={index} className="bg-gray-800 border-gray-700">
//                 <CardContent className="text-center">
//                   <motion.h2
//                     className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     {stat.value}
//                     <span className="text-2xl text-gray-500">{stat.unit}</span>
//                   </motion.h2>
//                   <p className="text-gray-300">{stat.label}</p>
//                   <p className="text-sm text-gray-500">{stat.sublabel}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent">
//               Connected Devices
//             </h2>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-violet-500/20"
//             >
//               <Plus className="h-5 w-5 mr-1" />
//               Add Device
//             </motion.button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {devices.map((device, index) => (
//               <Card
//                 key={index}
//                 className={`cursor-pointer transition-all duration-300 ${
//                   device.status === "on"
//                     ? "bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border-2 border-violet-700"
//                     : "bg-gray-800 border-2 border-gray-700"
//                 }`}
//                 onClick={() => toggleDevice(index)}
//               >
//                 <CardContent className="text-center">
//                   <DeviceIcon
//                     type={device.type}
//                     className={`h-10 w-10 mx-auto ${
//                       device.status === "on" ? "text-violet-400" : "text-gray-500"
//                     }`}
//                   />
//                   <h3 className="mt-2 text-xl font-bold text-gray-100">
//                     {device.name}
//                   </h3>
//                   <p className="text-gray-400">{device.lastActive}</p>
//                   <motion.div
//                     className={`mt-2 px-3 py-1 rounded-full text-sm inline-block ${
//                       device.status === "on"
//                         ? "bg-violet-900 text-violet-200"
//                         : "bg-gray-700 text-gray-300"
//                     }`}
//                     animate={{
//                       scale: device.status === "on" ? [1, 1.1, 1] : 1,
//                     }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {device.status === "on" ? "Active" : "Inactive"}
//                   </motion.div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent>
//               <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent">
//                 Room Energy Consumption
//               </h2>
//               <div className="space-y-4">
//                 {roomConsumption.map((room, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex justify-between text-sm text-gray-400">
//                       <span>{room.room}</span>
//                       <span>{room.percentage}%</span>
//                     </div>
//                     <motion.div
//                       className="h-2 bg-gray-700 rounded-full overflow-hidden"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <motion.div
//                         className="h-full bg-gradient-to-r from-violet-600 to-indigo-600"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${room.percentage}%` }}
//                         transition={{ duration: 1, delay: index * 0.1 }}
//                       />
//                     </motion.div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleAddDevice}
//       />
//     </div>
//   );
// };

// export default SmartHomeDashboard;






































import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, DeviceIcon } from "../components/SmartHomeComponents";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { bulbService } from "../services/bulbService";
import { fanService } from "../services/fanService";
import { temperatureService } from '../services/temperatureService';
import { humidityService } from '../services/humidityService';

const SmartHomeDashboard = () => {
  
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [bulbError, setBulbError] = useState(null);
  const [fanError, setFanError] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);     
  const [devices, setDevices] = useState([
    {
      name: "Humidity Sensor",
      type: "Humidity",
      status: "off",
      lastActive: "2 days",
    },
    {
      name: "Temperature Sensor",
      type: "Temperature",
      status: "on",
      lastActive: "Active",
    },
    {
      name: "AC Unit",
      type: "Air Conditioner",
      status: "off",
      lastActive: "1 hour",
    },
    {
      name: "Main Lights",
      type: "Lights",
      status: "off",
      lastActive: "27 min",
    },
    { name: "Router", type: "Wi-fi", status: "on", lastActive: "Active" },
    { name: "Fan", type: "Fan", status: "off", lastActive: "2 hours" },
  ]);

  const stats = [
    { value: "21", unit: "°C", label: "Living Room", sublabel: "Temperature" },
    { value: "44", unit: "%", label: "Outside", sublabel: "Humidity" },
    { value: "87", unit: "m²", label: "Water", sublabel: "Consumption" },
    { value: "417", unit: "GB", label: "Internet", sublabel: "Usage" },
  ];

  const roomConsumption = [
    { room: "Living Room", percentage: 15 },
    { room: "Kitchen", percentage: 30 },
    { room: "Attic", percentage: 15 },
    { room: "Garage", percentage: 20 },
    { room: "Basement", percentage: 20 },
  ];

  const handleAddDevice = (newDevice) => {
    setDevices((prevDevices) => [...prevDevices, newDevice]);
  };

  const handleSidebarToggle = () => {
    setIsExpanded(!isExpanded);
  };  

  
  useEffect(() => {
    const fetchBulbStatus = async () => {
      try {
        const status = await bulbService.getBulbStatus();
        setDevices((prevDevices) =>
          prevDevices.map((device) =>
            device.type === "Lights"
              ? { ...device, status: status.state === "1" ? "on" : "off" }
              : device
          )
        );
      } catch (error) {
        setBulbError("Failed to get bulb status");
      }
    };

    fetchBulbStatus();
  }, []);

  useEffect(() => {
    const fetchFanStatus = async () => {
      try {
        const status = await fanService.getFanStatus();
        setDevices((prevDevices) =>
          prevDevices.map((device) =>
            device.type === "Fan"
              ? { ...device, status: status.state === "1" ? "on" : "off" }
              : device
          )
        );
      } catch (error) {
        setFanError("Failed to get fan status");
      }
    };

    fetchFanStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const temperatureData = await temperatureService.getTemperature();
        setTemperature(temperatureData.temperature);
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    }, 15000); // Fetch temperature every 15 seconds
  
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const humidityData = await humidityService.getHumidity();
        setHumidity(humidityData.humidity);
      } catch (error) {
        console.error('Error fetching humidity:', error);
      }
    }, 10000); // Fetch humidity every 10 seconds
  
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = async (index) => {
    const device = devices[index];

    if (device.type === "Lights") {
      try {
        setBulbError(null);
        const newState = device.status === "off";
        await bulbService.toggleBulb(newState);

        setDevices((prevDevices) =>
          prevDevices.map((dev, i) => {
            if (i === index) {
              const newStatus = dev.status === "on" ? "off" : "on";
              return {
                ...dev,
                status: newStatus,
                lastActive: newStatus === "on" ? "Active" : "Just now",
              };
            }
              return dev;
          })
        );
      } catch (error) {
        setBulbError("Failed to toggle bulb");
        console.error("Error toggling bulb:", error);
      }
    } else if (device.type === "Fan") {
      try {
        setFanError(null);
        const newState = device.status === "off";
        await fanService.toggleFan(newState);

        setDevices((prevDevices) =>
          prevDevices.map((dev, i) => {
            if (i === index) {
              const newStatus = dev.status === "on" ? "off" : "on";
              return {
                ...dev,
                status: newStatus,
                lastActive: newStatus === "on" ? "Active" : "Just now",
              };
            }
            return dev;
          })
        );
      } catch (error) {
        setFanError("Failed to toggle fan");
        console.error("Error toggling fan:", error);
      }
    } else {
      setDevices((prevDevices) =>
        prevDevices.map((device, i) => {
          if (i === index) {
            const newStatus = device.status === "on" ? "off" : "on";
            return {
              ...device,
              status: newStatus,
              lastActive: newStatus === "on" ? "Active" : "Just now",
            };
          }
          return device;
        })
      );
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {bulbError && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
            {bulbError}
          </div>
        )}

        {fanError && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
            {fanError}
          </div>
        )}
      </div>

      <Sidebar
      isExpanded={isExpanded}
      onToggle={handleSidebarToggle}
      onLogout={handleLogout}
      />


      <div
        className={`flex-1 ${
          isExpanded ? "ml-64" : "ml-16"
        } transition-all duration-300 bg-gray-900`}
      >
        <header className="bg-gray-800/80 backdrop-blur-sm p-4 flex justify-between items-center shadow-sm border-b border-gray-700">
          <div className="flex items-center space-x-4">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              {isExpanded ? (
                <ChevronLeft className="w-6 h-6" />
              ) : (
                <ChevronRight className="w-6 h-6" />
              )}
            </motion.button> */}
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-400">
              Smart Home
            </h1>
          </div>
          <div className="flex items-center space-x-4 ">
            <div className="relative">
              <input
                type="search"
                placeholder="Search here"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <Settings className="h-6 w-6" />
            </motion.button>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                <Bell className="h-6 w-6" />
              </motion.button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">

        <div className="space-y-4">
  <div className="flex justify-between text-sm text-gray-400">
    <span>Temperature</span>
    <span>{temperature ? `${temperature}°C` : 'Loading...'}</span>
  </div>
  <motion.div
    className="h-2 bg-gray-700 rounded-full overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="h-full bg-gradient-to-r from-violet-600 to-indigo-600"
      style={{ width: temperature ? `${(temperature - 0) / (40 - 0) * 100}%` : '0%' }}
      transition={{ duration: 1 }}
    />
  </motion.div>

  <div className="flex justify-between text-sm text-gray-400">
    <span>Humidity</span>
    <span>{humidity ? `${humidity}%` : 'Loading...'}</span>
  </div>
  <motion.div
    className="h-2 bg-gray-700 rounded-full overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="h-full bg-gradient-to-r from-violet-600 to-indigo-600"
      style={{ width: humidity ? `${humidity}%` : '0%' }}
      transition={{ duration: 1 }}
    />
  </motion.div>
</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="text-center">
                  <motion.h2
                    className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {stat.value}
                    <span className="text-2xl text-gray-500">{stat.unit}</span>
                  </motion.h2>
                  <p className="text-gray-300">{stat.label}</p>
                  <p className="text-sm text-gray-500">{stat.sublabel}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent">
              Connected Devices
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-violet-500/20"
            >
              <Plus className="h-5 w-5 mr-1" />
              Add Device
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  device.status === "on"
                    ? "bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border-2 border-violet-700"
                    : "bg-gray-800 border-2 border-gray-700"
                }`}
                onClick={() => toggleDevice(index)}
              >
                <CardContent className="text-center">
                  <DeviceIcon
                    type={device.type}
                    className={`h-10 w-10 mx-auto ${
                      device.status === "on" ? "text-violet-400" : "text-gray-500"
                    }`}
                  />
                  <h3 className="mt-2 text-xl font-bold text-gray-100">
                    {device.name}
                  </h3>
                  <p className="text-gray-400">{device.lastActive}</p>
                  <motion.div
                    className={`mt-2 px-3 py-1 rounded-full text-sm inline-block ${
                      device.status === "on"
                        ? "bg-violet-900 text-violet-200"
                        : "bg-gray-700 text-gray-300"
                    }`}
                    animate={{
                      scale: device.status === "on" ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {device.status === "on" ? "Active" : "Inactive"}
                  </motion.div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent>
              <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent">
                Room Energy Consumption
              </h2>
              <div className="space-y-4">
                {roomConsumption.map((room, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{room.room}</span>
                      <span>{room.percentage}%</span>
                    </div>
                    <motion.div
                      className="h-2 bg-gray-700 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-600 to-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${room.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDevice}
      />
    </div>
  );
};

export default SmartHomeDashboard;




