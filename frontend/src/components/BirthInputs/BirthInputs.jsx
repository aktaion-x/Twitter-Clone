import "./birth-inputs.css";

function BirthInputs({ setMonth, setDay, setYear, day, year, month }) {
  /* generate dates */
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const days = Array.from({ length: 31 - 1 + 1 }, (_, index) => 1 + index);
  const years = Array.from({ length: 2022 - 1904 + 1 }, (_, index) => 1904 + index).reverse();

  return (
    <div id="birth-inputs">
      <div className="input-holder">
        <label>
          <div className="top">
            <span>Month</span>
          </div>
          <select className="month" value={month} onChange={e => setMonth(e.target.value)} required>
            {months.map((month, index) =>
              <option key={month} value={index + 1}>
                {month}
              </option>
            )}
          </select>
        </label>
      </div>
      <div className="input-holder">
        <label>
          <div className="top">
            <span>Day</span>
          </div>
          <select className="day" value={day} onChange={e => setDay(e.target.value)} required>
            {days.map(day =>
              <option key={day} value={day}>
                {day}
              </option>
            )}
          </select>
        </label>
      </div>
      <div className="input-holder">
        <label>
          <div className="top">
            <span>Year</span>
          </div>
          <select className="year" value={year} onChange={e => setYear(e.target.value)} required>
            {years.map(year =>
              <option key={year} value={year}>
                {year}
              </option>
            )}
          </select>
        </label>
      </div>
    </div>
  );
}

export default BirthInputs;
