import React, { useState, useEffect, useRef } from 'react';
import { Timeline as MuiTimeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from '@mui/lab';
import { Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import CodeIcon from '@mui/icons-material/Code';
import CoffeeIcon from '@mui/icons-material/Coffee';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const events = [
  { title: 'Registration Desk', time: '8:30 AM', icon: <AccessTimeIcon /> },
  { title: 'Inauguration', time: '9:15 AM', icon: <EventIcon /> },
  { title: 'Start of Event', time: '10:30 AM', icon: <CodeIcon /> },
  { title: 'Lunch', time: '2:00 PM', icon: <LunchDiningIcon /> },
  { title: 'Resume Coding', time: '3:00 PM', icon: <CodeIcon /> },
  { title: 'Tea Break', time: '6:30 PM', icon: <CoffeeIcon /> },
  { title: 'Start of Evaluation and Networking Time', time: '7:00 PM', icon: <PeopleIcon /> },
  { title: 'Result Declaration', time: '10:00 PM', icon: <CheckCircleIcon /> },
  { title: 'Certificate Distribution', time: '10:15 PM', icon: <CardGiftcardIcon /> },
  { title: 'Goodies Distribution', time: '10:30 PM', icon: <CardGiftcardIcon /> }
];

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineItemsRef = useRef([]);

  const handleScroll = () => {
    const itemsInView = [];
    timelineItemsRef.current.forEach((item, index) => {
      if (item) {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          itemsInView.push(index);
        }
      }
    });
    setVisibleItems(itemsInView);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{ py: 6, textAlign: "center", mb: 6 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          mb: 4,
          fontSize: { xs: "3rem", sm: "4rem", md: "4.3rem" },
          fontFamily: "Impact, sans-serif",
          background: "linear-gradient(90deg, #f4c2c2, #e6b8a2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Program TimeLine
      </Typography>
      <MuiTimeline position="alternate" sx={{ padding: '0 20px' }}>
        {events.map((event, index) => (
          <TimelineItem
            key={index}
            ref={(el) => (timelineItemsRef.current[index] = el)}
            sx={{
              transform: visibleItems.includes(index) ? 'translateY(0)' : 'translateY(100px)',
              opacity: visibleItems.includes(index) ? 1 : 0,
              transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
              visibility: visibleItems.includes(index) ? 'visible' : 'hidden',
            }}
          >
            <TimelineSeparator>
              <TimelineDot
                color={index === events.length - 1 ? 'success' : 'primary'}
                sx={{
                  boxShadow: 3,
                  backgroundColor: '#ff9800',
                  border: '2px solid #fff',
                  transform: 'scale(1.5)',
                  width: '24px',
                  height: '24px',
                }}
              >
                {event.icon}
              </TimelineDot>
              {index < events.length - 1 && (
                <TimelineConnector
                  sx={{
                    height: '70px',
                    borderWidth: 4,
                    backgroundColor: '#ff9800',
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                {event.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#757575', fontWeight: 'bold' }}>
                {event.time}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </MuiTimeline>
    </Box>
  );
};

export default Timeline;