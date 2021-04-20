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
};

const Entry = ({ entry, editEntry }) => {
  const { date, value } = entry;
  const formattedDate = new Date(date).toLocaleDateString();
  const [editMode, setEditMode] = useState(false);

  const editCallback = useCallback((entry) => {
    editEntry(entry);
    setEditMode(false);
  }, [setEditMode, editEntry]);

  return editMode ? (
    <WaistForm entry={entry} editEntry={editCallback} />
  ): (
    <div>
      <p>{formattedDate}</p>
      <p>{value}</p>
      <button onClick={() => setEditMode(true)}>Edit</button>
    </div>
  )
};

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

  return (
    <div>
      {!entries[todayISO] ? (
        <WaistForm editEntry={editEntry} entry={{ date: todayISO }} />
      ) : null}
      <div>
        {Object.values(entries).map((entry) => {
          return <Entry key={entry.date} entry={entry} editEntry={editEntry} />;
        })}
      </div>
    </div>
  );
}

export default App;
