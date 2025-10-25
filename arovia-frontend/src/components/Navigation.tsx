import React from 'react';
import { 
  AppBar,
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  Psychology as TriageIcon,
  Mic as VoiceIcon,
  Assessment as ResultsIcon,
  LocationOn as FacilitiesIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { path: '/', icon: HomeIcon, key: 'home' },
  { path: '/triage', icon: TriageIcon, key: 'triage' },
  { path: '/voice', icon: VoiceIcon, key: 'voice' },
  { path: '/results', icon: ResultsIcon, key: 'results' },
  { path: '/facilities', icon: FacilitiesIcon, key: 'facilities' },
  { path: '/settings', icon: SettingsIcon, key: 'settings' }
];

export const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => location.pathname === path;

  // Mobile Navigation
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 'bold',
            mr: 2
          }}
        >
          🏥 Arovia
        </Typography>
        
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <MenuItem 
                key={item.path}
                component={Link}
                to={item.path}
                onClick={handleMenuClose}
                selected={isActive(item.path)}
              >
                <Icon sx={{ mr: 2 }} />
                {t(`navigation.${item.key}`)}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    );
  }

  // Desktop Navigation
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography 
        variant="h6" 
        component={Link} 
        to="/"
        sx={{ 
          textDecoration: 'none', 
          color: 'inherit',
          fontWeight: 'bold',
          mr: 4
        }}
      >
        🏥 Arovia
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={<Icon />}
              variant={active ? 'contained' : 'text'}
              color={active ? 'primary' : 'inherit'}
              sx={{
                minWidth: 'auto',
                px: 2,
                py: 1
              }}
            >
              {t(`navigation.${item.key}`)}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
