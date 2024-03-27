import React from "react";
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({
  img,
  title,
  language,
  price,
  date,
  isbn,
  category,
  author,
  cover
}) => {
  const urlFriendlyProductName = title.toLowerCase().replace(/ /g, "-");
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        my: 1,
        mx: 4,
        [theme.breakpoints.up("md")]: {
          mx: 0,
        },
      }}
    >
      <CardMedia
        component="img"
        image={img}
        alt={title}
        sx={{
          height: "180px",
          objectFit: "contain",
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          background: "linear-gradient(to bottom, #e7e7e7, #EDEDED, #D0D0D0 )",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      />
      {/* Text details beneath the image */}
      <CardContent
        sx={{ pb: 0, backgroundColor: "background.paper" }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
          }).format(price)}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 1,
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          {author}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          {category}
        </Typography>
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          {cover} | {language}
        </Typography>

        <Typography variant="body2">
          {isNaN(new Date(date).getTime())
            ? "Invalid date"
            : format(new Date(date), "dd MMMM yyyy")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
