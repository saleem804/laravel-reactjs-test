import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Form, Input, Button, Card, Alert } from "antd";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleSignup = async () => {
    setErrors({});
    setSuccessMessage("");
    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${API_BASE_URL}/api/register`, {
        name,
        email,
        password,
      });

      setSuccessMessage("Signup successful! You can now log in.");
      form.resetFields();
      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card title="Signup" style={{ width: 300 }}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: 10 }}
          />
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: 10 }}
          />
          <Button
            type="primary"
            onClick={handleSignup}
            style={{ marginTop: 10, width: "100%" }}
            loading={loading} // Show loading spinner
            disabled={loading} // Disable button during request
          >
            {loading ? "Signing Up..." : "Signup"}
          </Button>

          <div style={{ marginTop: 20 }}>
            {successMessage && <Alert message={successMessage} type="success" showIcon />}
          </div>

          {Object.keys(errors).length > 0 && (
            <div style={{ marginTop: 20 }}>
              {Object.entries(errors).map(([field, messages]) =>
                messages.map((msg, index) => (
                  <Alert
                    key={`${field}-${index}`}
                    message={msg}
                    type="error"
                    showIcon
                    style={{ marginBottom: 5 }}
                  />
                ))
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
