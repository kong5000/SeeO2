const selectSensorAlerts = (db, options) => {
  return db.query(`
    SELECT email, alerts.* FROM sensors
    JOIN alerts ON sensors.id = alerts.sensors_id
    JOIN users ON alerts.users_id = users.id
    WHERE sensors.id = $1;
  `, [options.sensors_id])
  .then((res) => res.rows)
};

module.exports = selectSensorAlerts;