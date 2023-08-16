function StepTwo({ setStepNumber }) {
  const handleSubmit = e => {
    e.preventDefault();
    setStepNumber(3);
  };
  return (
    <div className="step step-two">
      <h2>Two Step Sign up</h2>
      <h3>This Twitter Clone does use a redis-server on linux based system.</h3>
      <p>
        in order to implement twitter sign up steps method I had to use redis-server in order to save previous
        information (Email, Name, and Birth date) in the local RAM of the server
      </p>
      <p>
        After the first step React sends a request with the basic sign up information and the server see if the email is
        already exists or not and then the server sends a JWT key to which is required in order to complete the sign up.
      </p>
      <button type="submit" onClick={handleSubmit} className="btn active">
        Next
      </button>
    </div>
  );
}

export default StepTwo;
