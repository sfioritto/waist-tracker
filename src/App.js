import { useCallback, useState } from 'react';
import './App.css';

const WaistForm = ({ addEntry, date }) => {
  const [entry, setEntry] = useState({ date, value: '' })

  return (
    <div>
      <input type="text" onChange={(event) => {
        setEntry({ date, value: event.target.value })
      }} 
      value={entry.value} />
      <button onClick={() => {
        addEntry(entry);
      }}>
        Add Entry
      </button>
    </div>
  );
}

function App() {
  const [entries, setEntries] = useState({});

  const editEntry = useCallback((entry) => {
    setEntries({
      ...entries,
      [entry.date]: entry,
    });
  }, [entries, setEntries])

  return (
    <div>
      <WaistForm addEntry={editEntry} date={new Date().toISOString} />
      <div>
        {Object.values(entries).map(({ value, date }) => {
          const formattedDate = new Date(date);
          return (
            <div key={date}>
              <p>{formattedDate.toLocaleString('mm/dd/yyyy')}</p>
              <p>{value}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
