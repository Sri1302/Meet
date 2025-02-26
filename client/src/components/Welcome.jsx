import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import Users from "./Users";
import MessageContainer from "./MessageContainer";
import styles from './welcome.module.css'

export default function Welcome() {
  const [userLocation, setUserLocation] = useState();
  const { user } = useUser();
  const userName = user.fullName;
  const userId = user.id;
  const profilePic = user.imageUrl;
  const userEmail = user.primaryEmailAddress.emailAddress;
  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            //reverse geocoding- conversion of cordinates to places
            async function getCity() {
              const res = await fetch(
                `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=0b788823b48545c417c01751b483f878`
              );
              const data = await res.json();
              console.log(data[0].name);
              setUserLocation(data[0].name);
            }
            getCity();
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error("Geo location is not supported by browser");
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      async function sendDataToBackend() {
        async function existingUser() {
          const res = await fetch("https://meet-backend-9uel.onrender.com/api/users/findUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
            credentials:"include"
          });
          const data = await res.json();
          if (data && data.data) {
            const updatedUser = await fetch(
              "https://meet-backend-9uel.onrender.com/api/users/updateUser",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, userLocation }),
                credentials:"include"
              }
            );
            const data = await updatedUser.json();
            console.log(data);
          } else {
            const createUser = await fetch("https://meet-backend-9uel.onrender.com/api/users/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: userName,
                userId,
                location:userLocation,
                email:userEmail,
                profilePic,
              }),
              credentials:"include"
            });
            const data = await createUser.json();
            console.log(data);
          }
        }
        existingUser();
      }
      sendDataToBackend();
    }
  }, [userLocation]);
  return (
    <div className={styles.container} >
      <span className={styles.name}>
        {" "}
        <p> User:  {user.fullName}</p>{" "}
      </span>{" "}
      <span className={styles.location}>
        {userLocation ? <p> User Location: {userLocation}</p> : "No location found"}
      </span>
      <br />
      {userLocation ? <Users location={userLocation} /> : " "}
      <br />
      <br />
      {userLocation ? (
        <MessageContainer location={userLocation}   />
      ) : (
        "No location found"
      )}
    </div>
  );
}
