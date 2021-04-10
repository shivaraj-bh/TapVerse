import Dialog,{DialogButton, DialogContent, DialogFooter, DialogTitle, SlideAnimation} from 'react-native-popup-dialog';
import React from 'react';
import {Text} from 'react-native';
export default function GameOverDialog(props){
    return (
        <Dialog
            visible={props.visible}
            onTouchOutside={()=>{
                props.turnOffVisible();
                // props.setNav();
            }}
            onDismiss={()=>{
                props.setNav();
            }}
            dialogAnimation={new SlideAnimation({
                slideFrom:'bottom',
            })}
            dialogTitle={<DialogTitle style={{fontSize: 40,fontWeight: '600',color: "black",}} title ="Game Over"/>}>
            <DialogContent>
                <Text style={{fontSize: 20,fontWeight: '300',color: "black",}}>
                {'\n'}{'\t'}{'\t'}Your score is: {props.score} 😃!{'\t'}{'\t'}{'\n'}
                </Text>
            </DialogContent>
        </Dialog>
    );
}