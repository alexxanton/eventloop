"use client"
import { Container, Paper, Typography, Box, Button, Chip, Divider, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Event, LocationOn, CalendarToday, AttachMoney, People, ChildCare, Checkroom, ArrowBack, Share, Map } from "@mui/icons-material";
import { EventType } from "@/utils/types/types";

export function CEvent ({event}: {event: EventType}){
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // const [event] = useState({
  //   name: "Midnight Jazz & Wine Night",
  //   description: "An elegant evening of smooth jazz performances paired with premium wine tastings in a sophisticated atmosphere. Our featured artist, Sarah Belle, will perform her latest compositions alongside classic jazz standards.\n\nThe wine selection includes rare vintages from boutique vineyards in France and California, curated by our master sommelier. Includes hors d\"oeuvres and dessert pairings.",
  //   category: "Music & Dining",
  //   location: "The Velvet Lounge, 245 Music Row, Downtown",
  //   start_date: new Date("2024-03-15T20:00"),
  //   end_date: new Date("2024-03-16T01:00"),
  //   price: 75,
  //   dress_code: "Cocktail Attire",
  //   max_capacity: 150,
  //   age_limit: 21,
  //   organizer: "Jazz Enthusiasts Society"
  // });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  return (
    <Box sx={{ overflowY: "scroll" }}>
      <Container maxWidth="lg" sx={{ py: 4, position: "relative" }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          mb: 4,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 2 : 3,
          textAlign: isMobile ? "center" : "left"
        }}>
          <Box sx={{ 
            display: "flex", 
            width: "100%", 
            alignItems: "center",
            gap: 2
          }}>
            <IconButton sx={{ color: "primary.main", alignSelf: "flex-start" }}>
              <ArrowBack />
            </IconButton>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant={isMobile ? "h4" : "h2"} fontWeight="bold">
                {event.name}
              </Typography>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 2, 
                mt: 1.5,
                justifyContent: isMobile ? "center" : "flex-start"
              }}>
                <Chip 
                  label={event.category} 
                  color="primary" 
                  sx={{ fontSize: "0.9rem", px: 2 }}
                />
                <Typography variant="body1" color="text.secondary">
                  {/* By //! add event owner  */}
                </Typography>
              </Box>
            </Box>
          </Box>

          {!isMobile && (
            <Button
              variant="contained"
              size="large"
              startIcon={<Event />}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 3,
                fontSize: "1.1rem",
                boxShadow: 3,
                minWidth: 200
              }}
            >
              Join Event
            </Button>
          )}
        </Box>

        <Paper sx={{
          height: isMobile ? 220 : 400,
          borderRadius: 4,
          mb: 4,
          background: `
            linear-gradient(45deg, rgba(44,62,80,0.85) 30%, rgba(52,152,219,0.85) 90%),
            url("https://source.unsplash.com/random/1600x900?jazz,night,club")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}>
          <Box sx={{ 
            textAlign: "center", 
            zIndex: 1,
            px: isMobile ? 2 : 4
          }}>
            <Event sx={{ 
              fontSize: isMobile ? 48 : 64, 
              mb: 2 
            }} />
            <Typography variant={isMobile ? "h5" : "h3"} component="div">
              {event.location?.split(",")[0]}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {event.location?.split(",")[1]}
            </Typography>
          </Box>
        </Paper>

        <Box sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 4,
          mb: 4,
          alignItems: "flex-start"
        }}>
          <Box sx={{ 
            flex: isMobile ? 1 : 2,
            width: "100%"
          }}>
            <Paper sx={{ 
              p: isMobile ? 3 : 4, 
              borderRadius: 4, 
              mb: 4 
            }}>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ mb: 3 }}>
                Event Details
              </Typography>
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <CalendarToday color="primary" sx={{ 
                    fontSize: isMobile ? 28 : 32,
                    mt: 0.5
                  }} />
                  <Box>
                    <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
                      Date & Time
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(event.start_date)} - {formatDate(event.end_date)}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", gap: 3 }}>
                  <LocationOn color="primary" sx={{ 
                    fontSize: isMobile ? 28 : 32,
                    mt: 0.5
                  }} />
                  <Box>
                    <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom>
                      Location
                    </Typography>
                    <Typography variant="body1">{event.location}</Typography>
                    <Button 
                      variant="text" 
                      color="primary" 
                      sx={{ mt: 1 }}
                      startIcon={<Map />}
                      size={isMobile ? "small" : "medium"}
                    >
                      View on Map
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper sx={{ 
              p: isMobile ? 3 : 4, 
              borderRadius: 4 
            }}>
              <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ mb: 3 }}>
                About This Event
              </Typography>
              <Typography variant="body1" sx={{ 
                lineHeight: 1.7,
                fontSize: isMobile ? "1rem" : "1.1rem",
                whiteSpace: "pre-line"
              }}>
                {event.description}
              </Typography>
            </Paper>
          </Box>

          {!isMobile ? (
            <Box sx={{ 
              flex: 1,
              minWidth: 300,
              position: isMobile ? "static" : "sticky",
              top: 100
            }}>
              <Paper sx={{ 
                p: 4, 
                borderRadius: 4, 
                mb: 4 
              }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  Quick Facts
                </Typography>
                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <AttachMoney color="primary" sx={{ fontSize: 32 }} />
                    <Box>
                      <Typography variant="h6">Price</Typography>
                      <Typography variant="h4" color="primary">
                        ${event.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        per person
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Checkroom color="primary" sx={{ fontSize: 32 }} />
                    <Box>
                      <Typography variant="h6">Dress Code</Typography>
                      <Typography variant="body1">{event.dress_code}</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <People color="primary" sx={{ fontSize: 32 }} />
                    <Box>
                      <Typography variant="h6">Capacity</Typography>
                      <Typography variant="body1">
                        {event.max_capacity} spots remaining
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <ChildCare color="primary" sx={{ fontSize: 32 }} />
                    <Box>
                      <Typography variant="h6">Age Limit</Typography>
                      <Typography variant="body1">
                        Minimum {event.age_limit} years
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<Event />}
                    sx={{
                      mt: 3,
                      py: 2,
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      boxShadow: 3
                    }}
                  >
                    Reserve Your Spot
                  </Button>
                </Box>
              </Paper>
            </Box>
          ) : (
            <Paper sx={{ 
              p: 3, 
              borderRadius: 4, 
              mb: 4,
              width: "100%"
            }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Quick Facts</Typography>
                <Typography variant="h6" color="primary">
                  ${event.price}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2
              }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Checkroom color="primary" />
                  <Typography variant="body2">{event.dress_code}</Typography>
                </Box>
                
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <People color="primary" />
                  <Typography variant="body2">{event.max_capacity} spots</Typography>
                </Box>
                
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <ChildCare color="primary" />
                  <Typography variant="body2">Age {event.age_limit}+</Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </Box>

        {isMobile && (
          <Box sx={{
            position: "sticky",
            bottom: 16,
            left: 0,
            right: 0,
            px: 2,
            zIndex: 1000
          }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Event />}
              sx={{
                py: 2,
                borderRadius: 3,
                fontSize: "1.1rem",
                boxShadow: 6
              }}
            >
              Join Event - ${event.price}
            </Button>
          </Box>
        )}

        <IconButton sx={{
          position: "fixed",
          bottom: isMobile ? 80 : 32,
          right: 32,
          bgcolor: "primary.main",
          color: "white",
          "&:hover": { bgcolor: "primary.dark" },
          zIndex: 1001
        }}>
          <Share />
        </IconButton>
      </Container>
    </Box>
  );
};
