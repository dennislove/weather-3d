import React from 'react';

const Control = ({ rainSettings, setRainSettings }) => {
  // Hàm để cập nhật số lượng hạt mưa
  const handleIntensityChange = (e) => {
    setRainSettings((prevSettings) => ({
      ...prevSettings,
      rainIntensity: parseInt(e.target.value, 10)
    }));
  };

  // Hàm để cập nhật tốc độ rơi của hạt mưa
  const handleSpeedChange = (e) => {
    setRainSettings((prevSettings) => ({
      ...prevSettings,
      rainSpeed: parseFloat(e.target.value)
    }));
  };

  // Hàm để cập nhật độ nghiêng của hạt mưa
  const handleTiltChange = (e) => {
    setRainSettings((prevSettings) => ({
      ...prevSettings,
      rainTilt: parseFloat(e.target.value)
    }));
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        borderRadius: '8px',
        width: '200px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <label>
        Lượng mưa:
        <input
          type="number"
          value={rainSettings.rainIntensity}
          onChange={handleIntensityChange}
        />
      </label>
      <label>
        Tốc độ:
        <input
          type="number"
          step="0.1"
          value={rainSettings.rainSpeed}
          onChange={handleSpeedChange}
        />
      </label>
      {/* <label>
        Rain Tilt:
        <input
          type="number"
          step="0.01"
          value={rainSettings.rainTilt}
          onChange={handleTiltChange}
        />
      </label> */}
    </div>
  );
};

export default Control;
