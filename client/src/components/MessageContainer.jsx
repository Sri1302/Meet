import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./messagecontainer.module.css";

export default function MessageContainer({ location }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useUser();
  const name = user.fullName;
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllMessages() {
      const res = await fetch(
        "https://meet-backend-pink.vercel.app/api/broadcastmsg/all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location }),
        }
      );
      const data = await res.json();
      console.log(data);
      setMessages(data.msgs);
    }
    getAllMessages();
  }, []);

  async function handleDelete(id) {
    const res = await fetch(
      "https://meet-backend-pink.vercel.app/api/broadcastmsg/deleteMessage",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    const data = await res.json();
    console.log(data);

    //remove deleted messages from ui
    setMessages((msgs) => msgs.filter((message) => message._id != id));
  }

  async function handleClick() {
    const res = await fetch(
      "https://meet-backend-pink.vercel.app/api/broadcastmsg/createMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message, location }),
      }
    );
    const data = await res.json();
    console.log(data.data);
    setMessages((messages) => [...messages, data.data]);
    setMessage("");
  }
  return (
    <div className={styles.container}>
      List of Broadcast Messages.....
      {messages.map((message) =>
        message.location === location ? (
          <div key={message._id}>
            <p>
              Posted by {message.name} at {message.createdAt}
            </p>
            {message.message}{" "}
            {message.name === name ? (
              <>
                <button onClick={() => handleDelete(message._id)}>Close</button>{" "}
                <button
                  onClick={() =>
                    navigate("/veiwAndSendMsg", { state: { message } })
                  }
                >
                  Veiw and Send Messages
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/message", { state: { message } })}
              >
                Message
              </button>
            )}
          </div>
        ) : (
          "No msg found"
        )
      )}
      <br />
      <br />
      <br />
      <input
        className={styles.input}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Go to park"
      />
      <br />
      <button className={styles.hunt} onClick={handleClick}>
        Hunt
      </button>
    </div>
  );
}
