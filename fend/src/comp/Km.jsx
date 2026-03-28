import  { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'   
import { Link, useNavigate, useParams } from 'react-router-dom' 
import Rating from '@mui/material/Rating';  
import StarIcon from '@mui/icons-material/Star';

const Km = () => {
  let [data,setData]=useState({})
  let [comm,setComm]=useState("")
    const [value, setValue] = useState(5);

  let {pid}=useParams()
  let obj=useContext(Ct)
  let [f,setF]=useState(false)
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()
  let [reload,setrload]=useState(false)
  let [art,setArt]=useState(0)
  useEffect(()=>{
    axios.get(`http://localhost:5000/getprod/${pid}`).then(res=>{
      setData(res.data)
      const totalRating = res.data.comm?.reduce((acc,item)=>{
        return acc+item.rating
      },0)
        const avgRating = res.data.comm?.length > 0 ? totalRating / res.data.comm.length : 0;
        setArt(avgRating)
    
      
  }).catch(err=>{
      console.log(err)
  })   
  },[reload])
  let addcart=(item)=>{
        if(obj.state.token!="")
        {
            axios.post("http://localhost:5000/addcart",{"pid":item._id,"uid":obj.state.uid,"title":item.title,"price":item.price,"disc":item.disc,"img":item.img}).then(res=>{
                setMsg(res.data.msg)
                if(res.data.msg=="prod added to cart")
                {
 obj.updstate({"cartlength":obj.state.cartlength+1})
                }
               
                setF(true)
                setTimeout(()=>{
                    setF(false)
                },2000) 
            }).catch(err=>{
                console.log(err)
            })
        }
        else{
            navigate("/login")
        }
    }   
    let addcomm=()=>{
      axios.post("http://localhost:5000/addcomm",{"pid":data._id,"name":obj.state.name,"comm":comm,"rating":value}).then(res=>{
        setrload(!reload)  
      }).catch(err=>{ 
        console.log(err)
      }
      )
    }



  return (
    <div className='km'>
      <h2>{data.title}</h2>
      <img src={`http://localhost:5000/prodimgs/${data.img}`} alt={data.name}/>
      <p>Price: {data.price}</p>
      <p>Discount: {data.disc}%</p>
      <p>Description: {data.desc}</p>
      <p>Category: {data.cat}</p>
      {art>0&&<><Rating name="half-rating-read" defaultValue={art} precision={0.5} readOnly />({art.toFixed(1)}/{data.comm.length})</>}
      <button><Link to="/">Back to home</Link></button> 

      <button onClick={()=>addcart(data)}>Add to Cart</button>
 {f &&<div className='alert'>
            <p>{msg}</p>
            <div className='progress'></div>
            </div>
        }

      {
        data.comm?.length>0&&<div className='comm'>
          <h3>Comments</h3>
          {data.comm.map((item)=><div className='comcard'>
            <h4>{item.name}</h4>
            <p>{item.comm}</p>
             <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />

          </div>)}
        </div>

      }
      {
        obj.state.token!=""&&<div className='addcomm'>
          <h3>Add Comment</h3>
          <textarea placeholder='Enter your comment' onChange={(e)=>setComm(e.target.value)} value={comm}></textarea>
            <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
       
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
       
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}

      />  
      <button onClick={addcomm}>Add Comment</button>
        </div>
          
      }
    </div>
  )
}

export default Km