import React, { useState } from 'react';

function TestExcel() {
  const [file, setFile] = useState(null);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [error, setError] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8787/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        setJsonOutput(result.data);
        setError(null);
      } else {
        setError(result.error);
        setJsonOutput(null);
      }
    } catch (err) {
      setError(err.message);
      setJsonOutput(null);
    }
  };

  const registerPlayers = async () => {
    if (!Array.isArray(jsonOutput) || jsonOutput.length === 0) {
      setRegistrationStatus('No players to register.');
      return;
    }

    try {
      const promises = jsonOutput.map((player) => {
        const data = {
          name: player.Players || 'Unknown Player',
          stats: {
            type: player.Type || 'Unknown Type',
          },
        };

        return fetch('http://127.0.0.1:8787/api/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(async (response) => {
          const result = await response.json();
          if (response.ok) {
            return { status: 'success', player: result };
          } else {
            return { status: 'error', player: data.name, message: result.message || result.error };
          }
        });
      });

      const results = await Promise.all(promises);

      // Separate success and error results for display
      const successful = results.filter((r) => r.status === 'success');
      const failed = results.filter((r) => r.status === 'error');

      setRegistrationStatus({
        successful,
        failed,
      });
    } catch (error) {
      setRegistrationStatus({
        error: 'An unexpected error occurred during registration.',
        details: error.message,
      });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Excel to JSON Converter</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button type="submit" style={{ marginLeft: '10px' }}>
          Upload and Convert
        </button>
      </form>
      <h2>JSON Output</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {jsonOutput && (
        <pre
          style={{
            backgroundColor: '#f0f0f0',
            padding: '10px',
            borderRadius: '5px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          {JSON.stringify(jsonOutput, null, 2)}
        </pre>
      )}
      {jsonOutput && (
        <button
          onClick={registerPlayers}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Register Players
        </button>
      )}
      {registrationStatus && (
        <div style={{ marginTop: '20px' }}>
          {registrationStatus.error && (
            <p style={{ color: 'red' }}>{registrationStatus.error}</p>
          )}
          {registrationStatus.successful && (
            <p style={{ color: 'green' }}>
              Successfully registered {registrationStatus.successful.length} players.
            </p>
          )}
          {registrationStatus.failed && (
            <p style={{ color: 'red' }}>
              Failed to register {registrationStatus.failed.length} players.
              <ul>
                {registrationStatus.failed.map((f, index) => (
                  <li key={index}>
                    {f.player}: {f.message}
                  </li>
                ))}
              </ul>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default TestExcel;
