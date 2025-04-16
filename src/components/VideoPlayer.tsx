// @ts-nocheck
import { Grid, Stack, TextField, Typography, Box, Paper, IconButton, Button, ToggleButton, ToggleButtonGroup, Card } from '@mui/material'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Add as AddIcon, Remove as RemoveIcon, GridView as GridViewIcon, ViewStream as ViewStreamIcon } from '@mui/icons-material'
import Image from 'next/image'
import EchallanModal from '@/Utils/E-challanModal'

// Dynamically import ReactPlayer with no SSR
const ReactPlayer = dynamic(() => import('react-player'), { 
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading player...</div>
})

const listViolation = [
  {
    id: 1,
    numberPlate: 'APCM 2080',
    violationType: 'Wrong Parking',
    circle: 'Miyapur',
    point: 'Miyapur Jn',
    violationDate: '16-04-2025 10:00 AM',
    CoOrdinates: 'lat:17.49213235, long:78.32035195',
    violationImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Violation+1',
    VehicleDetails: [
      {
        numberPlate: 'APCM 2080',
        vehicleColor: 'Red',
        vehicleMaker: 'Toyota',
        vehicleModel: 'Corolla',
      },
    ],
  },
  {
    id: 2,
    numberPlate: 'TS09 4567',
    violationType: 'Signal Jumping',
    circle: 'Begumpet',
    point: 'Begumpet Circle',
    violationDate: '16-04-2025 11:15 AM',
    CoOrdinates: 'lat:17.49213235, long:78.32035195',
    violationImage: 'https://via.placeholder.com/150/00FF00/000000?text=Violation+2',
    VehicleDetails: [
      {
        numberPlate: 'TS09 4567',
        vehicleColor: 'Black',
        vehicleMaker: 'Honda',
        vehicleModel: 'Civic',
      },
    ],
  },
  {
    id: 3,
    numberPlate: 'MH12 XY 7890',
    violationType: 'No Helmet',
    circle: 'Pune Camp',
    point: 'MG Road',
    violationDate: '16-04-2025 2:30 PM',
    CoOrdinates: 'lat:17.49213235, long:78.32035195',
    violationImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Violation+3',
    VehicleDetails: [
      {
        numberPlate: 'MH12 XY 7890',
        vehicleColor: 'Blue',
        vehicleMaker: 'Yamaha',
        vehicleModel: 'FZ',
      },
    ],
  },
  {
    id: 4,
    numberPlate: 'DL8C AH 1234',
    violationType: 'Overspeeding',
    circle: 'Rohini',
    point: 'Outer Ring Road',
    violationDate: '16-04-2025 9:45 PM',
    CoOrdinates: 'lat:17.49213235, long:78.32035195',
    violationImage: 'https://via.placeholder.com/150/FFA500/000000?text=Violation+4',
    VehicleDetails: [
      {
        numberPlate: 'DL8C AH 1234',
        vehicleColor: 'White',
        vehicleMaker: 'Hyundai',
        vehicleModel: 'i20',
      },
    ],
  },
];


