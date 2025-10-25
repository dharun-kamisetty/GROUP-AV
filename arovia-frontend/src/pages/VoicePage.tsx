import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Alert,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Stack,
  Chip
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/types';
import { useAppStore, useVoiceRecordingStore } from '@/store';

export const VoicePage: React.FC = () => {
  const { t } = useTranslation();
  const { selectedLanguage, setSelectedLanguage, userLocation } = useAppStore();
  const { 
    isRecording, 
    duration, 
    maxDuration, 
    error: recordingError,
    startRecording,
    stopRecording,
    resetRecording
  } = useVoiceRecordingStore();

  const [recordingDuration, setRecordingDuration] = React.useState(10);

  const handleStartRecording = () => {
    if (!userLocation?.address) {
      // Show error that location is required
      return;
    }
    startRecording(recordingDuration);
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleLanguageChange = (event: any) => {
    setSelectedLanguage(event.target.value);
  };

  const progress = duration > 0 ? (duration / maxDuration) * 100 : 0;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {t('voice.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('voice.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Voice Recording Controls */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                {/* Language Selection */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>{t('voice.selectLanguage')}</InputLabel>
                  <Select
                    value={selectedLanguage}
                    label={t('voice.selectLanguage')}
                    onChange={handleLanguageChange}
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <MenuItem key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Duration Slider */}
                <Box sx={{ mb: 4 }}>
                  <Typography gutterBottom>
                    {t('voice.duration')}: {recordingDuration}s
                  </Typography>
                  <Slider
                    value={recordingDuration}
                    onChange={(_, value) => setRecordingDuration(value as number)}
                    min={5}
                    max={30}
                    step={5}
                    marks
                    disabled={isRecording}
                    sx={{ width: '80%' }}
                  />
                </Box>

                {/* Recording Button */}
                <Box sx={{ mb: 3 }}>
                  {!isRecording ? (
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<MicIcon />}
                      onClick={handleStartRecording}
                      sx={{
                        fontSize: '1.2rem',
                        py: 2,
                        px: 4,
                        borderRadius: '50px'
                      }}
                    >
                      {t('voice.startRecording')}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      startIcon={<StopIcon />}
                      onClick={handleStopRecording}
                      sx={{
                        fontSize: '1.2rem',
                        py: 2,
                        px: 4,
                        borderRadius: '50px'
                      }}
                    >
                      {t('voice.stopRecording')}
                    </Button>
                  )}
                </Box>

                {/* Recording Progress */}
                {isRecording && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="error" gutterBottom>
                      {t('voice.recording')}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {duration}s / {maxDuration}s
                    </Typography>
                  </Box>
                )}

                {/* Error Display */}
                {recordingError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {recordingError}
                  </Alert>
                )}

                {/* Location Requirement */}
                {!userLocation?.address && (
                  <Alert severity="warning" sx={{ mb: 3 }}>
                    Please set your location first for complete triage assessment.
                  </Alert>
                )}

                {/* Reset Button */}
                {duration > 0 && !isRecording && (
                  <Button
                    variant="outlined"
                    onClick={resetRecording}
                    sx={{ mt: 2 }}
                  >
                    Reset Recording
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Instructions */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  How to Use Voice Input
                </Typography>
                
                <Stack spacing={2}>
                  <Box>
                    <Chip label="1" color="primary" size="small" sx={{ mr: 1 }} />
                    <Typography component="span">
                      Select your preferred language from the dropdown
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Chip label="2" color="primary" size="small" sx={{ mr: 1 }} />
                    <Typography component="span">
                      Choose recording duration (5-30 seconds)
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Chip label="3" color="primary" size="small" sx={{ mr: 1 }} />
                    <Typography component="span">
                      Click "Start Recording" and describe your symptoms clearly
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Chip label="4" color="primary" size="small" sx={{ mr: 1 }} />
                    <Typography component="span">
                      The AI will transcribe and analyze your symptoms
                    </Typography>
                  </Box>
                </Stack>

                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    <strong>Tips for best results:</strong>
                    <br />
                    • Speak clearly and at normal pace
                    <br />
                    • Mention duration of symptoms (e.g., "2 hours", "since yesterday")
                    <br />
                    • Describe severity (mild, moderate, severe)
                    <br />
                    • Include associated symptoms
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
