
import { Calendar } from 'react-calendar';

const AvailableDatesCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        selectRange={false}
        tileDisabled={({ date, view }) => {
          // Disable dates that are not available
          return !availableTimes.includes(date.toLocaleDateString());
        }}
      />
      {selectedDate && (
        <div>
          <h4>Selected Date: {selectedDate.toLocaleDateString()}</h4>
          <p>Available times:</p>
          <ul>
            {availableTimes
              .filter((time) => time.date === selectedDate.toLocaleDateString())
              .map((time) => (
                <li key={time}>{time.time}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};