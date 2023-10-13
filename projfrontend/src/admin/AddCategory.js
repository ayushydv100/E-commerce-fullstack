import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="">
      <Link className="btn mb-3 btn-outline-info " to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For ex. Clothing"
          />
          <button onClick={onSubmit} className="btn text-white light-bg">
            Create Category
          </button>
        </p>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category"
      description="Add a new category for products"
      className="container p-4"
      // style={{ backgroundColor: "#40514E", width: "100%" }}
    >
      <div className="container-fluid">
        {" "}
        {/* Use container-fluid to extend the full width */}
        <div className="row p-2 rounded dark-bg">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {myCategoryForm()}
            {goBack()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
