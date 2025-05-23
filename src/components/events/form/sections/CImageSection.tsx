import { Add, CameraAlt, Cancel, Image } from "@mui/icons-material";
import { Box, Avatar, IconButton } from "@mui/material";
import { CFormSection } from "../CFormSection";
import { Dispatch, SetStateAction, useEffect } from "react";

export interface CProps {
  image: string | undefined;
  setImage: Dispatch<SetStateAction<string | undefined>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}

export function CImageSection({ image, setImage, setImageFile }: CProps) {
  useEffect(() => {
    if (image && image.startsWith("https://")) {
      const fetchImage = async () => {
        try {
          const res = await fetch(image);
          const blob = await res.blob();
  
          const filename = image.split("/").pop() || "image.jpg";
          const file = new File([blob], filename, { type: blob.type });
  
          setImageFile(file);
        } catch (err) {
          console.error("Failed to fetch and convert image to file", err);
        }
      };
  
      fetchImage();
    }
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setImageFile(file);
        console.log(image)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CFormSection title="Image" SectionIcon={Image}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "&:hover .btn": {
            opacity: 1,
          },
        }}
      >
        <label htmlFor="avatar-upload" style={{ width: "100%" }}>
          <input
            hidden
            accept="image/*"
            type="file"
            id="avatar-upload"
            onChange={handleImageChange}
          />
          <Box position="relative">
            <Avatar
              variant="square"
              src={image}
              sx={{
                width: "100%",
                height: 146,
                borderRadius: 3,
                cursor: "pointer",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "& img": {
                  objectFit: "contain",
                },
                "&:hover": {
                  opacity: 1
                },
              }}
            >
              <CameraAlt />
            </Avatar>
            <IconButton
              disabled
              className="btn"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 50,
                height: 50,
                transform: "translate(-50%, -50%)",
                bgcolor: "primary.main",
                opacity: 0,
                transition: "opacity 0.3s",
                borderRadius: 3,
                "&:disabled": {
                  bgcolor: "primary.main",
                },
                "&:hover ": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <Add fontSize="large" sx={{ color: "white" }} />
            </IconButton>
            <IconButton
              onClick={() => setImage("")}
              className="btn"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 50,
                height: 50,
                transition: "opacity 1s, background 0.3s ease",
                opacity: 0,
                visibility: image ? "visible" : "hidden",
                '& .MuiSvgIcon-root': {
                  backgroundColor: 'white',
                  borderRadius: '50%',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 0, 0, 0.3)',
                }
              }}
            >
              <Cancel fontSize="large" sx={{ color: "red" }} />
            </IconButton>
          </Box>
        </label>
      </Box>
    </CFormSection>
  );
}
