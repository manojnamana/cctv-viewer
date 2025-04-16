import { Modal,Box,Typography, Stack, Grid, Divider } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'

const EchallanModal = ({open,handleClose,id,numberPlate,violationType,circle,point,violationDate,CoOrdinates,violationImage,VehicleDetails}:{open:boolean,handleClose:()=>void,id:number,numberPlate:string,violationType:string,circle:string,point:string,violationDate:string,CoOrdinates:string,violationImage:string,VehicleDetails:any}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        minWidth: 400
      }}>

            <Box flexGrow={1}>
            <Stack direction={'row'} justifyContent={'center'} width={"100%"} alignItems={'center'}>
                <Image src={'/images/check.jpg'} alt="violation" width={500} height={500} />
            </Stack>
            <Box>
            <Grid container mt={2} spacing={2} width={"100%"} >
            <Grid size={{xs:4}}>
            <Typography variant="body1" fontWeight={"bold"} sx={{color:"lightskyblue"}} >Circle</Typography>
            <Typography fontSize={15} pt={0}>{circle}</Typography>
            <Typography variant="body1" fontWeight={"bold"} sx={{color:"lightskyblue"}} >Co-ordinates</Typography>
                <Typography fontSize={15} pt={0}>{CoOrdinates}</Typography>
            
            </Grid>
            <Grid size={{xs:4}}>   
                <Typography variant="body1" fontWeight={"bold"} sx={{color:"lightskyblue"}} >Point</Typography>
                <Typography fontSize={15} pt={0}>{point}</Typography>
                <Typography variant="body1" fontWeight={"bold"} sx={{color:"lightskyblue"}} >Violation Type</Typography>
                <Typography fontSize={15} pt={0}>{violationType}</Typography>
            </Grid>

            <Grid size={{xs:4}}>
                
            <Typography variant="body1" fontWeight={"bold"} sx={{color:"lightskyblue"}} >Violation Date</Typography>
            <Typography fontSize={15} pt={0}>{violationDate}</Typography>
            <Typography variant="body1" fontWeight={"bold"} sx={{color:"lightskyblue"}} >Number Plate</Typography>
                <Typography fontSize={15} pt={0}>{numberPlate}</Typography>


            </Grid>
           

            </Grid>

            {/* <Divider sx={{mt:2}} /> */}
            </Box>

            

       </Box>
       </Box>
    </Modal>
  )
}

export default EchallanModal