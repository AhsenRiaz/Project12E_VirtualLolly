import React, { useState } from 'react'
const style = require("./pages.module.css")
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NewLolly from '../components/NewLolly';
import { Container, TextField } from "@material-ui/core"
import { useMutation, gql } from "@apollo/client"
import { navigate } from "gatsby"


const ADD_LOLLY = gql`
    mutation addLolly($flavourTop:String! , $flavourMiddle:String! , $flavourBottom:String! , $recipientName:String! , $message:String! , $senderName : String! ,$lollyPath:String  ){
        addLolly(flavourTop:$flavourTop , flavourMiddle:$flavourMiddle , flavourBottom:$flavourBottom , recipientName:$recipientName , message:$message , senderName:$senderName , lollyPath:$lollyPath  ){
            message
            lollyPath
            senderName
        }
    }
`


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }

}));

const CreateNew = () => {
    const classes = useStyles();
    const [addLolly] = useMutation(ADD_LOLLY);

    const [flavourTop, setFlavourTop] = useState<string>("#ff0000");
    const [flavourMiddle, setFlavourMiddle] = useState<string>("#800080");
    const [flavourBottom, setFlavourBottom] = useState<string>("#008000");

    const [recipientName, setRecipientname] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [senderName, setSenderName] = useState<string>("")



    const handleSubmit = async () => {

        const result = await addLolly({
            variables: {
                flavourTop: flavourTop,
                flavourMiddle: flavourMiddle,
                flavourBottom: flavourBottom,
                recipientName: recipientName,
                message: message,
                senderName: senderName,
            }
        }
        )

        console.log(`result from server ${result.data.addLolly.lollyPath}`)
        console.log(`result from server ${result.data.addLolly.senderName}`)




        navigate(`/ShowLolly?id=${result.data.addLolly.lollyPath}`)





    }





    return (
        <div className={style.createNew_container} >

            <div className={style.createNew_wrapper} >
                <Container maxWidth="md" >
                    <Grid container spacing={2} >
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <div className={style.createNew_heading} >
                                <p>Virtyal LollyPop </p>
                            </div>
                            <div className={style.createNew_subHeading} >
                                <p>Because we all know who deserves this candy</p>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.root}  >
                        <Grid container spacing={2} >
                            <Grid item lg={6} md={6} sm={12}  >

                                <div className={style.createNew_flavours} >
                                    <NewLolly flavourTop={flavourTop} flavourBottom={flavourBottom} flavourMiddle={flavourMiddle} />
                                    <div className={style.createNew_flavourContainer} >
                                        <label style={{ boxShadow: `1px 0px 17px ${flavourTop}` }} htmlFor="flavourTop" className={style.createNew_flavourMiddle} >
                                            <input
                                                value={flavourTop}
                                                type="color"
                                                className="colorPicker"
                                                name="flavourTop"
                                                onChange={(e) => {
                                                    setFlavourTop(e.target.value)
                                                }} />
                                        </label>
                                        <label style={{ boxShadow: `1px 0px 17px ${flavourMiddle}` }} htmlFor="flavourTop" className={style.createNew_flavourMiddle} >
                                            <input
                                                value={flavourMiddle}
                                                type="color"
                                                className="colorPicker"
                                                name="flavourTop"
                                                onChange={(e) => {
                                                    setFlavourMiddle(e.target.value)
                                                }} />
                                        </label>
                                        <label style={{ boxShadow: `1px 0px 17px ${flavourBottom}` }} htmlFor="flavourTop" className={style.createNew_flavourMiddle} >
                                            <input
                                                value={flavourBottom}
                                                type="color"
                                                className="colorPicker"
                                                name="flavourTop"
                                                onChange={(e) => {
                                                    setFlavourBottom(e.target.value)
                                                }} />
                                        </label>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} >
                                <div className={style.createNew_form} >
                                    <div className={style.createNew_card} >
                                        <div className={style.createNew_FieldTo}>
                                            <span >To</span>
                                            <TextField autoComplete = "off" value={recipientName} className={style.createNew_textField} fullWidth label="Lolly for" variant="outlined" color="secondary"
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                    setRecipientname(e.target.value)
                                                }}
                                            />
                                        </div>

                                        <div className={style.createNew_FieldComment} >
                                            <span >Say Something nice</span>
                                            <TextField autoComplete = "off" id="field_color" value={message} multiline rows={4} className={style.createNew_textField} fullWidth label="A sweet lolly for..." variant="outlined" color="secondary"
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                                                    setMessage(e.target.value)
                                                }}
                                            />
                                        </div>

                                        <div className={style.createNew_FieldFrom}>
                                            <span >From</span>
                                            <TextField autoComplete = "off" id="field_color" value={senderName} className={style.createNew_textField} fullWidth label="Lolly from" variant="outlined" color="secondary"
                                                onChange={(e) => {
                                                    setSenderName(e.target.value)
                                                }}
                                            />
                                        </div>

                                    </div>

                                    <div className={style.createNew_button} >
                                        <button onClick={handleSubmit} disabled = {senderName.length <= 3 || recipientName.length < 3 || message.length < 3} >Freeze this lolly and get a link</button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default CreateNew
