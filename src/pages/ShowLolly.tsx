import React from 'react'
import { useQuery , gql } from '@apollo/client'
import { Container, Grid } from '@material-ui/core'
import NewLolly from '../components/NewLolly'
import Loader from '../components/Loader'
import { navigate } from 'gatsby'
const style = require("./pages.module.css")


// interface showLollyProps {
//     senderName : string
// }

const GET_LOLLIES = gql `
      query getLolly($lollyPath : String!){
            getLolly(lollyPath : $lollyPath){
                    flavourTop    
                    flavourMiddle 
                    flavourBottom 
                    recipientName 
                    message       
                    senderName    
                    lollyPath
            }
        }
            
    
`


const ShowLolly =   (props) => {
    const id = props.location.search
    const newId = id.slice(4)

    const {loading , error , data} = useQuery(GET_LOLLIES , {
        variables :{
            lollyPath : newId
        }

    })



    return (
        <div>
            { error ? <h1>Error</h1> : null }
            {loading ? <Loader/> : null }

            <h1>{data && data.getLolly && 

                <div className = {style.newLolly_container} >
                    <div className = {style.newLolly_wrapper} >
                        <Container maxWidth = "md" >
                        <div className = {style.newLolly_header} >
                                <p>Virtual Lollipop</p>
                            </div>
                            <div className= {style.newLolly_grid} > 
                            <Grid container spacing = {3} >
                               <Grid item lg={6} md = {12} sm = {12} xs={12} >
                               <div className = {style.newLolly_showlolly} >
                                    <NewLolly flavourBottom = {data.getLolly.flavourBottom} 
                                              flavourMiddle = {data.getLolly.flavourMiddle}
                                              flavourTop    = {data.getLolly.flavourTop}
                                    />
                                </div>
                               </Grid>

                               <Grid item lg = {6} md = {12} sm = {12} xs = {12} >
                                   <div className = {style.newLolly_form} >
                                       <div className = {style.newLolly_heading} >
                                           <p>Your lolly is freezing. Share it with this link</p>
                                       </div>
                                       <div className = {style.newLolly_link} >
                                           <p>{props.location.origin}/ShowLolly/{data.getLolly.lollyPath}</p>
                                       </div>
                                       <div className = {style.newLolly_card} >
                                           <div className = {style.newLolly_from} >
                                               <p>{data.getLolly.senderName}</p>
                                           </div>
                                           <div className = {style.newLolly_message} >
                                               <p>{data.getLolly.message}</p>
                                           </div>
                                           <div className = {style.newLolly_to} >
                                               <p>~~{data.getLolly.recipientName}</p>
                                           </div>
                                            
                                       </div>
                                       
                                   </div>
                                   <div className = {style.newLolly_footer} >
                                                <p>{data.getLolly.senderName} made this virtual lollipop for you. <a style ={{textDecoration : "underline" , cursor : "pointer" }} onClick = {() => navigate("/CreateNew/")} >You can make your own</a>  to send to a friend who deserve some sugary treat which won't rot their teeth...</p>
                                    </div>
                               </Grid>
                               
                            </Grid>
                            </div>
                        </Container>
                    </div>
                </div>
            }</h1>
        </div>
    )
}

export default ShowLolly
