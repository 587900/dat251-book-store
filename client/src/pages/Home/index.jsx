import React from "react";
import {
  Box,
  Card,
  Divider,
  Typography,
  Grid,
  Button,
  ImageList,
  ImageListItem,
  CardActionArea,
  CardMedia,
  Link,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import DealsOne from "../../assets/images/Book-Deals1.jpg";
import DealsTwo from "../../assets/images/Book-Deals2.jpg";
import DealsThree from "../../assets/images/Book-Deals3.jpg";
import BannerOne from "../../assets/images/Book-Banner1.png";
import BannerVideo from "../../assets/images/Animated-Banner.mp4";

import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import { genres } from "../../utils/genres";
import { books } from "../../utils/books";
import avatar from "../../assets/images/bookhavenavatar.png";

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
      {!isMobile && (
        <Grid container>
          <Grid item xs={12}>
            <ImageList
              sx={{
                maxWidth: 1100,
                height: 300,
                mx: "auto",
                overflow: "hidden",
              }}
              cols={1}
            >
              <ImageListItem
                sx={{ width: "100%", height: "100%", px: 1, m: 0 }}
              >
                <CardMedia
                  component="video"
                  sx={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                  autoPlay
                  loop
                  muted
                >
                  <source src={BannerVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </CardMedia>
              </ImageListItem>
            </ImageList>
          </Grid>
        </Grid>
      )}
      <Grid container sx={{ px: 1 }}>
        <Grid container item xs={12} md={8} spacing={1}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              p: 1,
              pb: 0,
            }}
          >
            <Typography
              variant="h2"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
              color={"text.secondary"}
            >
              Discover a world of books at
            </Typography>
            <Typography
              variant="h2"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
              color={"text.secondary"}
            >
              The Book Club
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ px: 2, pt: 1 }}>
            <Typography variant="body2" fontWeight={"bold"} color={"primary"}>
              Browse by Title or Author!
            </Typography>
          </Grid>
          <Grid container sx={{ mt: { md: 1, xs: 4 } }}>
            <Grid item xs={9} md={7} sx={{ px: 1 }}>
              <SearchBar suggestions={[...books]} style={{ width: "50%" }} />
            </Grid>
            <Grid item xs={3} md={5}>
              <Button variant="contained" size="large" sx={{ borderRadius: 8 }}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{ display: { xs: "none", md: "block" } }}>
          <ImageList sx={{ width: 200, height: 200, mx: "auto" }} cols={1}>
            <ImageListItem>
              <img
                src={avatar}
                alt={"The Book Club homepage avatar"}
                loading="lazy"
                style={{ height: 200 }}
              />
            </ImageListItem>
          </ImageList>
        </Grid>
      </Grid>

      <Typography
        variant="h2"
        sx={{ my: 4, fontWeight: "bold", textAlign: "center" }}
        color={"text.secondary"}
      >
        Genres
      </Typography>
      <Grid container spacing={2} sx={{ px: 1, mb: 4 }}>
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

      <Grid container spacing={2} sx={{ px: 1, mt: 4, pt: 4 }}>
        <Grid item xs={12} md={3}>
          {/* Deals Section */}
          <Typography
            variant="h4"
            sx={{ my: 4, pl: 1, fontWeight: "bold" }}
            color="text.secondary"
          >
            Deals
          </Typography>
          {[DealsOne, DealsTwo, DealsThree].map((deal, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: { xs: "100%", sm: 345 }, // Use 100% width on xs screens
                overflow: "hidden",
                mx: 1,
                my: 2,
                boxShadow: "1px -1px 2px #BC6F03, 0px 1px 2px #4C231A",
              }}
            >
              <CardActionArea component={Link} to="#">
                <CardMedia
                  component="img"
                  sx={{ height: "100%", overflow: "hidden" }}
                  image={deal}
                  alt="Deal"
                />
              </CardActionArea>
            </Card>
          ))}
        </Grid>

        {!isMobile && (
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 2,
              my: { xs: 2, md: 0 },
              height: { md: "auto" },
            }}
          />
        )}

        <Grid item xs={12} md={8}>
          {/* Best Sellers Section */}
          <Typography
            variant="h4"
            sx={{ my: 4, fontWeight: "bold" }}
            color="text.secondary"
          >
            Best Sellers
          </Typography>
          {/* Grid for product cards */}
          <Grid container spacing={1}>
            {books?.slice(0, 6).map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.isbn}>
                <ProductCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;