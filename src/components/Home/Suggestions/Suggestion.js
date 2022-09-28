import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Typography,
} from "@material-ui/core";

const Suggestion = ({ suggestion, classes }) => {
  return (
    <Card className={classes.card}>
      <CardHeader title={suggestion.selection} />
      <CardMedia
        className={classes.media}
        // component="img"
        image={suggestion.photoUrl}
      />
      <CardContent>
        <Typography component="p">{suggestion.name}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {suggestion.description}
        </Typography>
        {suggestion?.link ? (
          <Link target="blank" href={suggestion.link}>
            See Review
          </Link>
        ) : (
          <div style={{ height: 21 }}></div>
        )}
      </CardContent>
    </Card>
  );
};

export default Suggestion;
