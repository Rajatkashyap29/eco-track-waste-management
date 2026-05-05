import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  Select,
  Textarea,
  useToast,
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function ReportWaste() {
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    wasteType: "",
    volume: "",
    description: "",
    extra: "",
    images: [],

    pincode: "",
    ward: "",
    city: "",
    street: "",
    landmark: "",
    locationExtra: "",
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast({ title: "Maximum 3 images allowed", status: "error" });
      return;
    }

    setFormData({ ...formData, images: files });
  };

  // NEXT STEP
  const handleNext = () => {
    const { title, wasteType, volume, description, images } = formData;

    if (!title || !wasteType || !volume || !description) {
      toast({ title: "Fill all required fields", status: "error" });
      return;
    }

    if (images.length !== 3) {
      toast({ title: "Upload exactly 3 images", status: "error" });
      return;
    }

    setStep(2);
  };

  // SUBMIT API
  const handleSubmit = async () => {
    const { pincode, city, street } = formData;

    if (!pincode || !city || !street) {
      toast({ title: "Location fields required", status: "error" });
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          data.append(key, formData[key]);
        }
      });

      formData.images.forEach((img) => {
        data.append("images", img);
      });

      await API.post("/complaints", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Complaint Submitted Successfully ✅",
        status: "success",
      });

      navigate("/complaints");

    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Upload failed",
        status: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  // LOADING SCREEN (optional nice UX)
  if (loading) {
    return (
      <Center h="80vh" flexDir="column" gap={3}>
        <Spinner size="xl" thickness="4px" color="green.500" />
        <Text fontSize="lg" color="gray.600">
          Submitting complaint...
        </Text>
      </Center>
    );
  }

  return (
    <Flex minH="80vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        w="100%"
        maxW="500px"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={5} textAlign="center">
          Report Waste
        </Text>

        <VStack spacing={4} align="stretch">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Input
                placeholder="Enter Complaint Title"
                name="title"
                onChange={handleChange}
              />

              <Select
                name="wasteType"
                placeholder="Select Waste Type"
                onChange={handleChange}
              >
                <option value="dry">Dry Waste</option>
                <option value="wet">Wet Waste</option>
                <option value="both">Mixed Waste</option>
              </Select>

              <Select
                name="volume"
                placeholder="Select Volume"
                onChange={handleChange}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Select>

              <Textarea
                placeholder="Describe the waste"
                name="description"
                onChange={handleChange}
              />

              <Textarea
                placeholder="Additional Info"
                name="extra"
                onChange={handleChange}
              />

              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />

              <Text fontSize="sm" color="gray.500">
                Upload exactly 3 images ({formData.images.length}/3)
              </Text>

              <Button colorScheme="green" onClick={handleNext}>
                Next →
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Input
                placeholder="Pincode"
                name="pincode"
                onChange={handleChange}
              />
              <Input placeholder="Ward No" name="ward" onChange={handleChange} />
              <Input placeholder="City" name="city" onChange={handleChange} />
              <Input
                placeholder="Street"
                name="street"
                onChange={handleChange}
              />
              <Input
                placeholder="Landmark"
                name="landmark"
                onChange={handleChange}
              />
              <Textarea
                placeholder="Extra Location Info"
                name="locationExtra"
                onChange={handleChange}
              />

              <Flex gap={3}>
                <Button
                  variant="outline"
                  w="50%"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </Button>

                <Button
                  colorScheme="green"
                  w="50%"
                  onClick={handleSubmit}
                  isLoading={loading}
                  loadingText="Submitting..."
                >
                  Submit
                </Button>
              </Flex>
            </>
          )}
        </VStack>
      </Box>
    </Flex>
  );
}

export default ReportWaste;