const VideoPlayer = () => {
  const [hasWindow, setHasWindow] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'single'>('grid')
  const [modalData, setModalData] = useState({})
  const [open, setOpen] = useState(false)
  const [cameras, setCameras] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      url: i === 0 ? 'https://test-streams.mux.dev/test_001/stream.m3u8' : 'https://test-streams.mux.dev/test_001/stream.m3u8'
    }))
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)
    }
  }, [])

  const handleCameraUrlChange = (id: number, newUrl: string) => {
    setCameras(prev => prev.map(camera => 
      camera.id === id ? { ...camera, url: newUrl } : camera
    ))
  }

  const ModalOpen = ({id,numberPlate,violationType,circle,point,violationDate,CoOrdinates,violationImage,VehicleDetails}:{id:number,numberPlate:string,violationType:string,circle:string,point:string,violationDate:string,CoOrdinates:string,violationImage:string,VehicleDetails:any}) => {
    setOpen(true),
    setModalData({id,numberPlate,violationType,circle,point,violationDate,CoOrdinates,violationImage,VehicleDetails})
  }

  const handleCameraSelect = (id: number) => {
    setSelectedCamera(id)
    setViewMode('single')
  }

  const addCamera = () => {
    if (cameras.length < 50) {
      setCameras(prev => [...prev, { id: prev.length + 1, url: '' }])
    }
  }

  const removeCamera = () => {
    if (cameras.length > 1) {
      setCameras(prev => {
        const newCameras = prev.slice(0, -1)
        if (selectedCamera > newCameras.length) {
          setSelectedCamera(newCameras.length)
        }
        return newCameras
      })
    }
  }

  const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newViewMode: 'grid' | 'single') => {
    if (newViewMode !== null) {
      setViewMode(newViewMode)
    }
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', p: 2 }}>
      {/* Sidebar */}
      <Paper 
        elevation={3} 
        sx={{ 
          width: {xs: '100%', md: '295px'}, 
          p: 2, 
          mr: 2,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 32px)',
          display: 'flex',
          flexDirection: 'column',
         
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Cameras ({cameras.length}/50)
          </Typography>
          <Box>
            <IconButton 
              onClick={addCamera} 
              disabled={cameras.length >= 50}
              color="primary"
              size="small"
            >
              <AddIcon />
            </IconButton>
            <IconButton 
              onClick={removeCamera} 
              disabled={cameras.length <= 1}
              color="error"
              size="small"
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>
        <Stack spacing={2} sx={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome, Safari, Opera
    }, }}>
          {cameras.map((camera) => (
            <Box 
              key={camera.id}
              onClick={() => handleCameraSelect(camera.id)}
              sx={{ 
                cursor: 'pointer',
                p: 1,
                borderRadius: 1,
                bgcolor: selectedCamera === camera.id ? 'action.selected' : 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Camera {camera.id}
              </Typography>
              <TextField
                fullWidth
                size="small"
                label="Stream URL"
                value={camera.url}
                onChange={(e) => handleCameraUrlChange(camera.id, e.target.value)}
                placeholder="Enter stream URL"
              />
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Video Player(s) */}
      <Box sx={{ flex: 1, }}>
        <Paper elevation={3} sx={{  p: 2,width: '100%',mb: 2 ,height: '100%'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {viewMode === 'single' ? `Camera ${selectedCamera} View` : 'Multi Videos View'}
            </Typography>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              size="small"
            >
              <ToggleButton value="grid">
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton value="single">
                <ViewStreamIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          {viewMode === 'single' ? (
            <Box sx={{ width: '100%', height: 'calc(100% - 48px)' }}>
              {hasWindow && (
                <ReactPlayer 
                  url={cameras.find(c => c.id === selectedCamera)?.url || ''}
                  width='100%'
                  height='100%'
                  controls
                  muted
                  playing
                  style={{ borderRadius: '10px' }}
                />
              )}
            </Box>
          ) : (
            
            <Grid container spacing={2} sx={{ height: 'calc(100% - 48px)',width: '100%',overflowY: 'auto', scrollbarWidth: 'none', // Firefox
              '&::-webkit-scrollbar': {
                display: 'none', 
              },pb:2 }}>
              {cameras.map((camera) => (
                <>
                <Grid size={{xs: 12,md: 6}} key={camera.id}>
                  <Paper elevation={2} sx={{ p: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Camera {camera.id}
                    </Typography>
                    <Box sx={{width: '100%'}}>
                      {hasWindow && (
                        <ReactPlayer 
                          url={camera.url}
                          width='100%'
                          height='100%'
                          controls
                          muted
                          style={{ borderRadius: '10px' }}
                        />
                      )}
                    </Box>
                  </Paper>
                </Grid>
                <Grid size={{xs: 12,md: 6}}  >
                <Paper elevation={2} sx={{width: '100%',height: '354px',overflowY:"auto",scrollbarWidth: 'none', // Firefox
                  '&::-webkit-scrollbar': {
                    display: 'none', 
                  }, }} >

                  <Stack width={"100%"} >
                      <Typography variant="subtitle2" gutterBottom 
                       sx={{backgroundColor: 'lightblue',width: '100%',p:1,borderTopLeftRadius: 2,borderTopRightRadius: 2}}>
                    Viloations Images From Camera {camera.id}
                  </Typography>
                  </Stack>
                  
                 
                  <Stack spacing={2}p={1}>
                    {listViolation.map((violation) => (
                      <>
                      <Card elevation={1}  sx={{width: '100%',p:1.5,bgcolor: 'whitesmoke',
                      display: 'flex',alignItems: 'start',justifyContent: 'space-between',
                      flexDirection: 'row',"&:hover":{
                        backgroundColor: 'lightgrey'
                      }
                      }}>
                    <Image src={"/images/check.jpg"} alt="Violation" width={150} height={150} />
                    <Stack>
                    <Typography variant="subtitle2" fontWeight={"bold"} gutterBottom>
                      <span style={{fontSize: '12px',color: 'grey',fontWeight: 'bold',marginRight: '5px'}}>Number Plate :</span>
                      
                      {violation.numberPlate}</Typography>
                    <Typography variant="subtitle2"  gutterBottom>
                      <span style={{fontSize: '12px',color: 'grey',fontWeight: 'bold',marginRight: '5px'}}>Violation Type :</span>
                      {violation.violationType}</Typography>
                      <Button variant="contained" color="primary" size="small"
                      onClick={()=>ModalOpen({
                        id:violation.id,
                        numberPlate:violation.numberPlate,
                        violationType:violation.violationType,
                        circle:violation.circle,
                        point:violation.point,
                        violationDate:violation.violationDate,
                        CoOrdinates:violation.CoOrdinates,
                        violationImage:violation.violationImage,
                        VehicleDetails:violation.VehicleDetails})}
                       sx={{textTransform: 'none',mt:1}}>View Details</Button>
                    </Stack>           
                    </Card>
                      </>
                    ))}
                  </Stack>


                </Paper>
              </Grid>
              </>
              ))}
            </Grid>
          )}
        </Paper>
          
      </Box>
      {open && (
    <EchallanModal open={open} handleClose={()=>setOpen(false)} id={modalData.id} numberPlate={modalData.numberPlate}
     violationType={modalData.violationType} circle={modalData.circle} 
     point={modalData.point} violationDate={modalData.violationDate}
      CoOrdinates={modalData.CoOrdinates} violationImage={modalData.violationImage} 
     VehicleDetails={modalData.VehicleDetails} />
        )}
    </Box>
  )
}

export default VideoPlayer