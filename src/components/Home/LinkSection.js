import { Box, Button, Typography } from "@material-ui/core";

const LinkSection = ({ title, description, link }) => {
  return (
    <>
      {title && link ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: 90 }}
          className="section"
        >
          <Typography variant="h6" style={{ paddingTop: 15 }}>
            {description}
          </Typography>
          <br />
          <Button
            variant="contained"
            color="primary"
            href={link}
            target="blank"
            style={{ marginBottom: 15 }}
          >
            {title}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default LinkSection;
