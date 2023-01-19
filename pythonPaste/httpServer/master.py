import os
import sys

while True:
    print("Starting the server...")
    os.system(f'python3 httpServer.py {sys.argv[1]}')
    while True:
        print("q for quit\nr for restart.")
        key = input()
        if key == 'q':
            exit()
        elif key == 'r':
            print("restarting the server...")
            break
        else:
            print("invalid input\n")
            continue
exit()
