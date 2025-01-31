import {
  Alert,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerImage from "../assets/login3.jpeg";
import { BASE_URL } from "../config";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  // ---- EXISTING STATE ----
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [otp, setOtp] = useState("");
  const [isSentOtp, setIsSentOtp] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  // ---- NEW STATE FOR LOCKOUT/ATTEMPTS ----
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [lockTime, setLockTime] = useState(null);
  const [timer, setTimer] = useState(null);

  // We'll store interval reference so we can clear it
  const timerRef = useRef(null);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleReset = () => {};

  const sentOtp = () => {};

  // ---- NEW FUNCTION TO HANDLE COUNTDOWN ----
  const startCountdown = (lockDuration) => {
    let currentTime = lockDuration; // lockDuration in seconds
    setTimer(currentTime);

    timerRef.current = setInterval(() => {
      currentTime -= 1;
      setTimer(currentTime);

      if (currentTime <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTimer(null);
        setLockTime(null);
      }
    }, 1000);
  };

  // Clear any intervals if this component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // ---- EXISTING CAPTCHA HANDLER ----
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  // ---- EXISTING HANDLE LOGIN (ONLY ADD NEW LINES) ----
  const handleLogin = async (values) => {
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await res.json();

      // ---- NEW: CHECK SPECIFIC STATUS CODES BEFORE THE !res.ok BLOCK ----
      if (res.status === 400) {
        // 400 can be "Invalid credentials", "User not found", or attempts left
        setLoading(false);
        if (result.remainingAttempts !== undefined) {
          // The server includes how many attempts remain
          setRemainingAttempts(result.remainingAttempts);
          toast.error(
            `${result.message}. ${result.remainingAttempts} attempt(s) left before lock.`
          );
        } else {
          toast.error(result.message || "Login failed. Please try again.");
        }
        return; // Stop here
      } else if (res.status === 403) {
        // 403 means account is locked or about to lock
        setLoading(false);
        if (result.remainingTime) {
          setLockTime(result.remainingTime);
          startCountdown(result.remainingTime); // Start local timer
          toast.error(
            `Account locked. Try again in ${result.remainingTime} seconds.`
          );
        } else {
          toast.error(result.message || "Account locked!");
        }
        return; // Stop here
      }

      // ---- EXISTING CHECK FOR OTHER ERRORS ----
      if (!res.ok) {
        throw new Error(result.message || "Login failed.");
      }

      // ---- EXISTING SUCCESS CASE ----
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.role,
          token: result.token,
        },
      });

      toast.success(result.message || "Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---- EXISTING RETURN (UI / LAYOUT) ----
  return (
    <div className="center-wrapper">
      <section className="px-5 lg:px-0">
        <div className="w-full max-w-[1170px] mx-auto rounded-lg shadow md:p-10 justify-center">
          <Card className="form-container">
            <Flex gap="large" align="center">
              {/* Form */}
              <Flex vertical flex={1} style={{ padding: "20px" }}>
                <Typography.Title level={3} strong className="title">
                  Sign In
                </Typography.Title>
                <Typography.Text type="secondary" strong className="slogan">
                  Connect with us!
                </Typography.Text>
                <Form
                  layout="vertical"
                  onFinish={handleLogin}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please input a valid email!" },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your email!" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter your password!"
                    />
                  </Form.Item>
                  {error && (
                    <Alert
                      description={error}
                      type="error"
                      showIcon
                      closable
                      className="alert"
                    />
                  )}
                  <Form.Item>
                    {/* Google reCAPTCHA */}
                    <ReCAPTCHA
                      sitekey="6Lc9FL0qAAAAACESI-gPez1IjqjlcvoymufCNeCM" // Your site key
                      onChange={handleCaptchaChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <div className="mt-7">
                      <Button
                        type={loading ? "default" : "primary"}
                        htmlType="submit"
                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex justify-center items-center"
                        size="large"
                        block
                      >
                        {loading ? <Spin /> : "Sign In"}
                      </Button>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Row justify="end">
                      <Link onClick={() => setShow(true)}>Forgot Password</Link>
                      <div
                        className={`modal fade ${show ? "show" : ""}`}
                        style={{ display: show ? "block" : "none" }}
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden={!show}
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Forgot Password
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShow(false)}
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="mb-3">
                                <form>
                                  <label
                                    htmlFor="exampleInputPhone1"
                                    className="form-label"
                                  >
                                    Phone No.
                                  </label>
                                  <div className="row">
                                    <div className="col-8">
                                      <input
                                        type="tel"
                                        className="form-control"
                                        id="exampleInputPhone1"
                                        disabled={isSentOtp}
                                        onChange={(e) => {
                                          setPhone(e.target.value);
                                        }}
                                      />
                                    </div>
                                    <div className="col-4">
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        disabled={isSentOtp}
                                        onClick={sentOtp}
                                      >
                                        Get OTP
                                      </button>
                                    </div>
                                  </div>
                                </form>
                                {isSentOtp && (
                                  <form>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="otpInput"
                                        className="form-label"
                                      >
                                        OTP
                                      </label>
                                      <input
                                        type="number"
                                        className="form-control w-50"
                                        id="otpInput"
                                        onChange={(e) => setOtp(e.target.value)}
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="newPasswordInput"
                                        className="form-label"
                                      >
                                        New Password
                                      </label>
                                      <input
                                        type="password"
                                        className="form-control w-50"
                                        id="newPasswordInput"
                                        onChange={(e) =>
                                          setResetPassword(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="confirmPasswordInput"
                                        className="form-label"
                                      >
                                        Confirm Password
                                      </label>
                                      <input
                                        type="password"
                                        className="form-control w-50"
                                        id="confirmPasswordInput"
                                        onChange={(e) =>
                                          setConfirmPassword(e.target.value)
                                        }
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={handleReset}
                                    >
                                      Reset Password
                                    </button>
                                  </form>
                                )}
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => setShow(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Row justify="center">
                      <Typography.Text type="secondary">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                      </Typography.Text>
                    </Row>
                  </Form.Item>
                </Form>
              </Flex>

              {/* Image */}
              <Flex flex={1}>
                <img
                  src={registerImage}
                  alt="Register"
                  className="auth-image"
                />
              </Flex>
            </Flex>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Login;
