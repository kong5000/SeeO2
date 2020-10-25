const selectSensorData = (db, options) => {
  return db.query(`
    SELECT * FROM sensors
    JOIN sensor_data ON sensors.id = sensor_data.sensors_id
    WHERE sensors.id = $1;
  `, [options.sensors_id])
  .then((res) => res.rows)
};

module.exports = selectSensorData;