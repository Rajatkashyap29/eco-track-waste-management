import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  useToast,
  IconButton,
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

  // 👉 Dummy stored data (later backend se aayega)
  const dummyUser = {
    email: "user@gmail.com",
    answer1: "dog",
    answer2: "maths",
    answer3: "delhi",
  };

  // STEP 1 → Email check
  const handleEmailCheck = () => {
    if (email !== dummyUser.email) {
      toast({ title: "Email not found", status: "error" });
      return;
    }

    toast({ title: "Email verified", status: "success" });
    setStep(2);
  };

  // STEP 2 → Answer check
  const handleAnswerCheck = () => {
    if (
      answers.answer1 !== dummyUser.answer1 ||
      answers.answer2 !== dummyUser.answer2 ||
      answers.answer3 !== dummyUser.answer3
    ) {
      toast({ title: "Wrong answers", status: "error" });
      return;
    }

    toast({ title: "Answers verified", status: "success" });
    setStep(3);
  };

  // STEP 3 → Reset password
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
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      width="100%"
      position="relative"
    >
      {/* ❌ CLOSE */}
      <IconButton
        icon={<CloseIcon />}
        size="sm"
        position="absolute"
        top="10px"
        right="10px"
        onClick={() => navigate("/")}
      />

      <VStack spacing={5}>

        <Text fontSize="2xl" fontWeight="bold">
          Forgot Password
        </Text>

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
            <Text>Answer your security questions</Text>

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

            <Button
              colorScheme="green"
              width="100%"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </>
        )}

      </VStack>
    </Box>
  );
}

export default ForgotPassword;