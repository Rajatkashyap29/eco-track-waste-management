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
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportWaste() {
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

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

  // 🔄 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🖼️ IMAGE UPLOAD (MAX 3)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast({ title: "Maximum 3 images allowed", status: "error" });
      return;
    }

    setFormData({ ...formData, images: files });
  };

  // 👉 STEP 1 VALIDATION
  const handleNext = () => {
    const { wasteType, volume, description, images } = formData;

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

  // 👉 FINAL SUBMIT
  const handleSubmit = () => {
    const { pincode, city, street } = formData;

    if (!pincode || !city || !street) {
      toast({ title: "Location fields required", status: "error" });
      return;
    }

    toast({ title: "Complaint Submitted ✅", status: "success" });

    console.log("FINAL DATA:", formData);

    navigate("/user"); // dashboard / my complaints
  };

  return (
    <Flex
      minH="80vh"
      align="center"
      justify="center"
      bg="gray.50"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        w="100%"
        maxW="500px"
      >
        {/* TITLE */}
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb={5}
          textAlign="center"
        >
          Report Waste
        </Text>

        <VStack spacing={4} align="stretch">

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <>
              <Input
                placeholder="Enter Complaint Title (e.g. Garbage near park)"
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
                <option value="small">Small (1–2 bags)</option>
                <option value="medium">Medium (3–5 bags)</option>
                <option value="large">Large (bulk/heap)</option>
              </Select>

              <Textarea
                placeholder="Describe the waste"
                name="description"
                onChange={handleChange}
              />

              <Textarea
                placeholder="Additional Info (optional)"
                name="extra"
                onChange={handleChange}
              />

              {/* IMAGE UPLOAD */}
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />

              <Text fontSize="sm" color="gray.500">
                Upload exactly 3 images ({formData.images.length}/3)
              </Text>

              {formData.images.length > 0 && (
                <Text fontSize="sm" color="green.500">
                  {formData.images.length} image(s) selected ✅
                </Text>
              )}

              <Button colorScheme="green" onClick={handleNext}>
                Next →
              </Button>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <>
              <Input
                placeholder="Pincode"
                name="pincode"
                onChange={handleChange}
              />

              <Input
                placeholder="Ward No"
                name="ward"
                onChange={handleChange}
              />

              <Input
                placeholder="City / Village"
                name="city"
                onChange={handleChange}
              />

              <Input
                placeholder="Street Name"
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