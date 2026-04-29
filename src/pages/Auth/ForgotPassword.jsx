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

  const dummyUser = {
    email: "user@gmail.com",
    answer1: "dog",
    answer2: "maths",
    answer3: "delhi",
  };

  const handleEmailCheck = () => {
    if (email !== dummyUser.email) {
      toast({ title: "Email not found", status: "error" });
      return;
    }
    toast({ title: "Email verified", status: "success" });
    setStep(2);
  };

  const handleAnswerCheck = () => {
    if (
      answers.answer1 !== dummyUser.answer1 ||
      answers.answer2 !== dummyUser.answer2 ||
      answers.answer3 !== dummyUser.answer3
    ) {
      toast({ title: "Wrong answers", status: "error" });
      return;
    }

    toast({ title: "Verified", status: "success" });
    setStep(3);
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      toast({ title: "Enter new password", status: "error" });
      return;
    }

    toast({ title: "Password reset successful", status: "success" });
    navigate("/login");
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

        {/* ❌ CLOSE */}
        <IconButton
          icon={<CloseIcon />}
          size="sm"
          variant="ghost"
          color="gray.600"
          position="absolute"
          top="10px"
          right="10px"
          _hover={{ bg: "gray.100" }}
          onClick={() => navigate("/")}
        />

        {/* HEADER */}
        <VStack spacing={1} mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Forgot Password
          </Text>
          <Text fontSize="sm" color="gray.500">
            Recover your account in 3 simple steps
          </Text>
        </VStack>

        {/* STEP PROGRESS */}
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

              <Button colorScheme="green" width="100%" onClick={handleEmailCheck}>
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

              <Button colorScheme="green" width="100%" onClick={handleAnswerCheck}>
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

              <Button colorScheme="green" width="100%" onClick={handleResetPassword}>
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