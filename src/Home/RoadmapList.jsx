/*
- File Name: RoadmapList.jsx
- Author: rania rabie
- Date of Creation: 17/9/2024
- Versions Information: 1.0.0
- Dependencies:
  {
  REACT , 
  MUI ,
  axios,
  react-router-dom ,
  }
- Contributors:
- Last Modified Date: 17/10/2024
- Description : a list of all roadmaps component created by REACT and MUI
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link to navigate between pages
import axios from "axios";
import { Box, Divider, Stack, Typography } from "@mui/material";
// import Carousel from "./Carousel/Carousel";


const RoadmapList = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const categories = ["Web Development", "Network"];

  useEffect(() => {
    // Fetch all roadmaps from the JSON server
    axios
      .get(
        "https://careerguidance.runasp.net/api/Dashboard/GetALlRoadmapsInDatabase"
      )
      .then((response) => {
        // Assuming response.data is an array of roadmaps
        const parsedRoadmaps = response.data.map((roadmap) => {
          // Parse StringDataToPublish from JSON string
          if (typeof roadmap.roadmapData === "string") {
            roadmap.roadmapData = JSON.parse(roadmap.roadmapData);
          }
          return roadmap;
        });

        setRoadmaps(parsedRoadmaps); // Set the fetched and parsed roadmaps
        console.log(parsedRoadmaps);
      })
      .catch((error) => {
        console.error("Error fetching roadmaps:", error);
      });
  }, []);

  return (
    <div>
      <Box sx={{ width: "80%", m: "auto", mt: 3 }}>
        {/* <Carousel/> */}
        <Box sx={{ width: "80%", mx: "auto", py: 4 }}>
          <h2 style={{ textAlign: "center" }}>HI!</h2>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              textAlignLast: "left",
              fontSize: "18px",
              mt: 1,
              textTransform: "lowercase",
            }}
          >
            Our website offers comprehensive educational resources covering all
            major tracks in computer science, including software development,
            networking, artificial intelligence, and cybersecurity. Explore
            tailored courses and materials to enhance your skills and advance
            your career in the tech industry.
          </Typography>
        </Box>

        <Divider textAlign="center" sx={{ mb: 2 }}>
          <h2
            style={{
              border: "1px solid #EE6C4D",
              borderRadius: "7px",
              padding: "2px",
            }}
          >
            All Roadmaps
          </h2>
        </Divider>

        {categories.map((category) => (
          <div key={category}>
            <Divider textAlign="left" sx={{ mb: 2 }}>
              <h3
                style={{
                  border: "1px solid #EE6C4D",
                  borderRadius: "7px",
                  padding: "2px",
                }}
              >
                {category}
              </h3>
            </Divider>
            {/*  display: {xs: "none", sm: "block", }, */}
            <Stack
              direction={"row"}
              sx={{
                gap: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              {roadmaps
                .filter(
                  (roadmap) => roadmap.roadmapData.roadmapCategory === category
                )
                .map((roadmap) => (
                  <Box key={roadmap.id} className="all-roadmaps" sx={{ my: 2 }}>
                    <Link to={`/roadmap/${roadmap.id}`} className="roadmap">
                      <img
                        src={roadmap.roadmapData.imageUrl}
                        alt={`${category.toLowerCase()} img`}
                        className="roadmapImg"
                        width={"100%"}
                      />
                      <Typography component={"div"} sx={{ py: 1 }}>
                        {roadmap.roadmapData.roadmapName}
                      </Typography>
                    </Link>
                  </Box>
                ))}
            </Stack>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default RoadmapList;
