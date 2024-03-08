import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button, ImageList, ImageListItem} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import FictionIcon from '@mui/icons-material/AutoStoriesOutlined'; // Example icon, replace with actual icons
import MysteryIcon from '@mui/icons-material/SearchOutlined'; // Example icon
import RomanceIcon from '@mui/icons-material/Favorite'; // Example icon
import ScienceIcon from '@mui/icons-material/Science'; // Example icon
import AcademicIcon from '@mui/icons-material/School'; // Example icon
import SelfStudyIcon from '@mui/icons-material/SelfImprovement'; // Example icon

import SearchBar from "../../components/SearchBar";
import avatar from "../../assets/images/bookhavenavatar.png";

const books = [
  { title: "The Great Gatsby", author: "Ernest Hemmingway" },
  { title: "Moby Dick", author: "J.K. Tolkien" },
  // Add more books or fetch from an API
];

const genres = [
  { name: 'Fiction', Icon: FictionIcon },
  { name: 'Mystery', Icon: MysteryIcon },
  { name: 'Romance', Icon: RomanceIcon },
  { name: 'Science', Icon: ScienceIcon },
  { name: 'Academic', Icon: AcademicIcon },
  { name: 'Self Study', Icon: SelfStudyIcon },
];

const Home = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "1100px",
        mx: 2,
        [theme.breakpoints.up("md")]: {
          mx: "auto",
        },
        my: 4,
        py: 1,
        borderRadius: 4,
      }}
    >
      <Grid container sx={{ px: 1 }}>
        <Grid container item xs={12} md={8} spacing={1}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", alignItems: "end", p: 1, pb: 0 }}
          >
            <Typography
              variant="h2"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
              color={"text.secondary"}
            >
              Discover a world of books at BookHaven
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ px: 2, pt: 1 }}>
            <Typography variant="body2" fontWeight={"bold"} color={"primary"}>
              Browse by Title or Author!
            </Typography>
          </Grid>
          <Grid container sx={{ mt: {md: 1, xs: 4} }}>
            <Grid item xs={9} md={7} sx={{ px: 1 }}>
              <SearchBar suggestions={[...books]} style={{ width: "50%" }} />
            </Grid>
            <Grid item xs={3} md= {5}>
              <Button variant="contained" size="large" sx={{ borderRadius: 8 }}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
          <ImageList sx={{ width: 200, height: 200, mx: "auto" }} cols={1}>
            <ImageListItem>
              <img
                src={avatar}
                alt={"BookHaven homepage avatar"}
                loading="lazy"
                style={{ height: 200 }}
              />
            </ImageListItem>
          </ImageList>
        </Grid>
      </Grid>

      <Typography variant="h2" sx={{ my:4, fontWeight: "bold", textAlign: "center" }} color={"text.secondary"}>
        Genres
      </Typography>
      <Grid container spacing={2} sx={{px: 1}}>
        {genres.map((genre) => (
          <Grid item xs={6} sm={4} md={2} key={genre.name}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
              }}
            >
              <genre.Icon sx={{ fontSize: 40, mb: 1, color: "primary.main" }} />
              <Typography variant="subtitle1">{genre.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
