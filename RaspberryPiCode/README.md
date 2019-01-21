
Progress:
- Setup Libnfc - Oct 21, 2018
- Got wires from Rigidware, connected Pi, and reconfigured code to work with the new port; Pi now successfully reads the tag and the Android phone - Oct 22, 2018
- Wrote scripts and created executable so now, the command: check_in, will poll for an NFC card, and then once read will write to the database, updating the status of the person to checked_in=true - Nov, 18, 2018
- Connect Pi with the PN532 on there so its physically stable


TODO:
 - Get Pi working with Eduroam
