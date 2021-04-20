import { useCallback, useState } from 'react';
import './App.css';

const WaistForm = ({ editEntry, entry }) => {
  const [value, setValue] = useState(entry.value || '');
  const [date, setDate] = useState(entry.date);

  return (
    <div>
      <input type="text" onChange={(event) => {
        setValue(event.target.value);
      }}
        value={value} />
      <button onClick={() => {
        editEntry({ value, date });
      }}>
        Add Entry
      </button>
    </div>
  );
}

function App() {
  const [entries, setEntries] = useState({});
  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const todayISO = todayUTC.toISOString();

  const editEntry = useCallback((entry) => {
    setEntries({
      ...entries,
      [entry.date]: entry,
    });
  }, [entries, setEntries])
  console.log(entries)
  console.log(todayISO)
  console.log(entries[todayISO])
  return (
    <div>
      {!entries[todayISO] ? (
        <WaistForm editEntry={editEntry} entry={{ date: todayISO }} />
      ) : null}
      <div>
        {Object.values(entries).map(({ value, date }) => {
          const formattedDate = new Date(date);
          return (
            <div key={date}>
              <p>{formattedDate.toLocaleDateString()}</p>
              <p>{value}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
