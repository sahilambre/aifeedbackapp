import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "ai-feedback-app | Verify your email address",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: "verification mail sent successfully",
    };
  } catch (emailError) {
    console.error("Error sending verfication email", emailError);
    return {
      success: false,
      message: "failed to send verification email",
    };
  }
}
