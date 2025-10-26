// Components
import MobileAuthForm from "@/components/auth/AuthForm/MobileAuthForm";
import DesktopAuthForm from "@/components/auth/AuthForm/DesktopAuthForm";

export default function Signup() {
  return (
    <div className="min-h-screen bg-black text-white">
      <MobileAuthForm />
      <DesktopAuthForm
        title="Sign up"
        subTitle="Welcome to BranchBound"
        description="Experience interactive stories where your choices shape the narrative. Choose your path and create unique adventures."
      />
    </div>
  );
}
