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
    time: 'TBD',
    date: 'February 27, 2025',
    description: 'Teams start registering and checking in.',
    icon: <AccessTimeIcon />,
  },
  {
    title: 'Ideation + Problem Statement',
    time: '12 Noon',
    date: 'March 15, 2025',
    description: 'Teams work on their problem statements and ideas.',
    icon: <BuildIcon />,
  },
  {
    title: 'Submission Deadline',
    time: '11:59 PM',
    date: 'March 17, 2025',
    description: 'Final submission deadline for teams.',
    icon: <HourglassEmptyIcon />,
  },
  {
    title: 'Ideation Result',
    time: 'TBD',
    date: 'March 19, 2025',
    description: 'Results of the ideation phase are announced.',
    icon: <AccessTimeIcon />,
  },
  {
    title: 'Event',
    time: 'TBD',
    date: 'March 22, 2025',
    description: 'The main hackathon event takes place.',
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
        TimeLine
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
