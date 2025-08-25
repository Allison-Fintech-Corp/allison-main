import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DefaultWorkspaceRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the allison-cra workspace as the default
    navigate("/workspace/allison-cra", { replace: true });
  }, [navigate]);

  return null; // This component doesn't render anything
}
