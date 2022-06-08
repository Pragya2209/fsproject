import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { saveUserInfo } from "../../services/api";
import Modal from "./success";

function Form() {
  const countryCodes = ["+91", "+1"];
  const maritialStatusList = ["Single", "Unmarried", "Married"];
  const [fields, setFields] = useState({
    isd: countryCodes[0],
    gender: 2,
    language: 2,
    maritialStatus: 0,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const [isSubmit, setSubmitStatus] = useState(false);

  useEffect(() => {}, [fields, errors, acceptTerms, isFormValid]);

  const renderIsd = () => {
    let arr = [];
    {
      countryCodes.map((code, index) => {
        arr.push(
          <option key={index} value={code}>
            {code}
          </option>
        );
      });
    }
    return arr;
  };
  const renderMaritialStatus = () => {
    let arr = [];
    {
      maritialStatusList.map((code, index) => {
        arr.push(
          <option key={index} value={index}>
            {code}
          </option>
        );
      });
    }
    return arr;
  };
  const checkValidations = () => {
    let updatedErrors = errors;
    let isFormValid = true;
    let keys = [
      "username",
      "email",
      "password",
      "phone",
      "gender",
      "language",
      "maritialStatus",
    ];
    for (let k of keys) {
      if (!fields[k]) {
        isFormValid = false;
        updatedErrors[k] = "*Field is mendatory";
      } else {
        updatedErrors[k] = null;
      }
    }
    if (!fields["password"] || fields["password"].length < 8) {
      isFormValid = false;
      updatedErrors["password"] = "*Invalid password";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        isFormValid = false;
        updatedErrors["email"] =
          "*Please enter a valid E-mail id i.e abcd@gmail.com";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      updatedErrors,
    }));
    setFormValid(isFormValid);
  };

  const onChangeInput = (field, e) => {
    let updatedField = fields;
    let value = e.target.value;
    if (["gender", "maritialStatus"].includes(field)) {
      value = parseInt(value);
    }
    updatedField[field] = value;
    setFields({ ...fields, updatedField });
  };

  const onChangeLanguage = (e, v) => {
    e.preventDefault();
    let updatedField = fields;
    updatedField["language"] = v;
    setFields(updatedField);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    checkValidations();
    if (isFormValid) {
      try {
        let response = await saveUserInfo(fields);
        if (response && response.status === 200) setSubmitStatus(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onUploadFile = (e) => {
    let file = e.target.files[0]
    console.log(file)
  }

  return (
    <div>
      <Modal modalIsOpen={isSubmit} />

      <form class="userForm" onSubmit={onSubmitForm}>
        <div>
          <label class="user-name-input">
            <div class="label-div">Username</div>
            <input
              type="text"
              value={fields["username"]}
              placeholder="Enter name here"
              onChange={(e) => onChangeInput("username", e)}
            />
            <span style={{ color: "red" }}>{errors["username"]}</span>
          </label>
          <div class="profile-div">
            <label class="gender-label">
              <i class="fa fa-camera add-img" aria-hidden="true"></i>
            </label>
            <input id="file-input" type="file" style={{ display: "none" }} accept="image/*" onChange={onUploadFile}/>

            <img
              class="profile-pic"
              src="https://ecdn.teacherspayteachers.com/thumbitem/Accountable-Talk-Anchor-Chart-Classroom-Discussions-1500873512/original-1470861-1.jpg"
            />
          </div>
        </div>

        <label>
          <div class="label-div">E-mail</div>
          <input
            type="text"
            value={fields["email"]}
            placeholder="Your email ID"
            onChange={(e) => onChangeInput("email", e)}
          />
          <span style={{ color: "red" }}>{errors["email"]}</span>
        </label>

        <label>
          <div class="label-div">Password</div>
          <input
            type={`${showPassword ? "text" : "password"}`}
            value={fields["password"]}
            placeholder="Min 8 char"
            onChange={(e) => onChangeInput("password", e)}
          />
          <i
            onClick={() => setShowPassword(!showPassword)}
            class={`fa fa-eye${showPassword ? "-slash" : ""} toggle-password`}
          ></i>
          <span style={{ color: "red" }}>{errors["password"]}</span>
        </label>

        <label>
          <div class="label-div">Phone Number</div>
          <select
            class="tel-select"
            value={fields["isd"]}
            onChange={(e) => onChangeInput("isd", e)}
          >
            {renderIsd()}
          </select>
          <input
            class="tel-input"
            type="tel"
            value={fields["phone"]}
            placeholder="Enter mobile no"
            onChange={(e) => onChangeInput("phone", e)}
          />
          <span style={{ color: "red" }}>{errors["phone"]}</span>
        </label>

        <label>
          Gender
          <span class="gender-options">
            <label class="gender-label">
              <input
                class="gender-input"
                type="radio"
                name={1}
                value={1}
                onChange={(e) => onChangeInput("gender", e)}
                checked={fields["gender"] === 1}
              />
              Male
            </label>
            <label class="gender-label">
              <input
                class="gender-input"
                type="radio"
                name={2}
                value={2}
                onChange={(e) => onChangeInput("gender", e)}
                checked={fields["gender"] === 2}
              />
              Female
            </label>
          </span>
        </label>

        <label>
          Language
          <span class="language-options-span">
            <button
              onClick={(e) => onChangeLanguage(e, 1)}
              class={`language-options ${
                fields["language"] === 1 ? "language-options-selected" : ""
              }`}
            >
              Hindi
            </button>
            <button
              onClick={(e) => onChangeLanguage(e, 2)}
              class={`language-options ${
                fields["language"] === 2 ? "language-options-selected" : ""
              }`}
            >
              Englidh
            </button>
          </span>
        </label>

        <label>
          <div class="label-div">Marital Status</div>
          <select
            value={fields["maritialStatus"]}
            onChange={(e) => onChangeInput("maritialStatus", e)}
          >
            {renderMaritialStatus()}
          </select>
          <span style={{ color: "red" }}>{errors["maritialStatus"]}</span>
        </label>
        <label>
          <input
            class="gender-label"
            type="radio"
            onChange={(e) => setAcceptTerms(!acceptTerms)}
            checked={acceptTerms}
          />
          I accept the terms and privacy policy
        </label>
        <button
          class={`save ${isFormValid && acceptTerms ? "enable" : ""}`}
          onClick={onSubmitForm}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Form;
