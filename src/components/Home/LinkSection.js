import { Box, Button, Typography } from "@material-ui/core";

const LinkSection = ({ title, description, link }) => {
  console.log(title, link);
  return (
    <>
      {title && link ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{ marginBottom: 10, height: 90 }}
          className="section"
        >
          <Typography variant="h6">{description}</Typography>
          <Button href={link} target="blank">
            {title}
          </Button>
        </Box>
      ) : null}
    </>
  );
};

export default LinkSection;
