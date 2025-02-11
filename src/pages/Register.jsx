import { useState } from "react";
import { useRegisterMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice"; // ✅ Import Redux action
import { toast } from "react-toastify";
import "../styles/Register.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Get Redux dispatch function

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await register(formData).unwrap();
      
      // ✅ Store the token and user data in Redux
      dispatch(setUser({ token: response.token, user: response.user }));
      
      toast.success("Registration successful!");
      navigate("/users/"); // ✅ Redirect to /users/ after success
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
