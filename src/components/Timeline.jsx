import React, { useState, useEffect, useRef } from 'react';
import { Timeline as MuiTimeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from '@mui/lab';
import { Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const events = [
  {
    title: 'Registration Starts',
    time: '9:00 AM',
    date: 'March 15, 2025',
    description: 'Teams start registering and checking in.',
    icon: <AccessTimeIcon />,
  },
  {
    title: 'Hackathon Begins',
    time: '10:00 AM',
    date: 'March 15, 2025',
    description: 'The coding marathon begins!',
    icon: <BuildIcon />,
  },
  {
    title: 'Submission Deadline',
    time: '6:00 PM',
    date: 'March 15, 2025',
    description: 'All teams must submit their final projects.',
    icon: <HourglassEmptyIcon />,
  },
  {
    title: 'Judging',
    time: '7:00 PM',
    date: 'March 15, 2025',
    description: 'Judges evaluate the projects.',
    icon: <AccessTimeIcon />,
  },
  {
    title: 'Winner Announcement',
    time: '8:00 PM',
    date: 'March 15, 2025',
    description: 'The winners are announced!',
    icon: <CheckCircleIcon />,
  },
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
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4, textShadow: "0px 0px 15px rgba(255, 215, 0, 0.8)", padding: '20px 0px' }}>
        Event Timeline
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
                  transform: 'scale(1.5)',  // Enlarged dot
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
                {event.date} | {event.time}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </MuiTimeline>
    </Box>
  );
};

export default Timeline;
