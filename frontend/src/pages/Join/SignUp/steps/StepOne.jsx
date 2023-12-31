import { useEffect, useState } from "react";
import BirthInputs from "../../../../components/BirthInputs/BirthInputs";
import useAuthUser from "../../../../hooks/useAuthUser";

function StepOne({ setStepNumber, setToken, user, setUser }) {
  const { checkEmail, isPending, error } = useAuthUser();
  const [disableSubmit, setDisableSubmit] = useState(true);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (setDisableSubmit) {
      const birth = new Date(Number(year), Number(month) - 1, Number(day));
      const res = await checkEmail(user.email, user.name, birth);
      if (res.status === 200) {
        setUser({ ...user, birth: birth.toDateString() });
        setStepNumber(2);
      }
    }
  };

  useEffect(
    () => {
      if (user.name && user.email && month && day && year) {
        setDisableSubmit(false);
      }
    },
    [user.name, user.email, month, day, year]
  );

  return (
    <div className="step step-one">
      <form className="form">
        <h2>Create your account</h2>
        <div className="input-holder">
          <label>
            <div className="top">
              <span>Name</span>
              <span className="input-length">
                {user.name.length}/50
              </span>
            </div>
            <input
              type="text"
              value={user.name}
              onChange={e => setUser({ ...user, name: e.target.value })}
              required
              maxLength={50}
            />
          </label>
          <span>{`What's your name?`}</span>
        </div>
        <div className="input-holder">
          <label>
            <div className="top">
              <span>Email</span>
            </div>
            <input
              type="email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              required
            />
          </label>
          <span className="error">
            {error}
          </span>
        </div>
        <div className="birth-description">
          <h4>Date of birth</h4>
          <span>
            This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or
            something else.
          </span>
        </div>
        <BirthInputs setMonth={setMonth} setDay={setDay} setYear={setYear} />
        {!isPending &&
          !disableSubmit &&
          <button disabled type="submit" className="btn" onClick={handleSubmit}>
            Next
          </button>}
        {isPending ||
          (disableSubmit &&
            <button type="submit" className="btn active" onClick={handleSubmit}>
              Next
            </button>)}
      </form>
    </div>
  );
}

export default StepOne;
