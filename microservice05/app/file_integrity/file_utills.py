'''
    Utillity functions to assist file evaluation.
'''

import random

def random_file_name() -> str:
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    numbers = '1234567890'

    return "".join([random.choice(alphabet) for _it in range(5)]) + "-" + "".join([random.choice(numbers) for _it in range(5)]) + ".csv"