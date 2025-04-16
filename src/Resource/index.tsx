// @ts-nocheck

import { useState } from 'react';
import { Box, Container, Grid, Typography, Paper, TextField } from '@mui/material';
import CameraView from '@/components/CameraView';

export default function Home() {
  const [numCameras, setNumCameras] = useState(16); // Default to 16 cameras
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [cameraUrls, setCameraUrls] = useState<Record<number, string>>({});

  // Sample test streams from various sources
  const sampleStreams = [
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
    'https://test-streams.mux.dev/test_001/stream.m3u8', // HLS stream
  ];

  const handleUrlChange = (cameraId: number, url: string) => {
    setCameraUrls(prev => ({
      ...prev,
      [cameraId]: url
    }));
  };

  // Generate camera data with working sample URLs
  const cameras = Array.from({ length: numCameras }, (_, i) => ({
    id: i + 1,
    name: `Camera ${i + 1}`,
    status: 'online',
    streamUrl: cameraUrls[i + 1] || sampleStreams[i % sampleStreams.length], // Use custom URL if available, otherwise use sample
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CCTV Viewer
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Viewing {numCameras} cameras
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {cameras.map((camera) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={camera.id}>
            <Paper
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ p: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Stream URL"
                  variant="outlined"
                  value={cameraUrls[camera.id] || ''}
                  onChange={(e) => handleUrlChange(camera.id, e.target.value)}
                  placeholder="Enter stream URL"
                  sx={{ mb: 1 }}
                />
              </Box>
              <CameraView
                camera={camera}
                layout={layout}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 