// import React, { useState } from "react";
// import { db } from "./firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
// import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
// import logo from "./cpl logo.png"; // Import the image from the src folder

// const App = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     contactTime: "",
//     session: "",
//     message: "",
//     image: null,
//     imageUrl: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prevData) => ({
//         ...prevData,
//         image: file,
//         imageUrl: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let imageUrl = "";
//       if (formData.image) {
//         const storage = getStorage();
//         const storageRef = ref(storage, `images/${formData.image.name}`);
//         await uploadBytes(storageRef, formData.image);
//         imageUrl = await getDownloadURL(storageRef);
//       }

//       await addDoc(collection(db, "playerData"), {
//         ...formData,
//         imageUrl,
//       });

//       toast.success("Your message has been sent!", { // Show success toast
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         contactTime: "",
//         session: "",
//         message: "",
//         image: null,
//         imageUrl: null,
//       });
//     } catch (error) {
//       console.error("Error submitting form: ", error);
//       toast.error("Failed to send your message. Please try again later.");
//     }
//   };

//   return (
//     <div className="contact-container">
//       <ToastContainer /> {/* Add ToastContainer here for toast messages */}
//       <div className="contact-left">
//         <img src={logo} alt="CPL Logo" /> {/* Use the imported image */}
//       </div>
//       <div className="contact-right">
//         <h1>CPL Player Form</h1>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Name
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//           </label>
//           <label>
//             Academic Email
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//           </label>
//           <label>
//             Phone
//             <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
//           </label>
//           <label>
//             Player Role
//             <select name="contactTime" value={formData.contactTime} onChange={handleChange}>
//               <option value="">-Select your role-</option>
//               <option value="Batter">Batter</option>
//               <option value="Bowler">Bowler</option>
//               <option value="Wicketkeeper-Batsman">Wicketkeeper-Batsman</option>
//               <option value="All-rounder">All-rounder</option>
//             </select>
//           </label>
//           <label>
//             Session
//             <select name="session" value={formData.session} onChange={handleChange}>
//               <option value="">-Select a session-</option>
//               <option value="2017-18">2017-18</option>
//               <option value="2018-19">2018-19</option>
//               <option value="2019-20">2019-20</option>
//               <option value="2020-21">2020-21</option>
//               <option value="2021-22">2021-22</option>
//               <option value="2022-23">2022-23</option>
//               <option value="2023-24">2023-24</option>
//             </select>
//           </label>
          
          
//           {/* Image upload section */}
//           <label>
//             Upload an image (JPG, PNG, or GIF)
//             <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
//           </label>

//           {/* Image preview */}
//           {formData.imageUrl && (
//             <div style={{ marginBottom: '15px' }}>
//               <img
//                 src={formData.imageUrl}
//                 alt="Preview"
//                 style={{ width: '100%', maxWidth: '150px', borderRadius: '8px' }}
//               />
//             </div>
//           )}

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import logo from "./cpl logo.png"; // Import the image from the src folder

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactTime: "",
    session: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for the loading dialog

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when submission begins
    try {
      await addDoc(collection(db, "playerData"), formData);

      toast.success("Your message has been sent!", { // Show success toast
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        contactTime: "",
        session: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Failed to send your message. Please try again later.");
    } finally {
      setLoading(false); // Stop loading after submission completes
    }
  };

  return (
    <div className="contact-container">
      <ToastContainer /> {/* Add ToastContainer here for toast messages */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-dialog">
            <p>Uploading data, please wait...</p>
          </div>
        </div>
      )}
      <div className="contact-left">
        <img src={logo} alt="CPL Logo" /> {/* Use the imported image */}
      </div>
      <div className="contact-right">
        <h1>CPL Player Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Academic Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Phone
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            Player Role
            <select name="contactTime" value={formData.contactTime} onChange={handleChange}>
              <option value="">-Select your role-</option>
              <option value="Batter">Batter</option>
              <option value="Bowler">Bowler</option>
              <option value="Wicketkeeper-Batsman">Wicketkeeper-Batsman</option>
              <option value="All-rounder">All-rounder</option>
            </select>
          </label>
          <label>
            Session
            <select name="session" value={formData.session} onChange={handleChange}>
              <option value="">-Select a session-</option>
              <option value="2017-18">2017-18</option>
              <option value="2018-19">2018-19</option>
              <option value="2019-20">2019-20</option>
              <option value="2020-21">2020-21</option>
              <option value="2021-22">2021-22</option>
              <option value="2022-23">2022-23</option>
              <option value="2023-24">2023-24</option>
            </select>
          </label>

          <button type="submit" disabled={loading}>Submit</button> {/* Disable button while loading */}
        </form>
      </div>
    </div>
  );
};

export default App;
