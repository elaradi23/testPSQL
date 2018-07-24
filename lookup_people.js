const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  var someName = process.argv[2];

  client.query(`select * from famous_people where first_name = $1`,[someName])
  .then((results) => {
    console.log('Searching... ');
    let rows = results.rows;
    console.log(`Found ${rows.length} person(s) by the name '${someName}':`);
    printPersonInfo(rows);
  });

  function printPersonInfo(rows){
    for (row in rows){
      let person = rows[row]
      console.log(`${Number(row) + 1}: ${person['first_name']} ${person['last_name']}, born '${person['birthdate'].toISOString().slice(0, 10)}'`);
    }
  }
});