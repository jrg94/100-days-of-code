import sys

def capitalize(input):
    if len(input) > 0:
        print(input.capitalize())

if __name__ == '__main__':
    if(len(sys.argv) == 1 or len(sys.argv[1]) == 0):
        print('Usage: please provide a string')
    else:
        capitalize(sys.argv[1])
