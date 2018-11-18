#!/bin/bash
echo "Ready to check in..."
/home/pi/libnfc/libnfc-1.7.0/examples/./a.out
echo "Read success! Writing to database"
python /home/pi/libnfc/libnfc-1.7.0/examples/fire.py
echo "All finished!"