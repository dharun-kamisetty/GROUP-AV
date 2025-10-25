import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import {
  Psychology as TriageIcon,
  Mic as VoiceIcon,
  LocationOn as LocationIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => (
  <Card 
    sx={{ 
      height: '100%', 
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4
      }
    }}
  >
    <CardContent sx={{ textAlign: 'center', p: 3 }}>
      <Box sx={{ color: 'primary.main', mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {description}
      </Typography>
      <Button 
        component={Link} 
        to={link} 
        variant="contained" 
        size="small"
        sx={{ mt: 'auto' }}
      >
        Get Started
      </Button>
    </CardContent>
  </Card>
);

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <TriageIcon sx={{ fontSize: 48 }} />,
      title: t('navigation.triage'),
      description: 'AI-powered symptom analysis with medical-grade triage assessment and urgency scoring.',
      link: '/triage'
    },
    {
      icon: <VoiceIcon sx={{ fontSize: 48 }} />,
      title: t('navigation.voice'),
      description: 'Multilingual voice input supporting Hindi, English, and other Indian languages.',
      link: '/voice'
    },
    {
      icon: <LocationIcon sx={{ fontSize: 48 }} />,
      title: t('navigation.facilities'),
      description: 'Find nearby healthcare facilities based on your condition and location.',
      link: '/facilities'
    }
  ];

  const stats = [
    { label: 'Languages Supported', value: '6+' },
    { label: 'Average Response Time', value: '<5s' },
    { label: 'Urgency Accuracy', value: '95%' },
    { label: 'Emergency Detection', value: '100%' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          px: 4,
          textAlign: 'center',
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            {t('app.title')}
          </Typography>
          <Typography variant="h5" component="h2" paragraph sx={{ opacity: 0.9 }}>
            {t('app.subtitle')}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ mt: 4 }}>
            <Button 
              component={Link} 
              to="/triage" 
              variant="contained" 
              size="large"
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
              }}
            >
              Start Symptom Analysis
            </Button>
            <Button 
              component={Link} 
              to="/voice" 
              variant="outlined" 
              size="large"
              sx={{ 
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': { 
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Voice Input
            </Button>
          </Stack>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Features Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Key Features
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Intelligent healthcare triage designed for India's diverse population
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Statistics Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Trusted Performance
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box textAlign="center">
                  <Typography variant="h3" color="primary" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Technology Stack */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Powered by Advanced AI
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ mt: 3 }}>
            <Chip icon={<SecurityIcon />} label="Llama 3.3 70B" color="primary" />
            <Chip icon={<VoiceIcon />} label="Whisper-Large" color="secondary" />
            <Chip icon={<LanguageIcon />} label="Multilingual" color="success" />
            <Chip icon={<LocationIcon />} label="OpenStreetMap" color="info" />
            <Chip icon={<SpeedIcon />} label="Groq Cloud" color="warning" />
          </Stack>
        </Box>

        {/* Call to Action */}
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'grey.50',
            mb: 4
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Ready to get started?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Experience intelligent medical triage powered by AI
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              component={Link} 
              to="/triage" 
              variant="contained" 
              size="large"
            >
              Analyze Symptoms
            </Button>
            <Button 
              component={Link} 
              to="/voice" 
              variant="outlined" 
              size="large"
            >
              Voice Input
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
