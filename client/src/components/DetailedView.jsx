import { useLocation } from "react-router-dom"
import styles from './detailedview.module.css'

export default function DetailedView(){
   const location= useLocation()
   const user = location.state
   console.log(user)
   
    return <> <h3 style={{textAlign:"center"}}>User detailed Info</h3><div className={styles.container}>
       
        <div>
            <label>userName:</label>
            {user.filtereduser.name}
        </div>
        <br/>
        <div>
            <label>ProfilePic:</label>
            <img src={user.filtereduser.profilePic} height={32} style={{borderRadius:"6px"}}/>
        </div>
        <br/>
        <div>
            <label>email:</label>
            {user.filtereduser.email}
        </div>
        <br/>
        <div>
           <label> location:</label>
           {user.filtereduser.location}
        </div>
        <br/>
        <div>
            <button>Message {user.filtereduser.name}</button>
        </div>

    </div>
    </>
}