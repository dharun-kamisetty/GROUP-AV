import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Alert,
  CircularProgress,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import {
  Send as SendIcon,
  Psychology as AnalyzeIcon,
  Warning as WarningIcon,
  LocalHospital as HospitalIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '@/store';
import { apiService } from '../services/api';
import { SymptomFormData } from '@/types';

interface TriageFormData {
  symptoms: string;
  patientId: string;
}

export const TriagePage: React.FC = () => {
  const { t } = useTranslation();
  const { 
    triageResult, 
    userLocation, 
    setTriageResult, 
    setLoading, 
    setError 
  } = useAppStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TriageFormData>({
    defaultValues: {
      symptoms: '',
      patientId: ''
    }
  });

  // Mutation for symptom analysis
  const analyzeSymptomsMutation = useMutation({
    mutationFn: async (data: SymptomFormData) => {
      setLoading(true);
      const response = await apiService.analyzeSymptoms(data);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || 'Analysis failed');
    },
    onSuccess: (data) => {
      setTriageResult(data);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    }
  });

  const onSubmit = (data: TriageFormData) => {
    if (!userLocation?.address) {
      setError('Please set your location first');
      return;
    }

    analyzeSymptomsMutation.mutate({
      text_input: data.symptoms,
      language: 'en', // Default to English, can be enhanced
      location: userLocation.address,
      patient_id: data.patientId || undefined
    });
  };

  const handleClear = () => {
    reset();
    setTriageResult(null);
    setError(null);
  };

  const getUrgencyColor = (score: number) => {
    if (score >= 8) return 'error';
    if (score >= 6) return 'warning';
    return 'success';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'immediate': return 'error';
      case 'urgent': return 'warning';
      default: return 'success';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {t('triage.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('triage.subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Input Form */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Describe Your Symptoms
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="symptoms"
                    control={control}
                    rules={{ 
                      required: 'Please describe your symptoms',
                      minLength: {
                        value: 10,
                        message: 'Please provide more detail (at least 10 characters)'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={6}
                        placeholder={t('triage.inputPlaceholder')}
                        error={!!errors.symptoms}
                        helperText={errors.symptoms?.message}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />

                  <Controller
                    name="patientId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Patient ID (Optional)"
                        placeholder="Enter patient identifier if available"
                        sx={{ mb: 3 }}
                      />
                    )}
                  />

                  <Stack direction="row" spacing={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<AnalyzeIcon />}
                      disabled={analyzeSymptomsMutation.isPending}
                      sx={{ flex: 1 }}
                    >
                      {analyzeSymptomsMutation.isPending ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          Analyzing...
                        </>
                      ) : (
                        t('triage.analyzeButton')
                      )}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      onClick={handleClear}
                      disabled={analyzeSymptomsMutation.isPending}
                    >
                      Clear
                    </Button>
                  </Stack>
                </Box>

                {/* Location Notice */}
                {!userLocation?.address && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Please set your location for facility recommendations.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Results */}
          <Grid item xs={12} md={6}>
            {triageResult ? (
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    {t('triage.result.title')}
                  </Typography>

                  {/* Emergency Alert */}
                  {triageResult.emergency_detected && (
                    <Alert 
                      severity="error" 
                      icon={<WarningIcon />}
                      sx={{ mb: 3, fontWeight: 'bold' }}
                    >
                      <Typography variant="h6">
                        {t('emergency.detected')}
                      </Typography>
                      <Typography variant="body2">
                        {t('emergency.warning')}
                      </Typography>
                    </Alert>
                  )}

                  {/* Urgency Score */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Urgency Score
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Chip
                        label={`${triageResult.urgency_score}/10`}
                        color={getUrgencyColor(triageResult.urgency_score)}
                        size="large"
                      />
                      <Chip
                        label={triageResult.triage_category.toUpperCase()}
                        color={getCategoryColor(triageResult.triage_category)}
                        variant="outlined"
                      />
                    </Stack>
                  </Box>

                  {/* Chief Complaint */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Chief Complaint
                    </Typography>
                    <Typography variant="body1">
                      {triageResult.chief_complaint}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Symptoms */}
                  {triageResult.symptoms.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Identified Symptoms
                      </Typography>
                      <Stack spacing={1}>
                        {triageResult.symptoms.map((symptom, index) => (
                          <Chip
                            key={index}
                            label={`${symptom.name} (${symptom.severity})`}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Red Flags */}
                  {triageResult.red_flags.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="error" gutterBottom>
                        Red Flags
                      </Typography>
                      <Stack spacing={1}>
                        {triageResult.red_flags.map((flag, index) => (
                          <Alert key={index} severity="warning" size="small">
                            <strong>{flag.flag_type}:</strong> {flag.description}
                          </Alert>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Recommended Action */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Recommended Action
                    </Typography>
                    <Typography variant="body1">
                      {triageResult.action_required}
                    </Typography>
                  </Box>

                  {/* Recommended Specialty */}
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Recommended Specialty
                    </Typography>
                    <Chip
                      icon={<HospitalIcon />}
                      label={triageResult.recommended_specialty}
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  color: 'text.secondary'
                }}>
                  <AnalyzeIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" gutterBottom>
                    No Analysis Yet
                  </Typography>
                  <Typography variant="body2">
                    Enter your symptoms and click "Analyze" to get started.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
