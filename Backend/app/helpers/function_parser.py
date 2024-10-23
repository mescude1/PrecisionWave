import re
from sympy import diff
from math import sin, cos, tan, atan, acos, asin, pi, e, log, exp

list_of_accepted_math_characters = ['+', '-', '*', '/', '**', '~', 'sin', 'cos', 'tan', 'cot', 'csc', 'sec', 'pi', 'e',
                                    'exp', 'ln', 'log', 'sqrt', '(', ')', 'x', 'math', '.']

pattern = r'^(\+|\-|\*|\/|\**|~|x|math|.|sin|cos|tan|cot|csc|sec|pi|e|exp|ln|log|sqrt|\(|\)|[0-9])+$'

sin = sin
cos = cos
tan = tan
sec = asin
csc = acos
cot = atan
pi = pi
e = e
exp = exp
ln = log

def is_valid_string(s) -> bool:
    return bool(re.fullmatch(pattern, s))

def string_function_evaluator(function_string, x) -> str:
    if is_valid_string(function_string):
        return eval(function_string)
    else:
        return "this is not a valid function"

def string_function_differentiator(function_string:str) -> str:
    if is_valid_string(function_string):
        return diff(function_string)

test_formula = 'sin(x)**2'

print(string_function_evaluator(test_formula, 2))