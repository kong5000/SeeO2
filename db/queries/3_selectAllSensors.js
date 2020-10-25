const selectSensorData = (db) => {
  return db.query(`
    SELECT * FROM sensors;
  `)
  .then((res) => res.rows)
};

module.exports = selectSensorData;