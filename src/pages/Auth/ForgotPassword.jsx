import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  useToast,
  IconButton,
  Progress,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const toast = useToast();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [answers, setAnswers] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
  });

  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔥 STEP 1: EMAIL CHECK (API)
  const handleEmailCheck = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/forgot-email-check", {
        email,
      });

      toast({
        title: res.data.msg || "Email verified",
        status: "success",
      });

      setStep(2);

    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Email not found",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 STEP 2: SECURITY ANSWERS CHECK (API)
  const handleAnswerCheck = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/verify-answers", {
        email,
        ...answers,
      });

      toast({
        title: res.data.msg || "Verified",
        status: "success",
      });

      setStep(3);

    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Wrong answers",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 STEP 3: RESET PASSWORD (API)
  const handleResetPassword = async () => {
    try {
      if (!newPassword) {
        toast({ title: "Enter new password", status: "error" });
        return;
      }

      setLoading(true);

      const res = await API.post("/auth/reset-password", {
        email,
        newPassword,
      });

      toast({
        title: res.data.msg || "Password reset successful",
        status: "success",
      });

      navigate("/login");

    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Reset failed",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="80vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      px={4}
      overflowX="hidden"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        width="100%"
        maxW="450px"
        position="relative"
      >

        {/* CLOSE */}
        <IconButton
          icon={<CloseIcon />}
          size="sm"
          variant="ghost"
          position="absolute"
          top="10px"
          right="10px"
          onClick={() => navigate("/")}
        />

        {/* HEADER */}
        <VStack spacing={1} mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Forgot Password
          </Text>
          <Text fontSize="sm" color="gray.500">
            Recover your account in 3 steps
          </Text>
        </VStack>

        {/* PROGRESS */}
        <Progress value={(step / 3) * 100} size="sm" mb={5} colorScheme="green" />

        <VStack spacing={4}>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                colorScheme="green"
                width="100%"
                onClick={handleEmailCheck}
                isLoading={loading}
              >
                Next
              </Button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Text fontSize="sm" color="gray.600">
                Answer security questions
              </Text>

              <Input
                placeholder="Pet Name"
                onChange={(e) =>
                  setAnswers({ ...answers, answer1: e.target.value })
                }
              />

              <Input
                placeholder="Favorite Teacher"
                onChange={(e) =>
                  setAnswers({ ...answers, answer2: e.target.value })
                }
              />

              <Input
                placeholder="Birth City"
                onChange={(e) =>
                  setAnswers({ ...answers, answer3: e.target.value })
                }
              />

              <Button
                colorScheme="green"
                width="100%"
                onClick={handleAnswerCheck}
                isLoading={loading}
              >
                Verify
              </Button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Input
                placeholder="Enter new password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Button
                colorScheme="green"
                width="100%"
                onClick={handleResetPassword}
                isLoading={loading}
              >
                Reset Password
              </Button>
            </>
          )}

        </VStack>
      </Box>
    </Box>
  );
}

export default ForgotPassword;