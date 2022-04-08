import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App';


export default function Profile() {
  const [pics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
 

  useEffect(() => {
    fetch('/mypost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },

    }).then(res => res.json())
      .then(result => {
        setPics(result.myPost);
      })
  }, [])

  useEffect(()=>{
    if(image){
      const data = new FormData();
    data.append('file',image)
    data.append("upload_preset", "viralit")
    data.append("cloud_name", "udirai")

    fetch("https://api.cloudinary.com/v1_1/udirai/image/upload", {
      method: "post",
      body: data,
    }).then(res => res.json())
      .then(data => {
      fetch('/updateprofilepic', {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          },
          body: JSON.stringify({
            pic: data.url
          })
  
        }).then(res=>res.json())
        .then(result=>{
          
          localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
          dispatch({type:"UPDATEPIC",paylaod:result.pic})
          window.location.reload();
        })


       
       
      })
      .catch(err => {
        console.log(err);

      })
    }
  },[image])

  const updateProfile=(file)=>{
    setImage(file);
    
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>

      <div style={{
        margin: "1.8rem 0rem",
        borderBottom: "1px solid grey"
      }}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
      }}>
        <div style={{ marginRight: "10px" }} >
          <img src={state ? state.pic :""} alt="" style={{ width: "16rem", height: "16rem", borderRadius: "50%" }} />
          
        </div>


        <div >
          <h4>{state ? state.name : "Loading"}</h4>
          <h5>{state ? state.email : "Loading"}</h5>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "108%",

          }}>
            <h6>{pics.length} Post</h6>
            <h6>{state?state.followers.length:"0"} Followers</h6>
            <h6>{state?state.followings.length:"0"} Following</h6>

          </div>
        </div>
      </div>
      <div className="file-field input-field" style={{margin:"10px"}}>
                    <div className="btn">
                        <span>Edit Profile</span>
                        <input type="file"

                            onChange={(e) => { updateProfile(e.target.files[0]) }}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>

      </div>
      <div className='gallery'>
        {pics &&
          pics.map(item => {
            return (
              <img className='item' src={item.photo} alt={item.title} key={item._id} />
            )
          })
        }
      </div>
    </div>
  )
}
